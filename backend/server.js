// backend/server.js
const express      = require("express");
const mongoose     = require("mongoose");
const cors         = require("cors");
const dotenv       = require("dotenv");
const cookieParser = require("cookie-parser");
const helmet       = require("helmet");
const rateLimit    = require("express-rate-limit");

dotenv.config();

const app = express();

// ── SECURITY ──
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// ── RATE LIMIT on login ──
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many login attempts. Try again in 15 minutes." },
});
app.use("/api/auth/login", loginLimiter);

// ── ROUTES ──
app.use("/api/auth",       require("./routes/authRoutes"));
app.use("/api/meals",      require("./routes/mealRoutes"));
app.use("/api/gallery",    require("./routes/galleryRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));

// ── HEALTH CHECK ──
app.get("/", (req, res) => res.json({ status: "Happy Day API running 🍽️" }));

// ── DB + START ──
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => { console.error("❌ MongoDB error:", err); process.exit(1); });