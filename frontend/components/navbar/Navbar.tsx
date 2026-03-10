// components/navbar/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import NavLogo    from "./NavLogo";
import NavLinks   from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { NAV_COLORS } from "./navbar.constants";

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { bg, border, text }  = NAV_COLORS;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Tenor+Sans&display=swap');

        .nav-link {
          position: relative;
          font-family: 'Tenor Sans', sans-serif;
          font-size: 0.9rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 500;
          transition: color 0.2s;
          text-decoration: none;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: #D4AF37;
          transition: width 0.25s ease;
        }
        .nav-link:hover { color: #D4AF37 !important; }
        .nav-link:hover::after { width: 100%; }

        .mobile-link {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          text-decoration: none;
        }
      `}</style>

      <nav
        className="fixed w-full z-50 transition-all duration-300"
        style={{
          background: bg,
          borderBottom: `1px solid ${border}`,
          backdropFilter: "blur(14px)",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.6)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16 gap-6">

            <NavLinks side="left" />
            <NavLogo />
            <NavLinks side="right" />

            {/* Mobile hamburger */}
            <button
              className="md:hidden absolute right-4"
              style={{ color: text }}
              onClick={() => setOpen(!open)}
            >
              {open ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>

          </div>
        </div>

        <MobileMenu open={open} onClose={() => setOpen(false)} />
      </nav>
    </>
  );
}