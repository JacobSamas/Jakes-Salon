import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServiceHighlights from "@/components/ServiceHighlights";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactCTASection from "@/components/ContactCTASection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServiceHighlights />
      <TestimonialsSection />
      <ContactCTASection />
    </div>
  );
}
