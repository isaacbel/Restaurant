// backend/models/Admin.js
const mongoose = require("mongoose");
// try bcrypt first, fall back to bcryptjs
let bcrypt;
try { bcrypt = require("bcrypt"); } catch { bcrypt = require("bcryptjs"); }

const adminSchema = new mongoose.Schema({
  username:  { type: String, required: true, unique: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true, minlength: 6 },
}, { timestamps: true });

// Hash password before saving
adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Compare password method
adminSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model("Admin", adminSchema);