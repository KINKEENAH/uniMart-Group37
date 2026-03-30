import { Router } from "express";
import { body, validationResult } from "express-validator";
import prisma from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// ─── GET /api/users/me ────────────────────────────────────────────────────────
router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        full_name: true,
        email: true,
        student_id: true,
        phone: true,
        department: true,
        level: true,
        campus_location: true,
        is_verified: true,
        rating: true,
        total_sales: true,
        student_since: true,
        created_at: true,
        _count: { select: { products: true, orders: true, wishlists: true } },
      },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ─── PATCH /api/users/me ──────────────────────────────────────────────────────
router.patch(
  "/me",
  requireAuth,
  [
    body("full_name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
    body("phone").optional().trim(),
    body("department").optional().trim(),
    body("level").optional().trim(),
    body("campus_location").optional().trim(),
    body("student_since").optional().isISO8601().withMessage("Invalid date"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { full_name, phone, department, level, campus_location, student_since } = req.body;

    // Build only the fields that were actually sent
    const data = {};
    if (full_name !== undefined) data.full_name = full_name;
    if (phone !== undefined) data.phone = phone;
    if (department !== undefined) data.department = department;
    if (level !== undefined) data.level = level;
    if (campus_location !== undefined) data.campus_location = campus_location;
    if (student_since !== undefined) data.student_since = new Date(student_since);

    try {
      const user = await prisma.user.update({
        where: { id: req.userId },
        data,
        select: {
          id: true,
          full_name: true,
          email: true,
          student_id: true,
          phone: true,
          department: true,
          level: true,
          campus_location: true,
          is_verified: true,
          rating: true,
          total_sales: true,
          student_since: true,
          created_at: true,
          _count: { select: { products: true, orders: true, wishlists: true } },
        },
      });
      return res.json({ message: "Profile updated", user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// ─── GET /api/users/:id/public ───────────────────────────────────────────────
router.get("/:id/public", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true, full_name: true, department: true, level: true,
        campus_location: true, rating: true, total_sales: true,
        student_since: true, created_at: true, is_verified: true,
        products: {
          where: { status: "active" },
          orderBy: { created_at: "desc" },
          include: {
            images: { orderBy: { display_order: "asc" }, take: 1 },
            category: true,
          },
        },
      },
    });
    if (!user) return res.status(404).json({ message: "Seller not found" });
    return res.json({ seller: user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
