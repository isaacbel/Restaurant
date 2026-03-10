// frontend/components/admin/AdminLayout.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import AdminSidebar from "./AdminSidebar";
import { authService, AdminUser } from "@/lib/auth";

interface Props {
  children: React.ReactNode;
  title:    string;
}

export default function AdminLayout({ children, title }: Props) {
  const router   = useRouter();
  const pathname = usePathname();
  const [user,        setUser]        = useState<AdminUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checking,    setChecking]    = useState(true);

  useEffect(() => {
    const check = async () => {
      const admin = await authService.verify();
      if (!admin) {
        router.replace("/admin/login");
      } else {
        setUser(admin);
      }
      setChecking(false);
    };
    check();
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0A0A" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
          <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(212,175,55,0.4)" }} className="uppercase">
            Verifying...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#0A0A0A" }}>

      {/* ── DESKTOP SIDEBAR ── */}
      <div className="hidden lg:flex flex-col" style={{ width: "256px", flexShrink: 0 }}>
        <div className="sticky top-0 h-screen">
          <AdminSidebar />
        </div>
      </div>

      {/* ── MOBILE SIDEBAR OVERLAY ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full">
            <AdminSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header
          className="flex items-center justify-between px-6 py-4 sticky top-0 z-40"
          style={{
            background:   "#0D0D0D",
            borderBottom: "1px solid rgba(212,175,55,0.1)",
          }}
        >
          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white/50 hover:text-[#D4AF37] transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu size={20} />
          </button>

          {/* Page title */}
          <h1
            className="hidden lg:block"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize:   "1.4rem",
              letterSpacing: "0.15em",
              color:      "#f5f0e8",
            }}
          >
            {title}
          </h1>

          {/* Admin name */}
          {user && (
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 flex items-center justify-center"
                style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.25)" }}
              >
                <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#D4AF37", fontSize: "0.9rem" }}>
                  {user.username[0].toUpperCase()}
                </span>
              </div>
              <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)" }} className="uppercase hidden sm:block">
                {user.username}
              </p>
            </div>
          )}
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}