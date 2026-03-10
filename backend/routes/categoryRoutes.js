// backend/routes/categoryRoutes.js
const express   = require("express");
const router    = express.Router();
const Category  = require("../models/Category");
const { protect } = require("../middleware/authMiddleware");

// GET all categories — public
router.get("/", async (req, res) => {
  const cats = await Category.find().sort({ name: 1 });
  res.json(cats);
});

// POST — admin only
router.post("/", protect, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    const cat = await Category.create({ name: name.trim() });
    res.status(201).json(cat);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ error: "Category already exists" });
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE — admin only
router.delete("/:id", protect, async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted" });
});

module.exports = router;