import { Router } from "express";
import prisma from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// ─── GET /api/notifications ───────────────────────────────────────────────────
router.get("/", requireAuth, async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { user_id: req.userId },
      orderBy: { created_at: "desc" },
    });
    return res.json({ notifications });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ─── PATCH /api/notifications/:id/read ───────────────────────────────────────
router.patch("/:id/read", requireAuth, async (req, res) => {
  try {
    const notif = await prisma.notification.findUnique({ where: { id: req.params.id } });
    if (!notif || notif.user_id !== req.userId)
      return res.status(404).json({ message: "Not found" });

    const updated = await prisma.notification.update({
      where: { id: req.params.id },
      data: { is_read: true },
    });
    return res.json({ notification: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ─── PATCH /api/notifications/read-all ───────────────────────────────────────
router.patch("/read-all", requireAuth, async (req, res) => {
  try {
    await prisma.notification.updateMany({
      where: { user_id: req.userId, is_read: false },
      data: { is_read: true },
    });
    return res.json({ message: "All marked as read" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ─── DELETE /api/notifications/:id ───────────────────────────────────────────
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const notif = await prisma.notification.findUnique({ where: { id: req.params.id } });
    if (!notif || notif.user_id !== req.userId)
      return res.status(404).json({ message: "Not found" });

    await prisma.notification.delete({ where: { id: req.params.id } });
    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
