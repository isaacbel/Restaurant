// components/menu/MealCardSkeleton.tsx

export default function MealCardSkeleton() {
  return (
    <div
      className="flex flex-col overflow-hidden animate-pulse"
      style={{ background: "#111", border: "1px solid rgba(212,175,55,0.08)" }}
    >
      {/* Image placeholder */}
      <div className="w-full bg-white/5" style={{ height: "220px" }} />

      <div className="p-5 flex flex-col gap-3">
        {/* Category */}
        <div className="h-2 w-16 rounded-sm bg-white/5" />
        {/* Name */}
        <div className="h-5 w-3/4 rounded-sm bg-white/5" />
        {/* Description lines */}
        <div className="h-3 w-full rounded-sm bg-white/5" />
        <div className="h-3 w-5/6 rounded-sm bg-white/5" />
        <div className="h-3 w-4/6 rounded-sm bg-white/5" />
        {/* Price */}
        <div className="h-6 w-24 rounded-sm bg-white/5 mt-2" />
      </div>
    </div>
  );
}