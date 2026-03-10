// backend/routes/mealRoutes.js
const express  = require("express");
const router   = express.Router();
const { getMeals, getMealById, createMeal, updateMeal, deleteMeal, getStats } = require("../controllers/mealController");
const { protect }     = require("../middleware/authMiddleware");
const { uploadMeal }  = require("../config/cloudinary");

// Public
router.get("/",         getMeals);
router.get("/stats",    protect, getStats);  // admin only
router.get("/:id",      getMealById);

// Admin only
router.post("/",        protect, uploadMeal.single("image"), createMeal);
router.put("/:id",      protect, uploadMeal.single("image"), updateMeal);
router.delete("/:id",   protect, deleteMeal);

module.exports = router;