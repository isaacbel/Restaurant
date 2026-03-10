// components/contact/ContactSection.tsx
"use client";

import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiFacebook, FiClock, FiMessageCircle } from "react-icons/fi";

const INFO = [
  {
    icon: <FiMapPin size={18} />,
    label: "Address",
    lines: ["Rue du Fort Turk", "Tamentfoust (La Pérouse), Algiers"],
  },
  {
    icon: <FiPhone size={18} />,
    label: "Phone",
    lines: ["0557 82 91 34", "0540 17 11 61"],
  },
  {
    icon: <FiMail size={18} />,
    label: "Email",
    lines: ["anischachou8@gmail.com"],
  },
  {
    icon: <FiClock size={18} />,
    label: "Hours",
    lines: ["Open Every Day", "12:00 — 23:00"],
  },
];

const SOCIAL = [
  {
    icon: <FiInstagram size={20} />,
    label: "Instagram",
    handle: "@restaurant_happy_day",
    href: "https://www.instagram.com/restaurant_happy_day/",
    followers: "46K followers",
  },
  {
    icon: <FiFacebook size={20} />,
    label: "Facebook",
    handle: "Restaurant Happy Day",
    href: "https://www.facebook.com/p/Restaurant-Happy-Day-100064280642739/",
    followers: "28K likes",
  },
];

export default function ContactSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: "#0A0A0A" }}>

      {/* ── HEADER BAND ── */}
      <div
        className="relative w-full py-24 flex flex-col items-center justify-center text-center px-4"
        style={{ borderBottom: "1px solid rgba(212,175,55,0.08)" }}
      >
        {/* Gold glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)" }}
        />

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          style={{ fontFamily: "'Tenor Sans', sans-serif" }}
          className="text-[0.6rem] text-[#D4AF37]/60 uppercase tracking-[0.5em] mb-4"
        >
          Get In Touch
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            letterSpacing: "0.22em",
            color: "#D4AF37",
          }}
          className="text-4xl md:text-6xl uppercase mb-4"
        >
          Contact Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          className="text-white/40 italic text-base"
        >
          We'd love to welcome you to our table by the sea.
        </motion.p>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

          {/* ── INFO CARDS ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4"
          >
            <h2
              className="text-2xl uppercase mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, letterSpacing: "0.15em", color: "#f5f0e8" }}
            >
              Visit Us
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-10 bg-gradient-to-r from-[#D4AF37]/50 to-transparent" />
              <div className="w-1 h-1 rotate-45 bg-[#D4AF37]/40" style={{ flexShrink: 0 }} />
            </div>

            {INFO.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="flex items-start gap-4 p-5"
                style={{
                  background: "#111",
                  border: "1px solid rgba(212,175,55,0.1)",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.1)")}
              >
                {/* Icon */}
                <div
                  className="flex items-center justify-center w-9 h-9 flex-shrink-0"
                  style={{ border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37" }}
                >
                  {item.icon}
                </div>

                {/* Text */}
                <div>
                  <p
                    className="mb-1"
                    style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", color: "rgba(212,175,55,0.5)", textTransform: "uppercase" }}
                  >
                    {item.label}
                  </p>
                  {item.lines.map((line, j) => (
                    <p
                      key={j}
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.65)" }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Social */}
            <div className="mt-2">
              <p
                className="mb-3"
                style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.55rem", letterSpacing: "0.35em", color: "rgba(212,175,55,0.45)", textTransform: "uppercase" }}
              >
                Follow Us
              </p>
              <div className="flex flex-col gap-3">
                {SOCIAL.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 group transition-all duration-300"
                    style={{
                      background: "#111",
                      border: "1px solid rgba(212,175,55,0.1)",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.35)")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.1)")}
                  >
                    <div className="text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors">{s.icon}</div>
                    <div className="flex-1">
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.6)" }}>{s.handle}</p>
                      <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(212,175,55,0.4)" }} className="uppercase">{s.followers}</p>
                    </div>
                    <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(212,175,55,0.4)" }} className="uppercase">
                      Visit →
                    </span>
                  </a>
                ))}
              </div>

            {/* WhatsApp */}
            <div className="mt-4">
              <p
                className="mb-3"
                style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.55rem", letterSpacing: "0.35em", color: "rgba(212,175,55,0.45)", textTransform: "uppercase" }}
              >
                Message Us Directly
              </p>

              <a
                href="https://wa.me/213557829134"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 group transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(37,211,102,0.08), rgba(37,211,102,0.03))",
                  border: "1px solid rgba(37,211,102,0.2)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(37,211,102,0.5)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(37,211,102,0.2)")}
              >
                {/* WhatsApp icon */}
                <div
                  className="flex items-center justify-center w-10 h-10 flex-shrink-0"
                  style={{ background: "#25D366", borderRadius: "50%" }}
                >
                  <FiMessageCircle size={18} color="#fff" />
                </div>

                <div className="flex-1">
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "rgba(255,255,255,0.75)", marginBottom: "2px" }}>
                    Chat on WhatsApp
                  </p>
                  <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(37,211,102,0.6)" }} className="uppercase">
                    0557 82 91 34 · Usually replies fast
                  </p>
                </div>

                <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(37,211,102,0.5)" }} className="uppercase group-hover:text-[#25D366] transition-colors">
                  Open →
                </span>
              </a>
            </div>
            </div>
          </motion.div>

          {/* ── MAP ── */}
          
        </div>

        {/* Bottom ornament */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex items-center justify-center gap-3"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/35" />
          <div className="w-1 h-1 rotate-45 bg-[#D4AF37]/35" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/35" />
        </motion.div>

      </div>
    </section>
  );
}