import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { fileURLToPath } from "url";
import path from "path";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import conversationRoutes from "./routes/conversations.js";
import wishlistRoutes from "./routes/wishlists.js";
import notificationRoutes from "./routes/notifications.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/wishlists", wishlistRoutes);
app.use("/api/notifications", notificationRoutes);

// ─── API 404 (only for /api routes) ──────────────────────────────────────────
app.use("/api", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// ─── Serve React frontend ─────────────────────────────────────────────────────
const distPath = path.join(__dirname, "../../uniMart-Frontend/dist");
app.use(express.static(distPath));

// Catch-all: serve index.html for React Router routes
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ─── Global error handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} [${process.env.NODE_ENV}]`);
});
