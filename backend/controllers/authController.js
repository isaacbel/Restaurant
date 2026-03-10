// backend/controllers/authController.js
const jwt   = require("jsonwebtoken");
const Admin = require("../models/Admin");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const setCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge:   7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required" });

    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.comparePassword(password)))
      return res.status(401).json({ error: "Invalid email or password" });

    const token = generateToken(admin._id);
    setCookie(res, token);

    res.json({
      message: "Login successful",
      admin: { id: admin._id, username: admin.username, email: admin.email },
      token, // also return for localStorage fallback
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// POST /api/auth/logout
const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

// GET /api/auth/me  (protected)
const getMe = async (req, res) => {
  res.json({ admin: { id: req.admin._id, username: req.admin.username, email: req.admin.email } });
};

// POST /api/auth/register  (use once to create admin, then disable)
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ error: "Admin already exists" });

    const admin = await Admin.create({ username, email, password });
    const token = generateToken(admin._id);
    setCookie(res, token);

    res.status(201).json({
      message: "Admin created",
      admin: { id: admin._id, username: admin.username, email: admin.email },
      token,
    });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { login, logout, getMe, register };