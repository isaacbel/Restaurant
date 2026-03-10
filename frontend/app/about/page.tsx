
// app/about/page.tsx
import Navbar from "@/components/navbar";
import AboutSection from "@/components/about/AboutSection";

export const metadata = {
  title: "About — Happy Day Restaurant",
  description: "Learn the story of Happy Day Restaurant — fine dining by the sea in Tamentfoust, Algiers since 2010.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen">
      <Navbar />
      <div className="pt-16">
        <AboutSection />
      </div>
    </main>
  );
}