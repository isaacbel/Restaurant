// frontend/components/admin/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { FiGrid, FiList, FiImage, FiLogOut, FiX, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";
import { authService } from "@/lib/auth";

const NAV = [
  {
    label: "Dashboard",
    href:  "/admin/dashboard",
    icon:  FiGrid,
    desc:  "Overview & stats",
  },
  {
    label: "Meals",
    href:  "/admin/meals",
    icon:  FiList,
    desc:  "Menu management",
  },
  {
    label: "Gallery",
    href:  "/admin/gallery",
    icon:  FiImage,
    desc:  "Photos & videos",
  },
];

interface Props {
  onClose?: () => void;
}

export default function AdminSidebar({ onClose }: Props) {
  const pathname = usePathname();

  return (
    <aside
      className="flex flex-col h-full w-64 relative overflow-hidden"
      style={{ background: "#090909", borderRight: "1px solid rgba(212,175,55,0.08)" }}
    >
      <style>{`
        @keyframes goldPulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.7; }
        }
        .nav-link { transition: all 0.22s ease; }
        .nav-link:hover .nav-desc { color: rgba(212,175,55,0.45) !important; }
        .nav-link:hover .nav-icon-wrap { border-color: rgba(212,175,55,0.3) !important; }
        .logout-btn:hover { color: rgba(232,112,112,0.8) !important; background: rgba(232,112,112,0.05) !important; }
        .view-site:hover { color: rgba(212,175,55,0.6) !important; border-color: rgba(212,175,55,0.18) !important; }
      `}</style>

      {/* ── Vertical hairlines decoration ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[20, 50, 80].map((pct, i) => (
          <div key={i} className="absolute top-0 bottom-0"
            style={{ left: `${pct}%`, width: "1px", background: `linear-gradient(to bottom, transparent, rgba(212,175,55,${0.025 - i * 0.006}) 30%, rgba(212,175,55,${0.025 - i * 0.006}) 70%, transparent)` }} />
        ))}
        {/* Bottom glow */}
        <div className="absolute bottom-0 left-0 right-0 h-48"
          style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.04) 0%, transparent 70%)" }} />
      </div>

      {/* ── BRAND HEADER ── */}
      <div className="relative px-6 pt-7 pb-6" style={{ borderBottom: "1px solid rgba(212,175,55,0.07)" }}>
        {/* Mobile close */}
        {onClose && (
          <button onClick={onClose}
            className="absolute top-5 right-5 w-7 h-7 flex items-center justify-center lg:hidden transition-colors hover:text-white"
            style={{ color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <FiX size={12} />
          </button>
        )}

        {/* Logo + name */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 flex items-center justify-center"
              style={{ border: "1px solid rgba(212,175,55,0.2)", background: "rgba(212,175,55,0.04)" }}>
              <Image src="/2.png" alt="Happy Day" width={22} height={22} className="object-contain" />
            </div>
            {/* Live dot */}
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
              style={{ background: "#7dd87d", animation: "goldPulse 2.5s ease-in-out infinite", boxShadow: "0 0 6px rgba(125,216,125,0.6)" }} />
          </div>
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "1.05rem", letterSpacing: "0.14em", color: "#D4AF37", lineHeight: 1 }}>
              Happy Day
            </p>
            <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.38rem", letterSpacing: "0.42em", color: "rgba(212,175,55,0.32)", textTransform: "uppercase", marginTop: "3px" }}>
              Restaurant
            </p>
          </div>
        </div>

        {/* Admin badge */}
        <div className="flex items-center gap-2 px-3 py-2"
          style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.1)" }}>
          <div className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: "#D4AF37", opacity: 0.6 }} />
          <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.4rem", letterSpacing: "0.42em", color: "rgba(212,175,55,0.5)", textTransform: "uppercase" }}>
            Admin Panel
          </p>
        </div>
      </div>

      {/* ── NAV LINKS ── */}
      <nav className="flex-1 px-4 py-5 flex flex-col gap-1 relative z-10">

        {/* Section label */}
        <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.37rem", letterSpacing: "0.5em", color: "rgba(255,255,255,0.15)", textTransform: "uppercase", paddingLeft: "12px", marginBottom: "8px" }}>
          Navigation
        </p>

        {NAV.map((item, i) => {
          const active  = pathname === item.href;
          const Icon    = item.icon;

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <Link
                href={item.href}
                onClick={onClose}
                className="nav-link flex items-center gap-3.5 px-3 py-3 relative"
                style={{
                  textDecoration: "none",
                  background: active ? "rgba(212,175,55,0.07)" : "transparent",
                  borderLeft: `2px solid ${active ? "#D4AF37" : "transparent"}`,
                }}
              >
                {/* Icon box */}
                <div
                  className="nav-icon-wrap w-7 h-7 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{
                    border: `1px solid ${active ? "rgba(212,175,55,0.35)" : "rgba(255,255,255,0.07)"}`,
                    background: active ? "rgba(212,175,55,0.1)" : "transparent",
                    color: active ? "#D4AF37" : "rgba(255,255,255,0.3)",
                  }}
                >
                  <Icon size={12} />
                </div>

                {/* Text */}
                <div className="flex flex-col min-w-0">
                  <span style={{
                    fontFamily: "'Tenor Sans', sans-serif",
                    fontSize: "0.58rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: active ? "#D4AF37" : "rgba(255,255,255,0.45)",
                    lineHeight: 1,
                    transition: "color 0.2s",
                  }}>
                    {item.label}
                  </span>
                  <span className="nav-desc" style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: "0.65rem",
                    color: active ? "rgba(212,175,55,0.45)" : "rgba(255,255,255,0.18)",
                    marginTop: "2px",
                    transition: "color 0.2s",
                    letterSpacing: "0.02em",
                  }}>
                    {item.desc}
                  </span>
                </div>

                {/* Active right indicator */}
                {active && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-6"
                    style={{ background: "linear-gradient(to bottom, transparent, #D4AF37, transparent)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* ── FOOTER ── */}
      <div className="relative z-10 px-4 pb-5 flex flex-col gap-2" style={{ borderTop: "1px solid rgba(212,175,55,0.06)" }}>

        {/* View site link */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="view-site flex items-center gap-2.5 px-3 py-2.5 mt-3 transition-all duration-200"
          style={{ border: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.22)", textDecoration: "none" }}
        >
          <FiExternalLink size={11} />
          <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.48rem", letterSpacing: "0.28em", textTransform: "uppercase" }}>
            View Website
          </span>
        </a>

        {/* Logout */}
        <button
          onClick={() => authService.logout()}
          className="logout-btn flex items-center gap-2.5 px-3 py-2.5 w-full transition-all duration-200"
          style={{ color: "rgba(255,255,255,0.22)", background: "transparent", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <FiLogOut size={11} />
          <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.48rem", letterSpacing: "0.28em", textTransform: "uppercase" }}>
            Sign Out
          </span>
        </button>

        {/* Bottom ornament */}
        <div className="flex items-center gap-2 px-2 pt-2">
          <div className="flex-1 h-px" style={{ background: "rgba(212,175,55,0.08)" }} />
          <div className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: "rgba(212,175,55,0.15)" }} />
          <div className="flex-1 h-px" style={{ background: "rgba(212,175,55,0.08)" }} />
        </div>
      </div>

    </aside>
  );
}