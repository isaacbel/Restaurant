// components/navbar/MobileMenu.tsx

import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { NAV_LINKS, NAV_COLORS } from "./navbar.constants";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { gold, text, border } = NAV_COLORS;

  return (
    <div
      className="md:hidden overflow-hidden transition-all duration-500 ease-in-out"
      style={{
        maxHeight: open ? "500px" : "0px",
        background: "rgba(0,0,0,0.98)",
        borderTop: open ? `1px solid ${border}` : "none",
      }}
    >
      <div className="px-8 py-8 flex flex-col items-center gap-6">

        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className="mobile-link relative text-center w-full py-2"
            style={{ color: text, borderBottom: `1px solid ${border}`, letterSpacing: "0.35em" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = gold)}
            onMouseLeave={(e) => (e.currentTarget.style.color = text)}
          >
            {label}
          </Link>
        ))}

        <Link
          href="/admin/login"
          onClick={onClose}
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
  );
}