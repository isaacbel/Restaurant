// backend/controllers/galleryController.js
const Gallery        = require("../models/Gallery");
const { cloudinary } = require("../config/cloudinary");

// GET /api/gallery  — public
const getGallery = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category && req.query.category !== "All")
      filter.category = req.query.category;
    const items = await Gallery.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// POST /api/gallery  — admin only
const addGalleryItem = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "File is required" });

    const { alt, category } = req.body;
    const isVideo = req.file.mimetype?.startsWith("video") || req.file.path?.includes("/video/");

    const item = await Gallery.create({
      src:           req.file.path,
      alt:           alt || "",
      imagePublicId: req.file.filename,
      type:          isVideo ? "video" : "image",
      category:      category || "Ambiance",
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE /api/gallery/:id  — admin only
const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    if (item.imagePublicId) {
      const resourceType = item.type === "video" ? "video" : "image";
      await cloudinary.uploader.destroy(item.imagePublicId, { resource_type: resourceType });
    }

    await item.deleteOne();
    res.json({ message: "Gallery item deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getGallery, addGalleryItem, deleteGalleryItem };