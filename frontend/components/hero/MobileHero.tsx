// components/hero/MobileHero.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// ── Put your food images in public/images/food/
const SLIDES = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
];

// Duplicate for seamless infinite loop
const LOOP_SLIDES = [...SLIDES, ...SLIDES];

interface MobileHeroProps {
  onScrollToMenu: () => void;
}

export default function MobileHero({ onScrollToMenu }: MobileHeroProps) {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-black pt-20 pb-12"
    >

      {/* ── BACKGROUND subtle gradient ── */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.04) 0%, transparent 70%)" }}
      />

      {/* ── CONTENT TOP ── */}
      <div className="relative z-10 text-center px-6 mb-10 flex flex-col items-center">

        {/* Ornament */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <div className="w-1 h-1 rotate-45 bg-[#D4AF37]" />
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </motion.div>

        {/* EST */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          style={{ fontFamily: "'Tenor Sans', sans-serif" }}
          className="text-[0.55rem] text-[#D4AF37]/70 uppercase tracking-[0.4em] mb-5"
        >
          Est. 2010 · Fine Dining
        </motion.p>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mb-5"
        >
          <Image
            src="/2.png"
            alt="Happy Day Restaurant"
            width={130}
            height={130}
            className="object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            priority
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            letterSpacing: "0.3em",
            color: "#D4AF37",
            textShadow: "0 0 40px rgba(212,175,55,0.2)",
          }}
          className="text-4xl uppercase mb-2"
        >
          Happy Day
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          style={{ fontFamily: "'Tenor Sans', sans-serif" }}
          className="text-[0.6rem] tracking-[0.5em] text-white/35 uppercase mb-6"
        >
          Restaurant
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          className="text-base text-white/60 italic leading-relaxed mb-8 max-w-xs"
        >
          Where every dish tells a story of passion and perfection.
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1 }}
          onClick={onScrollToMenu}
          className="px-10 py-3 text-black font-medium active:scale-[0.97]"
          style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            background: "linear-gradient(135deg, #D4AF37, #f0cc5a)",
            boxShadow: "0 4px 20px rgba(212,175,55,0.3)",
          }}
        >
          EXPLORE MENU
        </motion.button>

      </div>

      {/* ── INFINITE IMAGE SLIDER ── */}
      <motion.div
        className="relative z-10 flex gap-3 px-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: "linear",
        }}
        style={{ width: "max-content" }}
      >
        {LOOP_SLIDES.map((src, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 overflow-hidden"
            style={{
              width: "180px",
              height: "240px",
              borderRadius: "8px",
              border: "1px solid rgba(212,175,55,0.15)",
            }}
          >
            <Image
              src={src}
              alt={`dish-${i}`}
              fill
              className="object-cover"
              sizes="180px"
            />
            {/* subtle gold overlay */}
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)"
            }} />
          </div>
        ))}
      </motion.div>

      {/* edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-12 z-20 pointer-events-none"
        style={{ background: "linear-gradient(to right, black, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-12 z-20 pointer-events-none"
        style={{ background: "linear-gradient(to left, black, transparent)" }} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
}