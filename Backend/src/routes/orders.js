import { Router } from "express";
import prisma from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// ─── POST /api/orders ─────────────────────────────────────────────────────────
router.post("/", requireAuth, async (req, res) => {
  const { items, subtotal, tax_amount, total_amount, payment_method, meetup_location_name } = req.body;
  if (!items?.length) return res.status(400).json({ message: "No items in order" });

  try {
    // Find or create meetup location
    let meetupLocation = null;
    if (meetup_location_name) {
      meetupLocation = await prisma.meetupLocation.findFirst({
        where: { name: { equals: meetup_location_name, mode: "insensitive" } },
      });
      if (!meetupLocation) {
        meetupLocation = await prisma.meetupLocation.create({
          data: { name: meetup_location_name },
        });
      }
    }

    const order = await prisma.order.create({
      data: {
        buyer_id: req.userId,
        meetup_location_id: meetupLocation?.id || null,
        subtotal: parseFloat(subtotal),
        tax_amount: parseFloat(tax_amount),
        total_amount: parseFloat(total_amount),
        payment_method,
        status: "pending",
        order_items: {
          create: items.map((item) => ({
            product_id: item.product_id,
            seller_id: item.seller_id || req.userId,
            quantity: item.quantity,
            unit_price: parseFloat(item.unit_price),
            subtotal: parseFloat(item.unit_price) * item.quantity,
          })),
        },
      },
      include: {
        order_items: {
          include: { product: { include: { seller: true } } },
        },
      },
    });

    // Notify each unique seller
    const buyer = await prisma.user.findUnique({ where: { id: req.userId }, select: { full_name: true } });
    const sellerIds = [...new Set(order.order_items.map((i) => i.product?.seller?.id).filter(Boolean))];
    await Promise.all([
      // Notify sellers
      ...sellerIds.map((sellerId) =>
        prisma.notification.create({
          data: {
            user_id: sellerId,
            type: "order",
            title: "New Order Received",
            body: `${buyer?.full_name || "A buyer"} placed an order. Meet-up: ${meetup_location_name || "TBD"}. Payment: ${payment_method || "TBD"}.`,
            action_url: "View Order",
          },
        })
      ),
      // Notify buyer
      prisma.notification.create({
        data: {
          user_id: req.userId,
          type: "order",
          title: "Order Confirmed",
          body: `Your order has been placed successfully. Meet-up at ${meetup_location_name || "TBD"}. Payment: ${payment_method || "TBD"}.`,
          action_url: "View Order",
        },
      }),
    ]);

    return res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

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
                seller: { select: { id: true, full_name: true } },
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

// ─── GET /api/orders/seller ───────────────────────────────────────────────────
// Orders where the logged-in user is a seller
router.get("/seller", requireAuth, async (req, res) => {
  try {
    const orderItems = await prisma.orderItem.findMany({
      where: { seller_id: req.userId },
      include: {
        order: {
          include: {
            buyer: { select: { id: true, full_name: true, email: true } },
            meetup_location: true,
          },
        },
        product: {
          include: { images: { orderBy: { display_order: "asc" }, take: 1 } },
        },
      },
      orderBy: { order: { created_at: "desc" } },
    });
    return res.json({ orderItems });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
