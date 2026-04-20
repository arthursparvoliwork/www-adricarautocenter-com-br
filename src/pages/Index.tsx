import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhyChoose } from "@/components/WhyChoose";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { Brands } from "@/components/Brands";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { FloatingDecorations } from "@/components/FloatingDecorations";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      <FloatingDecorations />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <div className="divider-tread" />
          <About />
          <WhyChoose />
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

