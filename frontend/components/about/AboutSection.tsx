
// components/about/AboutSection.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const STATS = [
  { value: "2010",  label: "Established"    },
  { value: "46K+",  label: "Instagram Fans" },
  { value: "100%",  label: "Fresh Seafood"  },
  { value: "★ 4.8", label: "Guest Rating"   },
];

const VALUES = [
  {
    icon: "🐟",
    title: "Fresh From The Sea",
    desc: "Every morning our chefs select the finest catch directly from the port of Tamentfoust — just steps from our kitchen.",
  },
  {
    icon: "👨‍🍳",
    title: "Culinary Mastery",
    desc: "Our chefs blend Algerian tradition with contemporary fine dining techniques, creating dishes that honor both heritage and innovation.",
  },
  {
    icon: "🌊",
    title: "Seaside Atmosphere",
    desc: "Nestled beside the Mediterranean, our terrace offers breathtaking views and the soothing sound of waves as your backdrop.",
  },
];

export default function AboutSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: "#0A0A0A" }}>

      {/* ── HERO BAND ── */}
      <div className="relative w-full h-[38vh] overflow-hidden">
        <Image
          src="/images/6.jpg"
          alt="Happy Day Restaurant"
          fill
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.95) 100%)"
        }} />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex items-center gap-3 mb-5"
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
            Our Story
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
            className="text-4xl md:text-6xl uppercase"
          >
            About Us
          </motion.h1>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-20">

        {/* Story block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-[0.6rem] uppercase tracking-[0.45em] mb-4"
              style={{ fontFamily: "'Tenor Sans', sans-serif", color: "rgba(212,175,55,0.55)" }}
            >
              Est. 2010 · Tamentfoust, Algiers
            </p>

            <h2
              className="text-3xl md:text-4xl uppercase mb-6 leading-tight"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                letterSpacing: "0.15em",
                color: "#f5f0e8",
              }}
            >
              Where the Sea<br />Meets the Table
            </h2>

            {/* Ornament */}
            <div className="flex items-center gap-2 mb-7">
              <div className="h-px w-10 bg-gradient-to-r from-[#D4AF37]/50 to-transparent" />
              <div className="w-1 h-1 rotate-45 bg-[#D4AF37]/50" style={{ flexShrink: 0 }} />
            </div>

            <p
              className="mb-5 leading-relaxed"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.85,
              }}
            >
              Born in 2010 on the shores of Tamentfoust — La Pérouse — Happy Day Restaurant was founded
              with a single vision: to bring the finest flavors of the Mediterranean to the tables of Algiers.
              Just steps from the port, our kitchen is blessed with the freshest seafood the sea has to offer.
            </p>

            <p
              className="leading-relaxed"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.85,
              }}
            >
              Over a decade later, with over 46,000 followers on Instagram and hundreds of loyal guests,
              Happy Day has grown into one of Algiers' most beloved fine dining destinations — where every
              visit feels like a celebration.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div
              className="relative overflow-hidden"
              style={{ height: "420px", border: "1px solid rgba(212,175,55,0.15)" }}
            >
              <Image
                src="/images/2.jpg"
                alt="Restaurant Interior"
                fill
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.05) 0%, transparent 60%)" }}
              />
            </div>
            {/* Gold accent frame */}
            <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b border-r border-[#D4AF37]/25 pointer-events-none" />
            <div className="absolute -top-3 -left-3 w-24 h-24 border-t border-l border-[#D4AF37]/25 pointer-events-none" />

            {/* Est badge */}
            <div
              className="absolute -bottom-5 left-6 px-5 py-3"
              style={{
                background: "#0A0A0A",
                border: "1px solid rgba(212,175,55,0.25)",
              }}
            >
              <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", color: "rgba(212,175,55,0.5)" }} className="uppercase mb-0.5">Since</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.8rem", color: "#D4AF37", lineHeight: 1 }}>2010</p>
            </div>
          </motion.div>
        </div>

        {/* ── STATS ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px mb-24"
          style={{ border: "1px solid rgba(212,175,55,0.12)", background: "rgba(212,175,55,0.12)" }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-10 px-4 text-center"
              style={{ background: "#0A0A0A" }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "2.2rem",
                  color: "#D4AF37",
                  letterSpacing: "0.05em",
                }}
              >
                {s.value}
              </span>
              <span
                style={{
                  fontFamily: "'Tenor Sans', sans-serif",
                  fontSize: "0.52rem",
                  letterSpacing: "0.3em",
                  color: "rgba(255,255,255,0.35)",
                }}
                className="uppercase mt-1"
              >
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── VALUES ── */}
        <div className="text-center mb-12">
          <p style={{ fontFamily: "'Tenor Sans', sans-serif" }}
            className="text-[0.6rem] text-[#D4AF37]/55 uppercase tracking-[0.5em] mb-4">
            Our Philosophy
          </p>
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, letterSpacing: "0.18em", color: "#f5f0e8" }}
            className="text-3xl md:text-4xl uppercase"
          >
            What We Stand For
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {VALUES.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="p-8 text-center"
              style={{
                background: "#111",
                border: "1px solid rgba(212,175,55,0.1)",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.1)")}
            >
              <div className="text-3xl mb-5">{v.icon}</div>
              <h3
                className="mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "1.15rem", letterSpacing: "0.08em", color: "#D4AF37" }}
              >
                {v.title}
              </h3>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-px w-8 bg-[#D4AF37]/25" />
                <div className="w-1 h-1 rotate-45 bg-[#D4AF37]/25" style={{ flexShrink: 0 }} />
                <div className="h-px w-8 bg-[#D4AF37]/25" />
              </div>
              <p
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "0.95rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}
              >
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>


        {/* ── LOCATION MAP ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-24"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <p
              style={{ fontFamily: "'Tenor Sans', sans-serif" }}
              className="text-[0.6rem] text-[#D4AF37]/55 uppercase tracking-[0.5em] mb-4"
            >
              Where To Find Us
            </p>
            <h2
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, letterSpacing: "0.18em", color: "#f5f0e8" }}
              className="text-3xl md:text-4xl uppercase mb-2"
            >
              Our Location
            </h2>
            <p
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
              className="text-white/35 italic text-sm mt-3"
            >
              Rue du Fort Turk, Tamentfoust (La Pérouse), Algiers
            </p>
          </div>

          {/* Map + info side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0" style={{ border: "1px solid rgba(212,175,55,0.15)" }}>

            {/* Map — takes 2/3 */}
            <div className="lg:col-span-2 relative" style={{ minHeight: "380px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d800!2d3.1474!3d36.7878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb8e2aba97c69%3A0x8e44d82fd76a2fb5!2sRestaurant%20Happy%20Day!5e0!3m2!1sen!2sdz!4v1"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "grayscale(100%) invert(90%) contrast(85%)",
                  position: "absolute",
                  inset: 0,
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Happy Day Restaurant Location"
              />
            </div>

            {/* Info panel — takes 1/3 */}
            <div
              className="flex flex-col justify-between p-8"
              style={{ background: "#111", borderLeft: "1px solid rgba(212,175,55,0.12)" }}
            >
              <div>
                <p
                  className="mb-1"
                  style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.52rem", letterSpacing: "0.35em", color: "rgba(212,175,55,0.45)", textTransform: "uppercase" }}
                >
                  Address
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                  Rue du Fort Turk<br />
                  Tamentfoust (La Pérouse)<br />
                  Algiers, Algeria
                </p>

                <div className="flex items-center gap-2 my-6">
                  <div className="h-px w-8 bg-[#D4AF37]/25" />
                  <div className="w-1 h-1 rotate-45 bg-[#D4AF37]/25" style={{ flexShrink: 0 }} />
                  <div className="h-px w-8 bg-[#D4AF37]/25" />
                </div>

                <p
                  className="mb-1"
                  style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.52rem", letterSpacing: "0.35em", color: "rgba(212,175,55,0.45)", textTransform: "uppercase" }}
                >
                  Hours
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                  Open Every Day<br />
                  12:00 — 23:00
                </p>

                <div className="flex items-center gap-2 my-6">
                  <div className="h-px w-8 bg-[#D4AF37]/25" />
                  <div className="w-1 h-1 rotate-45 bg-[#D4AF37]/25" style={{ flexShrink: 0 }} />
                  <div className="h-px w-8 bg-[#D4AF37]/25" />
                </div>

                <p
                  className="mb-1"
                  style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.52rem", letterSpacing: "0.35em", color: "rgba(212,175,55,0.45)", textTransform: "uppercase" }}
                >
                  Phone
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                  0557 82 91 34<br />
                  0540 17 11 61
                </p>
              </div>

              {/* Directions button */}
              <a
                href="https://maps.app.goo.gl/WS4y7BQ6sKThqZGc9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 mt-8 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #f0cc5a)",
                  fontFamily: "'Tenor Sans', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.25em",
                  color: "#000",
                  fontWeight: 600,
                  textDecoration: "none",
                  textTransform: "uppercase",
                }}
              >
                Get Directions →
              </a>
            </div>

          </div>
        </motion.div>

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