// components/gallery/GalleryGrid.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiPlay } from "react-icons/fi";
import { GalleryItem } from "./gallery.constants";

interface GalleryGridProps {
  images: GalleryItem[];
  onItemClick: (index: number) => void;
}

export default function GalleryGrid({ images, onItemClick }: GalleryGridProps) {
  return (
    <>
      <style>{`
        .gallery-columns {
          columns: 2;
          column-gap: 12px;
        }

        @media (min-width: 768px) {
          .gallery-columns {
            columns: 3;
            column-gap: 14px;
          }
        }

        @media (min-width: 1280px) {
          .gallery-columns {
            columns: 4;
            column-gap: 16px;
          }
        }

        .gallery-item {
          break-inside: avoid;
          margin-bottom: 12px;
          display: block;
        }

        @media (min-width: 768px) {
          .gallery-item { margin-bottom: 14px; }
        }

        @media (min-width: 1280px) {
          .gallery-item { margin-bottom: 16px; }
        }
      `}</style>

     <section className="gallery-columns w-full">
        {images.map((item, i) => (
          <motion.div
            key={`${item.src}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: (i % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onItemClick(i)}
            className="gallery-item relative overflow-hidden cursor-pointer group"
            style={{ border: "1px solid rgba(212,175,55,0.1)" }}
          >
            {/* ── IMAGE — natural height ── */}
            {item.type === "image" && (
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            )}

            {/* ── VIDEO — natural aspect ratio ── */}
            {item.type === "video" && (
              <video
                src={item.src}
                muted
                loop
                playsInline
                autoPlay
                className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-105"
              />
            )}

            {/* Vignette */}
            <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:opacity-0" />

            {/* Hover overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center"
              style={{ background: "rgba(0,0,0,0.5)" }}
            >
              {/* Gold corners */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#D4AF37]/70" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#D4AF37]/70" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#D4AF37]/70" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#D4AF37]/70" />

              {/* Play icon for videos */}
              {item.type === "video" && (
                <div className="w-10 h-10 rounded-full border border-[#D4AF37]/70 flex items-center justify-center mb-3 bg-black/30">
                  <FiPlay size={14} className="text-[#D4AF37] ml-0.5" />
                </div>
              )}

              {/* Caption */}
              <p
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, letterSpacing: "0.12em" }}
                className="text-white text-sm italic text-center px-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300"
              >
                {item.alt}
              </p>

              {/* Gold ornament */}
              <div className="flex items-center gap-2 mt-1.5">
                <div className="h-px w-5 bg-[#D4AF37]/55" />
                <div className="w-1 h-1 rotate-45 bg-[#D4AF37]/55" />
                <div className="h-px w-5 bg-[#D4AF37]/55" />
              </div>

              {/* Category */}
              <span
                className="absolute bottom-3 right-3"
                style={{
                  fontFamily: "'Tenor Sans', sans-serif",
                  fontSize: "0.48rem",
                  letterSpacing: "0.28em",
                  color: "rgba(212,175,55,0.7)",
                  textTransform: "uppercase",
                }}
              >
                {item.category}
              </span>
            </div>
          </motion.div>
        ))}
      </section>
    </>
  );
}