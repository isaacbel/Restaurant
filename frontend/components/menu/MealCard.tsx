// components/menu/MealCard.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Meal, TAG_STYLES } from "./menu.types";

interface MealCardProps {
  meal: Meal;
  index: number;
}

export default function MealCard({ meal, index }: MealCardProps) {
  const gold = "#D4AF37";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col overflow-hidden group"
      style={{
        background: "#111",
        border: "1px solid rgba(212,175,55,0.12)",
        transition: "border-color 0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.35)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.12)")}
    >
      {/* ── PROMOTION BADGE ── */}
      {meal.isPromotion && meal.promotionPrice && (
        <div
          className="absolute top-3 left-3 z-20 px-2.5 py-1"
          style={{
            background: "linear-gradient(135deg, #D4AF37, #f0cc5a)",
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            color: "#000",
            fontWeight: 600,
          }}
        >
          PROMO
        </div>
      )}

      {/* ── IMAGE ── */}
      <div className="relative w-full overflow-hidden" style={{ height: "220px" }}>
        <Image
          src={meal.image}
          alt={meal.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Gradient overlay at bottom of image */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{ background: "linear-gradient(to top, #111, transparent)" }}
        />
      </div>

      {/* ── CONTENT ── */}
      <div className="flex flex-col flex-1 p-5">

        {/* Category label */}
        <span
          className="mb-2"
          style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: "0.52rem",
            letterSpacing: "0.35em",
            color: "rgba(212,175,55,0.55)",
            textTransform: "uppercase",
          }}
        >
          {meal.category}
        </span>

        {/* Name */}
        <h3
          className="mb-2 leading-tight"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "1.2rem",
            letterSpacing: "0.08em",
            color: "#f5f5f5",
          }}
        >
          {meal.name}
        </h3>

        {/* Ornament */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-px w-8 bg-gradient-to-r from-[#D4AF37]/40 to-transparent" />
          <div className="w-1 h-1 rotate-45 bg-[#D4AF37]/30" style={{ flexShrink: 0 }} />
        </div>

        {/* Description */}
        <p
          className="mb-4 flex-1"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "0.88rem",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.65,
          }}
        >
          {meal.description}
        </p>

        {/* Dietary tags */}
        {meal.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {meal.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5"
                style={{
                  fontFamily: "'Tenor Sans', sans-serif",
                  fontSize: "0.55rem",
                  letterSpacing: "0.15em",
                  color: TAG_STYLES[tag].color,
                  background: TAG_STYLES[tag].bg,
                  border: `1px solid ${TAG_STYLES[tag].color}30`,
                }}
              >
                {TAG_STYLES[tag].label}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-3 mt-auto pt-3" style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
          {meal.isPromotion && meal.promotionPrice ? (
            <>
              {/* Discounted price */}
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  fontSize: "1.3rem",
                  color: gold,
                  letterSpacing: "0.05em",
                }}
              >
                {meal.promotionPrice.toFixed(2)} DA
              </span>
              {/* Original price crossed out */}
              <span
                style={{
                  fontFamily: "'Tenor Sans', sans-serif",
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.25)",
                  textDecoration: "line-through",
                }}
              >
                {meal.price.toFixed(2)} DA
              </span>
              {/* Savings */}
              <span
                className="ml-auto px-2 py-0.5"
                style={{
                  fontFamily: "'Tenor Sans', sans-serif",
                  fontSize: "0.52rem",
                  letterSpacing: "0.1em",
                  color: "#6bcb77",
                  background: "rgba(107,203,119,0.1)",
                  border: "1px solid rgba(107,203,119,0.2)",
                }}
              >
                -{Math.round(((meal.price - meal.promotionPrice) / meal.price) * 100)}%
              </span>
            </>
          ) : (
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                fontSize: "1.3rem",
                color: gold,
                letterSpacing: "0.05em",
              }}
            >
              {meal.price.toFixed(2)} DA
            </span>
          )}
        </div>

      </div>
    </motion.div>
  );
}