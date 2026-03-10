// backend/config/cloudinary.js
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for meal images
const mealStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "happyday/meals",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 800, height: 600, crop: "fill", quality: "auto" }],
  },
});

// Storage for gallery (images + videos)
const galleryStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "happyday/gallery",
    resource_type: file.mimetype.startsWith("video") ? "video" : "image",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov"],
  }),
});

const uploadMeal    = multer({ storage: mealStorage });
const uploadGallery = multer({ storage: galleryStorage });

module.exports = { cloudinary, uploadMeal, uploadGallery };