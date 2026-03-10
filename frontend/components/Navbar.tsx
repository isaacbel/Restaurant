"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiUser } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const gold = "#D4AF37";
  const bg = "rgba(0,0,0,0.95)";
  const border = "rgba(212,175,55,0.2)";
  const text = "#f5f5f5";

  const isOnMenuPage = pathname === "/menu";
  const menuHref = isOnMenuPage ? "/" : "/menu";

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
          background: ${gold};
          transition: width 0.25s ease;
        }

        .nav-link:hover { color: ${gold} !important; }
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

            {/* LEFT LINKS */}
            <div className="hidden md:flex items-center gap-8 flex-1 justify-end">
              <Link href="/"          className="nav-link" style={{ color: text }}>Home</Link>
              <Link href={menuHref}   className="nav-link" style={{ color: text }}>Menu</Link>
              <Link href="#gallery"   className="nav-link" style={{ color: text }}>Gallery</Link>
            </div>

            {/* CENTER — text logo aligned with hero logo */}
            <div className="flex-1 flex justify-center">
              <Link href="/" className="flex flex-col items-center leading-tight no-underline group">
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    letterSpacing: "0.3em",
                    color: gold,
                    fontSize: "1.25rem",
                    lineHeight: 1,
                    transition: "opacity 0.2s",
                  }}
                  className="uppercase group-hover:opacity-80"
                >
                  Happy Day
                </span>
                <span
                  style={{
                    fontFamily: "'Tenor Sans', sans-serif",
                    fontSize: "0.45rem",
                    letterSpacing: "0.5em",
                    color: "rgba(212,175,55,0.55)",
                    lineHeight: 1,
                    marginTop: "4px",
                  }}
                  className="uppercase"
                >
                  Restaurant
                </span>
              </Link>
            </div>

            {/* RIGHT LINKS */}
            <div className="hidden md:flex items-center gap-8 flex-1 justify-start">
              <Link href="#about"   className="nav-link" style={{ color: text }}>About</Link>
              <Link href="#contact" className="nav-link" style={{ color: text }}>Contact</Link>

              <Link
                href="/admin/login"
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-[#D4AF37]/10"
                style={{ border: `1px solid ${border}`, color: text }}
                title="Admin Login"
              >
                <FiUser size={16} />
              </Link>
            </div>

            {/* MOBILE BUTTON */}
            <button
              className="md:hidden absolute right-4"
              style={{ color: text }}
              onClick={() => setOpen(!open)}
            >
              {open ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>

          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className="md:hidden overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            maxHeight: open ? "500px" : "0px",
            background: "rgba(0,0,0,0.98)",
            borderTop: open ? `1px solid ${border}` : "none",
          }}
        >
          <div className="px-8 py-8 flex flex-col items-center gap-6">
            {[
              { label: "Home",    href: "/"        },
              { label: "Menu",    href: menuHref   },
              { label: "Gallery", href: "#gallery" },
              { label: "About",   href: "#about"   },
              { label: "Contact", href: "#contact" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="mobile-link relative text-center w-full py-2"
                style={{
                  color: text,
                  borderBottom: `1px solid ${border}`,
                  letterSpacing: "0.35em",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = gold)}
                onMouseLeave={(e) => (e.currentTarget.style.color = text)}
              >
                {label}
              </Link>
            ))}

            <Link
              href="/admin/login"
              onClick={() => setOpen(false)}
              className="mt-4 flex items-center justify-center gap-3 px-6 py-3 rounded-full transition-all duration-300"
              style={{
                background: "linear-gradient(135deg,#000000,#1a1a1a)",
                border: `1px solid ${gold}`,
                color: gold,
                letterSpacing: "0.25em",
                fontSize: "0.75rem",
              }}
            >
              <FiUser size={14} />
              ADMIN ACCESS
            </Link>
          </div>
        </div>

      </nav>
    </>
  );
}