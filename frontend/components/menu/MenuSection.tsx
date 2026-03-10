// components/menu/MenuSection.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MealCard         from "./MealCard";
import MealCardSkeleton from "./MealCardSkeleton";
import MenuFilter       from "./MenuFilter";
import { Meal, MealCategory } from "./menu.types";
import { STATIC_MEALS } from "./Menu.data";

export default function MenuSection() {
  const [meals, setMeals]       = useState<Meal[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [category, setCategory] = useState<MealCategory>("All");

  // ── STATIC DATA (swap with API fetch when backend is ready) ──
  useEffect(() => {
    setMeals(STATIC_MEALS.filter((m) => m.isVisible));
    setLoading(false);
  }, []);

  // Category counts for filter badges
  const counts = useMemo(() => {
    return meals.reduce<Record<string, number>>((acc, meal) => {
      acc[meal.category] = (acc[meal.category] ?? 0) + 1;
      return acc;
    }, {});
  }, [meals]);

  // Filtered meals
  const filtered = useMemo(() =>
    category === "All" ? meals : meals.filter((m) => m.category === category),
    [meals, category]
  );

  return (
    <section
      id="menu"
      className="relative w-full min-h-screen py-24 overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* Gold radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

        {/* ── HEADER ── */}
        <header className="text-center mb-14">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            style={{ fontFamily: "'Tenor Sans', sans-serif" }}
            className="text-[0.6rem] text-[#D4AF37]/60 uppercase tracking-[0.5em] mb-4"
          >
            Culinary Experience
          </motion.p>

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
            className="text-4xl md:text-5xl uppercase mb-4"
          >
            Our Menu
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            className="text-white/45 italic text-base text-center mb-10"
          >
            Every dish crafted with passion, premium ingredients and authentic flavors.
          </motion.p>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <MenuFilter
              active={category}
              onChange={setCategory}
              counts={counts}
            />
          </motion.div>
        </header>

        {/* ── ERROR ── */}
        {error && (
          <div className="text-center py-20">
            <p style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-white/40 italic text-lg">{error}</p>
          </div>
        )}

        {/* ── LOADING SKELETONS ── */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <MealCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* ── MEAL GRID ── */}
        {!loading && !error && (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={category}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((meal, i) => (
                  <MealCard key={meal._id} meal={meal} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
                  className="text-white/30 italic text-xl"
                >
                  No dishes in this category yet.
                </p>
              </div>
            )}
          </>
        )}

        {/* ── BOTTOM ORNAMENT ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex items-center justify-center gap-3 mt-20"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/40" />
          <div className="w-1 h-1 rotate-45 bg-[#D4AF37]/40" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/40" />
        </motion.div>

      </div>
    </section>
  );
}