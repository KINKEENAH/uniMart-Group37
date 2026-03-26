import { Router } from "express";
import prisma from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// ─── GET /api/wishlists ───────────────────────────────────────────────────────
router.get("/", requireAuth, async (req, res) => {
  try {
    const items = await prisma.wishlist.findMany({
      where: { user_id: req.userId },
      include: {
        product: {
          include: {
            images: { orderBy: { display_order: "asc" }, take: 1 },
            seller: { select: { id: true, full_name: true } },
            category: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });
    return res.json({ wishlists: items });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ─── POST /api/wishlists/:productId ──────────────────────────────────────────
router.post("/:productId", requireAuth, async (req, res) => {
  try {
    const existing = await prisma.wishlist.findFirst({
      where: { user_id: req.userId, product_id: req.params.productId },
    });
    if (existing) return res.status(409).json({ message: "Already in wishlist" });

    const item = await prisma.wishlist.create({
      data: { user_id: req.userId, product_id: req.params.productId },
    });
    return res.status(201).json({ message: "Added to wishlist", item });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ─── DELETE /api/wishlists/:productId ────────────────────────────────────────
router.delete("/:productId", requireAuth, async (req, res) => {
  try {
    await prisma.wishlist.deleteMany({
      where: { user_id: req.userId, product_id: req.params.productId },
    });
    return res.json({ message: "Removed from wishlist" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
