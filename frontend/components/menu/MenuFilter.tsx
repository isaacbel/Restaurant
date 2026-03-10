// components/menu/MenuFilter.tsx
"use client";

import { MEAL_CATEGORIES, MealCategory } from "./menu.types";

interface MenuFilterProps {
  active: MealCategory;
  onChange: (cat: MealCategory) => void;
  counts: Record<string, number>;
}

export default function MenuFilter({ active, onChange, counts }: MenuFilterProps) {
  return (
    <div className="flex items-center justify-center flex-wrap gap-2">
      {MEAL_CATEGORIES.map((cat) => {
        const isActive = cat === active;
        const count = cat === "All"
          ? Object.values(counts).reduce((a, b) => a + b, 0)
          : (counts[cat] ?? 0);

        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className="relative flex items-center gap-2 transition-all duration-300 uppercase"
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.28em",
              padding: "0.5rem 1.3rem",
              background:  isActive ? "linear-gradient(135deg, #D4AF37, #f0cc5a)" : "transparent",
              color:       isActive ? "#000" : "rgba(255,255,255,0.45)",
              border:      isActive ? "1px solid transparent" : "1px solid rgba(212,175,55,0.2)",
            }}
          >
            {cat}
            {/* Count bubble */}
            <span
              className="flex items-center justify-center w-4 h-4 rounded-full text-[0.5rem]"
              style={{
                background: isActive ? "rgba(0,0,0,0.2)" : "rgba(212,175,55,0.1)",
                color:      isActive ? "#000" : "rgba(212,175,55,0.6)",
              }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}