// components/hero/DesktopHero.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface DesktopHeroProps {
  onScrollToMenu: () => void;
}

export default function DesktopHero({ onScrollToMenu }: DesktopHeroProps) {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── BACKGROUND VIDEO ── */}
      <video
        autoPlay loop muted playsInline preload="metadata"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      >
        <source src="/videos/restaurant_happy_day_3.mp4" type="video/mp4" />
      </video>

      {/* ── LAYERED OVERLAYS ── */}
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{ background: "linear-gradient(to top, rgba(212,175,55,0.08), transparent)" }}
      />

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">

        {/* Top ornament */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </motion.div>

        {/* EST badge */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          style={{ fontFamily: "'Tenor Sans', sans-serif" }}
          className="text-[0.6rem] text-[#D4AF37]/70 uppercase tracking-[0.45em] mb-6"
        >
          Est. 2010 · Fine Dining
        </motion.p>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <Image
            src="/2.png"
            alt="Happy Day Restaurant"
            width={200}
            height={200}
            className="object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            priority
          />
        </motion.div>

        {/* Restaurant name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            letterSpacing: "0.3em",
            color: "#D4AF37",
            textShadow: "0 0 60px rgba(212,175,55,0.25)",
          }}
          className="text-5xl md:text-7xl lg:text-8xl uppercase mb-3"
        >
          Happy Day
        </motion.h1>

        {/* Restaurant label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          style={{ fontFamily: "'Tenor Sans', sans-serif" }}
          className="text-[0.65rem] tracking-[0.55em] text-white/40 uppercase mb-8"
        >
          Restaurant
        </motion.p>

        {/* Bottom ornament */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
          <div className="w-1 h-1 rotate-45 bg-[#D4AF37]/50" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          className="text-lg md:text-xl text-white/65 max-w-xl mx-auto leading-relaxed italic mb-12"
        >
          Experience the art of fine dining — where every dish
          tells a story of passion and perfection.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1 }}
        >
          <button
            onClick={onScrollToMenu}
            className="px-12 py-3.5 text-black font-medium transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              background: "linear-gradient(135deg, #D4AF37, #f0cc5a)",
              boxShadow: "0 4px 24px rgba(212,175,55,0.35)",
            }}
          >
            EXPLORE MENU
          </button>
        </motion.div>

      </div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={onScrollToMenu}
      >
        <span
          style={{ fontFamily: "'Tenor Sans', sans-serif" }}
          className="text-[0.55rem] tracking-[0.4em] text-white/30 uppercase"
        >
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 h-1.5 rounded-full bg-[#D4AF37]/60"
          />
        </div>
      </motion.div>

      {/* ── BOTTOM FADE ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}