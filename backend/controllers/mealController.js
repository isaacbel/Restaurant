// backend/controllers/mealController.js
const Meal       = require("../models/Meal");
const { cloudinary } = require("../config/cloudinary");
const { z }      = require("zod");

const mealSchema = z.object({
  name:           z.string().min(2),
  description:    z.string().min(5),
  price:          z.coerce.number().positive(),
  promotionPrice: z.coerce.number().positive().optional().nullable(),
  isPromotion:    z.coerce.boolean().optional(),
  category:       z.string().min(1),
  tags:           z.string().optional(), // comma-separated from form
  isVisible:      z.coerce.boolean().optional(),
});

// GET /api/meals  — public, supports ?category=
const getMeals = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category && req.query.category !== "All")
      filter.category = req.query.category;
    // Public route only shows visible meals
    if (!req.admin) filter.isVisible = true;

    const meals = await Meal.find(filter).sort({ createdAt: -1 });
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/meals/:id
const getMealById = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ error: "Meal not found" });
    res.json(meal);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// POST /api/meals  — admin only, with image upload
const createMeal = async (req, res) => {
  try {
    const parsed = mealSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ error: parsed.error.errors[0].message });

    if (!req.file)
      return res.status(400).json({ error: "Image is required" });

    const { name, description, price, promotionPrice, isPromotion, category, tags, isVisible } = parsed.data;

    const meal = await Meal.create({
      name,
      description,
      price,
      promotionPrice: promotionPrice || null,
      isPromotion:    isPromotion || false,
      category,
      image:          req.file.path,         // Cloudinary URL
      imagePublicId:  req.file.filename,     // Cloudinary public_id
      tags:           tags ? tags.split(",").map(t => t.trim()) : [],
      isVisible:      isVisible !== undefined ? isVisible : true,
    });

    res.status(201).json(meal);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// PUT /api/meals/:id  — admin only
const updateMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ error: "Meal not found" });

    const parsed = mealSchema.partial().safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ error: parsed.error.errors[0].message });

    const updates = { ...parsed.data };
    if (updates.tags && typeof updates.tags === "string")
      updates.tags = updates.tags.split(",").map(t => t.trim());

    // If new image uploaded — delete old from Cloudinary
    if (req.file) {
      if (meal.imagePublicId) {
        await cloudinary.uploader.destroy(meal.imagePublicId);
      }
      updates.image         = req.file.path;
      updates.imagePublicId = req.file.filename;
    }

    const updated = await Meal.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE /api/meals/:id  — admin only
const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ error: "Meal not found" });

    // Delete image from Cloudinary
    if (meal.imagePublicId) {
      await cloudinary.uploader.destroy(meal.imagePublicId);
    }

    await meal.deleteOne();
    res.json({ message: "Meal deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/meals/stats  — admin dashboard stats
const getStats = async (req, res) => {
  try {
    const total      = await Meal.countDocuments();
    const visible    = await Meal.countDocuments({ isVisible: true });
    const promotions = await Meal.countDocuments({ isPromotion: true });

    const byCategory = await Meal.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({ total, visible, hidden: total - visible, promotions, byCategory });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getMeals, getMealById, createMeal, updateMeal, deleteMeal, getStats };