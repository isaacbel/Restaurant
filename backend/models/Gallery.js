// backend/models/Gallery.js
const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  src:           { type: String, required: true },   // Cloudinary URL
  alt:           { type: String, default: "" },
  imagePublicId: { type: String, default: "" },      // for deletion
  type:          { type: String, enum: ["image", "video"], default: "image" },
  category:      { type: String, default: "Ambiance" },
}, { timestamps: true });

module.exports = mongoose.model("Gallery", gallerySchema);