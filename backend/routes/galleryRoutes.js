// backend/routes/galleryRoutes.js
const express  = require("express");
const router   = express.Router();
const { getGallery, addGalleryItem, deleteGalleryItem } = require("../controllers/galleryController");
const { protect }        = require("../middleware/authMiddleware");
const { uploadGallery }  = require("../config/cloudinary");

router.get("/",       getGallery);
router.post("/",      protect, uploadGallery.single("file"), addGalleryItem);
router.delete("/:id", protect, deleteGalleryItem);

module.exports = router;