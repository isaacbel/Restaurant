// backend/models/Meal.js
const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  name:           { type: String,   required: true, trim: true },
  description:    { type: String,   required: true },
  price:          { type: Number,   required: true, min: 0 },
  promotionPrice: { type: Number,   default: null, min: 0 },
  isPromotion:    { type: Boolean,  default: false },
  category:       { type: String,   required: true },
  image:          { type: String,   required: true },   // Cloudinary URL
  imagePublicId:  { type: String,   default: "" },      // Cloudinary public_id for deletion
  tags:           { type: [String], default: [] },      // ["Spicy","Vegan","Gluten-Free"]
  isVisible:      { type: Boolean,  default: true },
}, { timestamps: true });

module.exports = mongoose.model("Meal", mealSchema);