// components/navbar/NavLogo.tsx

import Link from "next/link";
import { NAV_COLORS } from "./navbar.constants";

export default function NavLogo() {
  const { gold } = NAV_COLORS;

  return (
    <div className="flex-1 flex justify-center">
      <Link href="#home" className="flex flex-col items-center leading-tight no-underline group">
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
  );
}