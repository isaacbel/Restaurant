// frontend/app/admin/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import { authService } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [focused,  setFocused]  = useState<"email" | "password" | null>(null);

  useEffect(() => {
    if (authService.isLoggedIn()) router.replace("/admin/dashboard");
  }, [router]);

  const handleLogin = async () => {
    if (!email || !password) { setError("Both fields are required"); return; }
    setLoading(true);
    setError("");
    try {
      await authService.login(email, password);
      router.replace("/admin/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ background: "#080808" }}>

      {/* ── LEFT PANEL — decorative ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[42%] relative overflow-hidden p-12"
        style={{ background: "#0D0D0D", borderRight: "1px solid rgba(212,175,55,0.08)" }}
      >
        {/* Animated vertical gold lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 bottom-0"
              style={{
                left:       `${8 + i * 16}%`,
                width:      "1px",
                background: `linear-gradient(to bottom, transparent 0%, rgba(212,175,55,${0.025 + i * 0.008}) 40%, rgba(212,175,55,${0.025 + i * 0.008}) 60%, transparent 100%)`,
              }}
              initial={{ scaleY: 0, originY: "top" }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 2, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}

          {/* Gold orb bottom left */}
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 65%)" }} />

          {/* Rotating diamond top right */}
          <motion.div
            className="absolute top-14 right-14"
            style={{ width: "56px", height: "56px", border: "1px solid rgba(212,175,55,0.07)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-19 right-19"
            style={{ width: "40px", height: "40px", border: "1px solid rgba(212,175,55,0.04)", top: "80px", right: "80px" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Restaurant brand */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="relative z-10 flex items-center gap-4"
        >
          <Image src="/2.png" alt="Happy Day" width={42} height={42} className="object-contain opacity-90" />
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.15rem", letterSpacing: "0.2em", color: "#D4AF37" }}>
              Happy Day
            </p>
            <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.42rem", letterSpacing: "0.45em", color: "rgba(212,175,55,0.3)" }} className="uppercase">
              Restaurant · Est. 2010
            </p>
          </div>
        </motion.div>

        {/* Center text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#D4AF37]/35" />
            <div className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: "rgba(212,175,55,0.35)" }} />
          </div>
          <h2 style={{
            fontFamily:    "'Cormorant Garamond', serif",
            fontWeight:    300,
            fontSize:      "2.8rem",
            lineHeight:    1.2,
            color:         "rgba(255,255,255,0.06)",
            letterSpacing: "0.04em",
          }}>
            Manage your<br />
            <span style={{ color: "rgba(212,175,55,0.28)" }}>restaurant</span><br />
            with ease.
          </h2>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px w-8 bg-[#D4AF37]/20" />
            <div className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: "rgba(212,175,55,0.2)" }} />
            <div className="h-px w-16 bg-[#D4AF37]/10" />
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="relative z-10"
        >
          <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.46rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.1)", textTransform: "uppercase" }}>
            Restricted · Admin Access Only
          </p>
        </motion.div>
      </div>

      {/* ── RIGHT PANEL — form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">

        {/* Subtle radial glow center */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div style={{ width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(212,175,55,0.025) 0%, transparent 65%)" }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[340px] relative z-10"
        >

          {/* Mobile logo */}
          <motion.div
            className="lg:hidden flex items-center gap-3 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Image src="/2.png" alt="logo" width={32} height={32} className="object-contain" />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1rem", letterSpacing: "0.18em", color: "#D4AF37" }}>
              Happy Day
            </p>
          </motion.div>

          {/* Heading */}
          <div className="mb-9">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.5rem", letterSpacing: "0.45em", color: "rgba(212,175,55,0.45)", textTransform: "uppercase" }}
              className="mb-2.5"
            >
              Admin Panel
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.9 }}
              style={{
                fontFamily:    "'Cormorant Garamond', serif",
                fontWeight:    300,
                fontSize:      "2.4rem",
                letterSpacing: "0.06em",
                color:         "#f5f0e8",
                lineHeight:    1.1,
              }}
            >
              Welcome<br />back.
            </motion.h1>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto", marginBottom: "20px" }}
                exit={{ opacity: 0, y: -6, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.22 }}
                className="flex items-center gap-2.5 px-4 py-3"
                style={{ background: "rgba(255,80,80,0.06)", border: "1px solid rgba(255,80,80,0.18)" }}
              >
                <div className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.08em", color: "rgba(255,120,120,0.9)" }}>
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email field */}
          <div className="mb-4">
            <label style={{
              fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.48rem",
              letterSpacing: "0.38em", textTransform: "uppercase", display: "block", marginBottom: "8px",
              color: focused === "email" ? "rgba(212,175,55,0.65)" : "rgba(212,175,55,0.38)",
              transition: "color 0.2s",
            }}>
              Email
            </label>
            <div className="relative">
              <FiMail size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200"
                style={{ color: focused === "email" ? "rgba(212,175,55,0.55)" : "rgba(255,255,255,0.18)" }} />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                placeholder="admin@happyday.dz"
                className="w-full outline-none transition-all duration-200"
                style={{
                  paddingLeft: "38px", paddingRight: "14px", paddingTop: "13px", paddingBottom: "13px",
                  background: "#111",
                  border: `1px solid ${focused === "email" ? "rgba(212,175,55,0.35)" : "rgba(255,255,255,0.06)"}`,
                  color: "rgba(255,255,255,0.82)",
                  fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.78rem", letterSpacing: "0.02em",
                  boxShadow: focused === "email" ? "0 0 0 3px rgba(212,175,55,0.05)" : "none",
                }}
              />
            </div>
          </div>

          {/* Password field */}
          <div className="mb-8">
            <label style={{
              fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.48rem",
              letterSpacing: "0.38em", textTransform: "uppercase", display: "block", marginBottom: "8px",
              color: focused === "password" ? "rgba(212,175,55,0.65)" : "rgba(212,175,55,0.38)",
              transition: "color 0.2s",
            }}>
              Password
            </label>
            <div className="relative">
              <FiLock size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200"
                style={{ color: focused === "password" ? "rgba(212,175,55,0.55)" : "rgba(255,255,255,0.18)" }} />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
                placeholder="••••••••••"
                className="w-full outline-none transition-all duration-200"
                style={{
                  paddingLeft: "38px", paddingRight: "42px", paddingTop: "13px", paddingBottom: "13px",
                  background: "#111",
                  border: `1px solid ${focused === "password" ? "rgba(212,175,55,0.35)" : "rgba(255,255,255,0.06)"}`,
                  color: "rgba(255,255,255,0.82)",
                  fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.78rem", letterSpacing: "0.12em",
                  boxShadow: focused === "password" ? "0 0 0 3px rgba(212,175,55,0.05)" : "none",
                }}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200"
                style={{ color: showPass ? "rgba(212,175,55,0.55)" : "rgba(255,255,255,0.22)" }}
              >
                {showPass ? <FiEyeOff size={13} /> : <FiEye size={13} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <motion.button
            onClick={handleLogin}
            disabled={loading}
            whileTap={!loading ? { scale: 0.985 } : {}}
            className="w-full py-4 mb-4 relative overflow-hidden disabled:cursor-not-allowed"
            style={{
              background:    loading ? "rgba(212,175,55,0.25)" : "linear-gradient(135deg, #C9A227 0%, #f0cc5a 55%, #C9A227 100%)",
              fontFamily:    "'Tenor Sans', sans-serif",
              fontSize:      "0.6rem",
              letterSpacing: "0.38em",
              color:         loading ? "rgba(0,0,0,0.35)" : "#060606",
              fontWeight:    700,
              textTransform: "uppercase",
              transition:    "all 0.25s",
              boxShadow:     loading ? "none" : "0 4px 20px rgba(212,175,55,0.2)",
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2.5">
                <span className="w-3 h-3 border border-black/25 border-t-black/60 rounded-full animate-spin" />
                Verifying
              </span>
            ) : (
              "Enter Dashboard"
            )}
          </motion.button>

          {/* Ornament divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
            <div className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: "rgba(212,175,55,0.15)" }} />
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
          </div>

          {/* Back link */}
          <a
            href="/"
            className="flex items-center justify-center gap-2 py-3 w-full transition-all duration-200"
            style={{ border: "1px solid rgba(255,255,255,0.05)", textDecoration: "none", color: "rgba(255,255,255,0.2)" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(212,175,55,0.18)";
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(212,175,55,0.55)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.05)";
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.2)";
            }}
          >
            <FiArrowLeft size={11} />
            <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.48rem", letterSpacing: "0.32em", textTransform: "uppercase" }}>
              Back to website
            </span>
          </a>

        </motion.div>
      </div>
    </div>
  );
}
    
//belatrecheishak68_db_user isaacesi
//mongodb+srv://belatrecheishak68_db_user:isaacesi@cluster1.aycrycw.mongodb.net/


//CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dw1cishf0
//939355734473454
//R9GlR5Bniz-I_fq31P3GzkHTJaY