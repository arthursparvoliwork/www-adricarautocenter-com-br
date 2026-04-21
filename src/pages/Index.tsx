import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhyChoose } from "@/components/WhyChoose";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { Brands } from "@/components/Brands";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { FloatingDecorations } from "@/components/FloatingDecorations";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { QuickInfoPanel } from "@/components/QuickInfoPanel";
import { PlansComparison } from "@/components/PlansComparison";
import { GoogleReviews } from "@/components/GoogleReviews";
import { RaceMode } from "@/components/RaceMode";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      <SEO />
      <FloatingDecorations />
      <QuickInfoPanel />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <div className="divider-tread" />
          <Reveal><About /></Reveal>
          <Reveal><WhyChoose /></Reveal>
          <Services />
          <Reveal><PlansComparison /></Reveal>
          <Reveal><GoogleReviews /></Reveal>
          <Reveal><Gallery /></Reveal>
          <Reveal><BeforeAfterSection /></Reveal>
          <Reveal><Brands /></Reveal>
          <Reveal><Testimonials /></Reveal>
          <Reveal><FAQ /></Reveal>
          <Reveal><Contact /></Reveal>
        </main>
        <Footer />
        <WhatsAppFloat />
        <RaceMode />
      </div>
    </div>
  );
};

export default Index;
