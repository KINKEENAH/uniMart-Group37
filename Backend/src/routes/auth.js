import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import prisma from "../lib/prisma.js";

const router = Router();

const signToken = (user) =>
  jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

const userPayload = (user) => ({
  id: user.id,
  full_name: user.full_name,
  email: user.email,
  student_id: user.student_id,
  is_verified: user.is_verified,
});

// ─── POST /api/auth/signup ────────────────────────────────────────────────────
router.post(
  "/signup",
  [
    body("full_name").trim().notEmpty().withMessage("Full name is required"),
    body("student_id").trim().notEmpty().withMessage("Student ID is required"),
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

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

      // Create user and mark as verified immediately (no OTP required)
      const user = await prisma.user.create({
        data: { full_name, student_id, email, password_hash, is_verified: true },
      });

      const token = signToken(user);
      return res.status(201).json({ message: "Account created successfully", token, user: userPayload(user) });
    } catch (err) {
      console.error("Signup error:", err);
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
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = signToken(user);
      return res.json({ message: "Login successful", token, user: userPayload(user) });
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────
router.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true, full_name: true, email: true, student_id: true,
        phone: true, department: true, level: true, campus_location: true,
        is_verified: true, rating: true, total_sales: true,
        student_since: true, created_at: true,
        _count: { select: { products: true, orders: true, wishlists: true } },
      },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ user });
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
