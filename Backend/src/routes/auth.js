import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import prisma from "../lib/prisma.js";
import { createAndLogOtp } from "../lib/otp.js";

const router = Router();

// ─── POST /api/auth/signup ────────────────────────────────────────────────────
router.post(
  "/signup",
  [
    body("full_name").trim().notEmpty().withMessage("Full name is required"),
    body("student_id").trim().notEmpty().withMessage("Student ID is required"),
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { full_name, student_id, email, password } = req.body;

    try {
      const existing = await prisma.user.findFirst({
        where: { OR: [{ email }, { student_id }] },
      });

      if (existing) {
        const field = existing.email === email ? "email" : "student ID";
        return res.status(409).json({ message: `An account with this ${field} already exists` });
      }

      const password_hash = await bcrypt.hash(password, 12);

      const user = await prisma.user.create({
        data: { full_name, student_id, email, password_hash },
      });

      await createAndLogOtp(user.id, "verify");

      return res.status(201).json({
        message: "Account created. Check your email for the verification code.",
        user_id: user.id,
      });
    } catch (err) {
      console.error("Signup error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// ─── POST /api/auth/verify-email ─────────────────────────────────────────────
router.post(
  "/verify-email",
  [
    body("user_id").notEmpty().withMessage("user_id is required"),
    body("code").isLength({ min: 6, max: 6 }).withMessage("Code must be 6 digits"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user_id, code } = req.body;

    try {
      const record = await prisma.emailVerification.findFirst({
        where: { user_id, code, is_used: false },
        orderBy: { created_at: "desc" },
      });

      if (!record) {
        return res.status(400).json({ message: "Invalid code" });
      }

      if (record.expires_at < new Date()) {
        return res.status(400).json({ message: "Code has expired" });
      }

      await prisma.$transaction([
        prisma.emailVerification.update({
          where: { id: record.id },
          data: { is_used: true },
        }),
        prisma.user.update({
          where: { id: user_id },
          data: { is_verified: true },
        }),
      ]);

      const user = await prisma.user.findUnique({ where: { id: user_id } });

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
      );

      return res.json({
        message: "Email verified successfully",
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          student_id: user.student_id,
          is_verified: user.is_verified,
        },
      });
    } catch (err) {
      console.error("Verify email error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      // Use the same error message for both cases to avoid user enumeration
      if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      if (!user.is_verified) {
        // Resend a fresh OTP so they can complete verification
        await createAndLogOtp(user.id, "verify");
        return res.status(403).json({
          message: "Email not verified. A new verification code has been sent.",
          user_id: user.id,
          requires_verification: true,
        });
      }

      await createAndLogOtp(user.id, "login");

      return res.json({
        message: "Login code sent to your email",
        user_id: user.id,
      });
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// ─── POST /api/auth/verify-login ─────────────────────────────────────────────
router.post(
  "/verify-login",
  [
    body("user_id").notEmpty().withMessage("user_id is required"),
    body("code").isLength({ min: 6, max: 6 }).withMessage("Code must be 6 digits"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user_id, code } = req.body;

    try {
      const record = await prisma.emailVerification.findFirst({
        where: { user_id, code, is_used: false },
        orderBy: { created_at: "desc" },
      });

      if (!record) {
        return res.status(400).json({ message: "Invalid code" });
      }

      if (record.expires_at < new Date()) {
        return res.status(400).json({ message: "Code has expired" });
      }

      await prisma.emailVerification.update({
        where: { id: record.id },
        data: { is_used: true },
      });

      const user = await prisma.user.findUnique({ where: { id: user_id } });

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
      );

      return res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          student_id: user.student_id,
          is_verified: user.is_verified,
        },
      });
    } catch (err) {
      console.error("Verify login error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// ─── POST /api/auth/resend-otp ────────────────────────────────────────────────
router.post(
  "/resend-otp",
  [
    body("user_id").notEmpty().withMessage("user_id is required"),
    body("type").optional().isIn(["verify", "login"]).withMessage("type must be verify or login"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user_id, type = "verify" } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { id: user_id } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await createAndLogOtp(user_id, type);

      return res.json({ message: "A new code has been sent" });
    } catch (err) {
      console.error("Resend OTP error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
