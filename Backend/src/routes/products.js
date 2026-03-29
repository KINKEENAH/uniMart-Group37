import { Router } from "express";
import { body, validationResult } from "express-validator";
import prisma from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";
import jwt from "jsonwebtoken";

const router = Router();

// ─── GET /api/products ────────────────────────────────────────────────────────
// Public — returns all active products, excludes the logged-in user's own if token provided
router.get("/", async (req, res) => {
  let excludeUserId = null;
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) {
    try {
      const decoded = jwt.verify(header.split(" ")[1], process.env.JWT_SECRET);
      excludeUserId = decoded.id;
    } catch {}
  }

  const { category, search } = req.query;

  try {
    const where = {
      status: "active",
      ...(excludeUserId && { seller_id: { not: excludeUserId } }),
      ...(category && {
        category: { name: { equals: category, mode: "insensitive" } },
      }),
      ...(search && {
        title: { contains: search, mode: "insensitive" },
      }),
    };

    const products = await prisma.product.findMany({
      where,
      orderBy: { created_at: "desc" },
      include: {
        images: { orderBy: { display_order: "asc" }, take: 1 },
        category: true,
        seller: {
          select: { id: true, full_name: true, rating: true, campus_location: true },
        },
      },
    });
    return res.json({ products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ─── POST /api/products ───────────────────────────────────────────────────────
// Create a new product listing
router.post(
  "/",
  requireAuth,
  [
    body("title").trim().notEmpty().withMessage("Product title is required"),
    body("category").trim().notEmpty().withMessage("Category is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive number"),
    body("stock_quantity")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Stock must be a non-negative integer"),
    body("description").optional().trim(),
    body("images")
      .optional()
      .isArray()
      .withMessage("Images must be an array"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      category,
      price,
      stock_quantity = 1,
      description,
      images = [],
    } = req.body;

    try {
      // Find or create the category by name
      let cat = await prisma.category.findFirst({
        where: { name: { equals: category, mode: "insensitive" } },
      });

      if (!cat) {
        cat = await prisma.category.create({
          data: {
            name: category,
            slug: category.toLowerCase().replace(/\s+/g, "-"),
          },
        });
      }

      // Create the product
      const product = await prisma.product.create({
        data: {
          seller_id: req.userId,
          category_id: cat.id,
          title,
          description: description || null,
          price: parseFloat(price),
          stock_quantity: parseInt(stock_quantity),
          status: "active",
          // Store images as ProductImage records
          images: {
            create: images.slice(0, 4).map((url, index) => ({
              image_url: url,
              display_order: index,
            })),
          },
        },
        include: {
          images: true,
          category: true,
        },
      });

      return res.status(201).json({
        message: "Product created successfully",
        product,
      });
    } catch (err) {
      console.error("Create product error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// ─── GET /api/products/mine ───────────────────────────────────────────────────
// Get all products for the logged-in seller
router.get("/mine", requireAuth, async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { seller_id: req.userId },
      include: { images: { orderBy: { display_order: "asc" } }, category: true },
      orderBy: { created_at: "desc" },
    });
    return res.json({ products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ─── GET /api/products/:id ────────────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: {
        images: { orderBy: { display_order: "asc" } },
        category: true,
        key_features: true,
        seller: {
          select: {
            id: true,
            full_name: true,
            rating: true,
            total_sales: true,
            campus_location: true,
            created_at: true,
            student_since: true,
          },
        },
      },
    });
    if (!product) return res.status(404).json({ message: "Product not found" });

    // increment views
    await prisma.product.update({
      where: { id: req.params.id },
      data: { views: { increment: 1 } },
    });

    return res.json({ product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ─── PATCH /api/products/:id ──────────────────────────────────────────────────
router.patch(
  "/:id",
  requireAuth,
  [
    body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),
    body("price").optional().isFloat({ gt: 0 }).withMessage("Price must be positive"),
    body("stock_quantity").optional().isInt({ min: 0 }),
    body("description").optional().trim(),
    body("category").optional().trim().notEmpty(),
    body("status").optional().isIn(["active", "inactive"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const product = await prisma.product.findUnique({ where: { id: req.params.id } });
      if (!product) return res.status(404).json({ message: "Product not found" });
      if (product.seller_id !== req.userId) return res.status(403).json({ message: "Forbidden" });

      const { title, price, stock_quantity, description, category, status } = req.body;
      const data = {};
      if (title !== undefined) data.title = title;
      if (price !== undefined) data.price = parseFloat(price);
      if (stock_quantity !== undefined) data.stock_quantity = parseInt(stock_quantity);
      if (description !== undefined) data.description = description;
      if (status !== undefined) data.status = status;

      // Update category if provided
      if (category !== undefined) {
        let cat = await prisma.category.findFirst({
          where: { name: { equals: category, mode: "insensitive" } },
        });
        if (!cat) {
          cat = await prisma.category.create({
            data: { name: category, slug: category.toLowerCase().replace(/\s+/g, "-") },
          });
        }
        data.category_id = cat.id;
      }

      const updated = await prisma.product.update({
        where: { id: req.params.id },
        data,
        include: { images: { orderBy: { display_order: "asc" } }, category: true },
      });

      return res.json({ message: "Product updated", product: updated });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// ─── DELETE /api/products/:id ─────────────────────────────────────────────────
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.seller_id !== req.userId)
      return res.status(403).json({ message: "Forbidden" });

    await prisma.product.delete({ where: { id: req.params.id } });
    return res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
