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
import { ChapterMark } from "@/components/ChapterMark";
import { EngineBlueprint } from "@/components/EngineBlueprint";
import { AssemblyLine } from "@/components/AssemblyLine";
import { SpecSheet } from "@/components/SpecSheet";
import { BrandMarquee } from "@/components/BrandMarquee";
import { UrgencyCTA } from "@/components/UrgencyCTA";
import { Timeline30Years } from "@/components/Timeline30Years";
import { HexServiceStrip } from "@/components/HexServiceStrip";
import { PhoneCTABar } from "@/components/PhoneCTABar";
import { LeadMagnet } from "@/components/LeadMagnet";
import { ExitIntentOffer } from "@/components/ExitIntentOffer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-clip relative">
      <SEO />
      <FloatingDecorations />
      <QuickInfoPanel />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <div className="divider-tread" />

          <ChapterMark number="01" kicker="Capítulo" label="Sobre a Adricar" title="TRÊS DÉCADAS DE ASFALTO." />
          <Reveal><About /></Reveal>
          <Timeline30Years />

          <ChapterMark number="02" kicker="Capítulo" label="Diferenciais" title="POR QUE ADRICAR." />
          <Reveal><WhyChoose /></Reveal>

          <EngineBlueprint />
          <AssemblyLine />

          <ChapterMark number="03" kicker="Capítulo" label="Serviços" title="MECÂNICA COMPLETA." />
          <Services />
          <SpecSheet />
          <Reveal><PlansComparison /></Reveal>

          <ChapterMark number="04" kicker="Capítulo" label="Reputação" title="A VOZ DE QUEM ROLOU CONOSCO." />
          <Reveal><GoogleReviews /></Reveal>
          <Reveal><Gallery /></Reveal>
          <Reveal><BeforeAfterSection /></Reveal>

          <ChapterMark number="05" kicker="Capítulo" label="Parceria" title="MARCAS QUE CONFIAM." />
          <Reveal><Brands /></Reveal>
          <BrandMarquee />
          <Reveal><Testimonials /></Reveal>

          <UrgencyCTA />

          <ChapterMark number="06" kicker="Capítulo" label="Contato" title="TRAGA SEU CARRO." />
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
