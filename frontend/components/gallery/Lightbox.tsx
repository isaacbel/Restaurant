// components/gallery/Lightbox.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GalleryItem } from "./gallery.constants";

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  current: number;
  total: number;
}

export default function Lightbox({
  item, onClose, onPrev, onNext, current, total,
}: LightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.body.style.overflow = item ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [item]);

  useEffect(() => {
    if (item?.type === "video" && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [item]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
          style={{ background: "rgba(0,0,0,0.97)" }}
          onClick={onClose}
        >
          {/* Gold corner accents */}
          <div className="absolute top-5 left-5 w-7 h-7 border-t border-l border-[#D4AF37]/35 pointer-events-none" />
          <div className="absolute top-5 right-5 w-7 h-7 border-t border-r border-[#D4AF37]/35 pointer-events-none" />
          <div className="absolute bottom-5 left-5 w-7 h-7 border-b border-l border-[#D4AF37]/35 pointer-events-none" />
          <div className="absolute bottom-5 right-5 w-7 h-7 border-b border-r border-[#D4AF37]/35 pointer-events-none" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center border border-[#D4AF37]/30 text-white/50 hover:text-[#D4AF37] hover:border-[#D4AF37]/60 transition-all duration-200 z-20"
          >
            <FiX size={16} />
          </button>

          {/* Counter */}
          <div
            className="absolute top-6 left-1/2 -translate-x-1/2 z-20"
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.3em",
              color: "rgba(212,175,55,0.55)",
            }}
          >
            {current + 1} / {total}
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center border border-[#D4AF37]/25 text-white/45 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-200 z-20"
          >
            <FiChevronLeft size={18} />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center border border-[#D4AF37]/25 text-white/45 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-200 z-20"
          >
            <FiChevronRight size={18} />
          </button>

          {/* ── MEDIA ── */}
          <motion.div
            key={item.src}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* IMAGE — natural size, constrained to viewport */}
            {item.type === "image" && (
              <img
                src={item.src}
                alt={item.alt}
                className="max-w-full max-h-[80vh] w-auto h-auto object-contain"
                style={{ boxShadow: "0 8px 60px rgba(0,0,0,0.8)" }}
              />
            )}

            {/* VIDEO — natural size with controls */}
            {item.type === "video" && (
              <video
                ref={videoRef}
                src={item.src}
                controls
                playsInline
                className="max-w-full max-h-[80vh] w-auto h-auto outline-none"
                style={{
                  background: "#000",
                  boxShadow: "0 8px 60px rgba(0,0,0,0.8)",
                }}
              />
            )}

            {/* Caption */}
            <div className="mt-4 text-center">
              <p
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
                className="text-white/50 italic text-sm tracking-widest"
              >
                {item.alt}
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="h-px w-8 bg-[#D4AF37]/25" />
                <div className="w-1 h-1 rotate-45 bg-[#D4AF37]/35" />
                <div className="h-px w-8 bg-[#D4AF37]/25" />
              </div>
            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}