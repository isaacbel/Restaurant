// components/gallery/Gallery.tsx
"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import GalleryGrid from "./GalleryGrid";
import Lightbox    from "./Lightbox";
import {
  GALLERY_IMAGES,
  GALLERY_CATEGORIES,
  GalleryCategory,
} from "./gallery.constants";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex]   = useState<number | null>(null);

  const filtered = useMemo(() =>
    activeCategory === "All"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  };

  return (
    <>
      <section
        id="gallery"
        className="relative w-full py-24 px-6 md:px-12 lg:px-20 overflow-hidden"
        style={{ background: "#0A0A0A" }}
      >
        {/* Subtle gold glow top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 70%)" }}
        />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* ── HEADER ── */}
         {/* ── HEADER ── */}
<header className="text-center mb-20">

  {/* Top Ornament */}
  <motion.div
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
    className="flex items-center justify-center gap-3 mb-8"
  >
    <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
    <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
    <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
  </motion.div>

  {/* Small label */}
  <motion.p
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1, duration: 0.8 }}
    style={{ fontFamily: "'Tenor Sans', sans-serif" }}
    className="text-[0.65rem] text-[#D4AF37]/60 uppercase tracking-[0.5em] mb-5"
  >
    Visual Journey
  </motion.p>

  {/* Title */}
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.2, duration: 0.8 }}
    style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 300,
      letterSpacing: "0.22em",
      color: "#D4AF37",
    }}
    className="text-4xl md:text-5xl uppercase mb-6"
  >
    Our Gallery
  </motion.h2>

  {/* Description */}
 <motion.p
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.35, duration: 0.8 }}
  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
 className="text-white/50 italic text-sm md:text-base mx-auto text-center md:whitespace-nowrap px-4 mb-14"
>
  A curated collection of moments, flavors, and atmosphere from Happy Day Restaurant.
</motion.p>

</header>
          {/* ── FILTER TABS ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex items-center justify-center flex-wrap gap-2 mt-14 mb-16"
          >
            {GALLERY_CATEGORIES.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    fontFamily: "'Tenor Sans', sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.28em",
                    transition: "all 0.3s",
                    background: isActive ? "linear-gradient(135deg, #D4AF37, #f0cc5a)" : "transparent",
                    color:      isActive ? "#000" : "rgba(255,255,255,0.45)",
                    border:     isActive ? "1px solid transparent" : "1px solid rgba(212,175,55,0.2)",
                    padding:    "0.45rem 1.2rem",
                  }}
                  className="uppercase hover:text-[#D4AF37] hover:border-[#D4AF37]/40"
                >
                  {cat}
                </button>
              );
            })}
          </motion.div>

          {/* ── GRID ── */}
          <GalleryGrid
            images={filtered}
            onItemClick={(i) => setLightboxIndex(i)}
          />

          {/* ── BOTTOM ORNAMENT ── */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center gap-3 mt-16"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/40" />
            <div className="w-1 h-1 rotate-45 bg-[#D4AF37]/40" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/40" />
          </motion.div>

        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <Lightbox
        item={lightboxIndex !== null ? filtered[lightboxIndex] : null}
        onClose={() => setLightboxIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        current={lightboxIndex ?? 0}
        total={filtered.length}
      />
    </>
  );
}