import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { Brands } from "@/components/Brands";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { LogoWatermark } from "@/components/LogoWatermark";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      {/* Floating brand watermarks scattered across the page */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <LogoWatermark className="top-[110vh] -left-10 animate-float-slow" size={180} rotate={-15} opacity={0.06} />
        <LogoWatermark className="top-[210vh] right-[-40px]" size={220} rotate={20} opacity={0.05} />
        <LogoWatermark className="top-[320vh] left-1/3 animate-float-slow" size={150} rotate={-8} opacity={0.07} />
        <LogoWatermark className="top-[430vh] right-10" size={200} rotate={12} opacity={0.05} />
        <LogoWatermark className="top-[540vh] left-5 animate-float-slow" size={170} rotate={-20} opacity={0.06} />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Gallery />
          <Brands />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </div>
  );
};

export default Index;
