// backend/middleware/authMiddleware.js
const jwt   = require("jsonwebtoken");
const Admin = require("../models/Admin");

const protect = async (req, res, next) => {
  try {
    // Token from httpOnly cookie OR Authorization header
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return res.status(401).json({ error: "Not authorized — no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id).select("-password");

    if (!req.admin) {
      return res.status(401).json({ error: "Admin not found" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalid or expired" });
  }
};

module.exports = { protect };