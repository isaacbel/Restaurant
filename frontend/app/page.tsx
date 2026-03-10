import Hero from "@/components/Hero";
import Gallery from "@/components/gallery";
import MenuPage from "./menu/page";
import AboutPage from "./about/page";
import ContactPage from "./contact/page"

export default function Home() {
  return (
    <>
      <Hero />
      <Gallery/>
      <MenuPage/>
      <AboutPage/>
      <ContactPage/>


    </>
  );
}
