import { Router } from "express";
import { body, validationResult } from "express-validator";
import prisma from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// ─── GET /api/conversations ───────────────────────────────────────────────────
// All conversations for the logged-in user (as buyer or seller)
router.get("/", requireAuth, async (req, res) => {
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [{ buyer_id: req.userId }, { seller_id: req.userId }],
      },
      orderBy: { last_message_at: "desc" },
      include: {
        buyer: { select: { id: true, full_name: true } },
        seller: { select: { id: true, full_name: true } },
        product: { select: { id: true, title: true } },
        messages: {
          orderBy: { sent_at: "desc" },
          take: 1,
        },
      },
    });

    // Attach unread count for the current user
    const withUnread = await Promise.all(
      conversations.map(async (conv) => {
        const unread = await prisma.message.count({
          where: {
            conversation_id: conv.id,
            sender_id: { not: req.userId },
            is_read: false,
          },
        });
        return { ...conv, unread };
      })
    );

    return res.json({ conversations: withUnread });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ─── POST /api/conversations ──────────────────────────────────────────────────
// Start or retrieve a conversation between buyer and seller about a product
router.post(
  "/",
  requireAuth,
  [
    body("seller_id").notEmpty().withMessage("seller_id is required"),
    body("product_id").optional(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { seller_id, product_id } = req.body;

    if (seller_id === req.userId) {
      return res.status(400).json({ message: "You cannot chat with yourself" });
    }

    try {
      // Find existing conversation
      let conv = await prisma.conversation.findFirst({
        where: {
          buyer_id: req.userId,
          seller_id,
          ...(product_id ? { product_id } : {}),
        },
      });

      if (!conv) {
        conv = await prisma.conversation.create({
          data: {
            buyer_id: req.userId,
            seller_id,
            product_id: product_id || null,
          },
        });
      }

      return res.json({ conversation: conv });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// ─── GET /api/conversations/:id/messages ─────────────────────────────────────
router.get("/:id/messages", requireAuth, async (req, res) => {
  try {
    const conv = await prisma.conversation.findUnique({
      where: { id: req.params.id },
    });
    if (!conv) return res.status(404).json({ message: "Conversation not found" });
    if (conv.buyer_id !== req.userId && conv.seller_id !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const messages = await prisma.message.findMany({
      where: { conversation_id: req.params.id },
      orderBy: { sent_at: "asc" },
      include: { sender: { select: { id: true, full_name: true } } },
    });

    // Mark all received messages as read
    await prisma.message.updateMany({
      where: {
        conversation_id: req.params.id,
        sender_id: { not: req.userId },
        is_read: false,
      },
      data: { is_read: true },
    });

    return res.json({ messages });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ─── POST /api/conversations/:id/messages ────────────────────────────────────
router.post(
  "/:id/messages",
  requireAuth,
  [body("content").trim().notEmpty().withMessage("Message cannot be empty")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const conv = await prisma.conversation.findUnique({
        where: { id: req.params.id },
      });
      if (!conv) return res.status(404).json({ message: "Conversation not found" });
      if (conv.buyer_id !== req.userId && conv.seller_id !== req.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const message = await prisma.message.create({
        data: {
          conversation_id: req.params.id,
          sender_id: req.userId,
          content: req.body.content,
        },
        include: { sender: { select: { id: true, full_name: true } } },
      });

      // Update last_message_at
      await prisma.conversation.update({
        where: { id: req.params.id },
        data: { last_message_at: new Date() },
      });

      return res.status(201).json({ message });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
