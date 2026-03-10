// components/navbar/NavLinks.tsx

import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { NAV_COLORS } from "./navbar.constants";

interface NavLinksProps {
  side: "left" | "right";
}

const LEFT_LINKS  = [
  { label: "Home",    href: "/"        },
  { label: "Menu",    href: "/menu"    },
  { label: "Gallery", href: "#gallery" },
];

const RIGHT_LINKS = [
  { label: "About",   href: "#about"   },
  { label: "Contact", href: "#contact" },
];

export default function NavLinks({ side }: NavLinksProps) {
  const { text, border } = NAV_COLORS;
  const links = side === "left" ? LEFT_LINKS : RIGHT_LINKS;

  return (
    <div className={`hidden md:flex items-center gap-8 flex-1 ${side === "left" ? "justify-end" : "justify-start"}`}>

      {links.map(({ label, href }) => (
        <Link key={href} href={href} className="nav-link" style={{ color: text }}>
          {label}
        </Link>
      ))}

      {/* Admin icon — only on right side */}
      {side === "right" && (
        <Link
          href="/admin/login"
          className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-[#D4AF37]/10"
          style={{ border: `1px solid ${border}`, color: text }}
          title="Admin Login"
        >
          <FiUser size={16} />
        </Link>
      )}
    </div>
  );
}