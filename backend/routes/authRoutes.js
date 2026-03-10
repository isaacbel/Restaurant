// backend/routes/authRoutes.js
const express = require("express");
const router  = express.Router();
const { login, logout, getMe, register } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/login",    login);
router.post("/logout",   logout);
//router.post("/register", register); // ⚠️ disable after creating your admin account
router.get("/me",        protect, getMe);

module.exports = router;