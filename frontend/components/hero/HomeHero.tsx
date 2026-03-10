// components/hero/HomeHero.tsx
"use client";

import useIsMobile  from "@/hooks/useIsMobile";
import DesktopHero  from "./DesktopHero";
import MobileHero   from "./MobileHero";

export default function HomeHero() {
  const isMobile = useIsMobile();

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return isMobile
    ? <MobileHero  onScrollToMenu={scrollToMenu} />
    : <DesktopHero onScrollToMenu={scrollToMenu} />;
}