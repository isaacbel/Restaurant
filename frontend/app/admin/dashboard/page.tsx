// frontend/app/admin/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiList, FiEye, FiEyeOff, FiTag, FiImage, FiArrowRight, FiTrendingUp } from "react-icons/fi";
import AdminLayout from "@/components/admin/AdminLayout";
import api from "@/lib/api";

interface Stats {
  total:      number;
  visible:    number;
  hidden:     number;
  promotions: number;
  byCategory: { _id: string; count: number }[];
}

export default function DashboardPage() {
  const [stats,   setStats]   = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/meals/stats")
      .then(r => setStats(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cards = stats ? [
    { label: "Total Meals",  value: stats.total,      icon: <FiList size={14} />,   accent: "#D4AF37", dim: "rgba(212,175,55,0.07)"  },
    { label: "Visible",      value: stats.visible,    icon: <FiEye size={14} />,    accent: "#7dd87d", dim: "rgba(125,216,125,0.07)" },
    { label: "Hidden",       value: stats.hidden,     icon: <FiEyeOff size={14} />, accent: "#e87070", dim: "rgba(232,112,112,0.07)" },
    { label: "Promotions",   value: stats.promotions, icon: <FiTag size={14} />,    accent: "#e8c84a", dim: "rgba(232,200,74,0.07)"  },
  ] : [];

  return (
    <AdminLayout title="Dashboard">
      <style>{`
        @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        .skeleton { background: linear-gradient(90deg, #111 25%, #181818 50%, #111 75%); background-size: 400px 100%; animation: shimmer 1.4s infinite; }
        .stat-card { transition: border-color 0.3s, transform 0.25s; }
        .stat-card:hover { border-color: rgba(212,175,55,0.22) !important; transform: translateY(-2px); }
        .nav-card { transition: border-color 0.3s, background 0.3s; }
        .nav-card:hover { border-color: rgba(212,175,55,0.28) !important; background: rgba(212,175,55,0.025) !important; }
        .nav-card:hover .nav-arrow { transform: translateX(5px); color: #D4AF37 !important; }
        .nav-arrow { transition: transform 0.25s, color 0.25s; }
      `}</style>

      {/* ── HEADER ── */}
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="flex items-end gap-5 pb-7"
          style={{ borderBottom: "1px solid rgba(212,175,55,0.07)" }}
        >
          <div>
            <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.46rem", letterSpacing: "0.55em", color: "rgba(212,175,55,0.38)", textTransform: "uppercase", marginBottom: "7px" }}>
              Overview
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "2.6rem", letterSpacing: "0.06em", color: "#f0ece4", lineHeight: 1 }}>
              Dashboard
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 mb-2 ml-auto">
            <FiTrendingUp size={13} style={{ color: "rgba(212,175,55,0.3)" }} />
            <div className="h-px w-12" style={{ background: "rgba(212,175,55,0.12)" }} />
            <div className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: "rgba(212,175,55,0.2)" }} />
          </div>
        </motion.div>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-14">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-32 rounded-none" style={{ border: "1px solid rgba(255,255,255,0.03)" }} />
            ))
          : cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="stat-card p-5 relative overflow-hidden"
                style={{ background: card.dim, border: "1px solid rgba(255,255,255,0.04)" }}
              >
                {/* Icon + line */}
                <div className="flex items-center gap-2 mb-6">
                  <span style={{ color: card.accent, opacity: 0.65 }}>{card.icon}</span>
                  <div className="flex-1 h-px" style={{ background: `${card.accent}20` }} />
                </div>
                {/* Big number */}
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "3rem", lineHeight: 1, letterSpacing: "-0.02em", color: card.accent }}>
                  {card.value}
                </p>
                {/* Label */}
                <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.44rem", letterSpacing: "0.35em", color: "rgba(255,255,255,0.24)", textTransform: "uppercase", marginTop: "7px" }}>
                  {card.label}
                </p>
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-6 h-6" style={{ borderBottom: `1px solid ${card.accent}18`, borderLeft: `1px solid ${card.accent}18` }} />
                <div className="absolute bottom-0 left-0 w-6 h-6" style={{ borderTop: `1px solid ${card.accent}10`, borderRight: `1px solid ${card.accent}10` }} />
              </motion.div>
            ))
        }
      </div>

      {/* ── TWO COLUMN ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* Category bars — 3 cols */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-7">
            <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.46rem", letterSpacing: "0.45em", color: "rgba(212,175,55,0.4)", textTransform: "uppercase", flexShrink: 0 }}>
              By Category
            </p>
            <div className="flex-1 h-px" style={{ background: "rgba(212,175,55,0.07)" }} />
          </div>

          {!loading && (!stats || stats.byCategory.length === 0) && (
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "rgba(255,255,255,0.18)", fontStyle: "italic", fontSize: "1rem" }}>
              No data yet — add your first meal.
            </p>
          )}

          <div className="flex flex-col gap-5">
            {stats?.byCategory.map((cat, i) => {
              const pct = stats.total > 0 ? Math.round((cat.count / stats.total) * 100) : 0;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.5rem", letterSpacing: "0.22em", color: "rgba(255,255,255,0.38)", textTransform: "uppercase" }}>
                      {cat._id}
                    </p>
                    <div className="flex items-baseline gap-1.5">
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#D4AF37", lineHeight: 1 }}>{cat.count}</span>
                      <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.4rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>{pct}%</span>
                    </div>
                  </div>
                  <div className="h-0.5 w-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <motion.div
                      className="h-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.45 + i * 0.08, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                      style={{ background: "linear-gradient(90deg, #C9A227, #f0cc5a)" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick access — 2 cols */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-7">
            <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.46rem", letterSpacing: "0.45em", color: "rgba(212,175,55,0.4)", textTransform: "uppercase", flexShrink: 0 }}>
              Quick Access
            </p>
            <div className="flex-1 h-px" style={{ background: "rgba(212,175,55,0.07)" }} />
          </div>

          <div className="flex flex-col gap-3">
            {[
              { label: "Meals",   sub: "Add, edit, manage menu",         href: "/admin/meals",   icon: <FiList size={15} /> },
              { label: "Gallery", sub: "Upload photos & videos",         href: "/admin/gallery", icon: <FiImage size={15} /> },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="nav-card flex items-center gap-4 p-5"
                style={{ background: "#0E0E0E", border: "1px solid rgba(255,255,255,0.05)", textDecoration: "none" }}
              >
                <div className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                  style={{ border: "1px solid rgba(212,175,55,0.14)", color: "rgba(212,175,55,0.5)" }}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.56rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: "3px" }}>
                    {item.label}
                  </p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "0.8rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.02em" }}>
                    {item.sub}
                  </p>
                </div>
                <FiArrowRight size={13} className="nav-arrow flex-shrink-0" style={{ color: "rgba(255,255,255,0.18)" }} />
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </AdminLayout>
  );
}