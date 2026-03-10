
// app/contact/page.tsx
import Navbar from "@/components/navbar";
import ContactSection from "@/components/contact/ContactSection";

export const metadata = {
  title: "Contact — Happy Day Restaurant",
  description: "Find us at Tamentfoust, La Pérouse, Algiers. Call or message us to reserve your table.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen">
      <Navbar />
      <div className="pt-16">
        <ContactSection />
      </div>
    </main>
  );
}