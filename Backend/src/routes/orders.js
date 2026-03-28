import { Router } from "express";
import prisma from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// ─── GET /api/orders/mine ─────────────────────────────────────────────────────
router.get("/mine", requireAuth, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { buyer_id: req.userId },
      orderBy: { created_at: "desc" },
      include: {
        meetup_location: true,
        order_items: {
          include: {
            product: {
              include: {
                images: { orderBy: { display_order: "asc" }, take: 1 },
              },
            },
          },
        },
      },
    });
    return res.json({ orders });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
