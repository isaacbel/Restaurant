// app/menu/page.tsx

import Navbar       from "@/components/navbar";
import MenuSection  from "@/components/menu/MenuSection";

export const metadata = {
  title: "Menu — Happy Day Restaurant",
  description: "Explore our full menu — starters, seafood, main courses, desserts and drinks.",
};

export default function MenuPage() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen">
      <Navbar />
      {/* Padding top to clear fixed navbar */}
      <div className="pt-16">
        <MenuSection />
      </div>
    </main>
  );
}