import { lazy, Suspense, type ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { SEO } from "@/components/SEO";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { MobileActionBar } from "@/components/MobileActionBar";
import { QuickInfoPanel } from "@/components/QuickInfoPanel";
import { Reveal } from "@/components/motion";
import { useIsTouch } from "@/hooks/useMotionPrefs";

// Seções abaixo da dobra: carregadas sob demanda.
const named = <K extends string>(loader: () => Promise<Record<K, React.ComponentType<any>>>, key: K) =>
  lazy(() => loader().then((m) => ({ default: m[key] })));

const Services = named(() => import("@/components/Services"), "Services");
const PromoBanner = named(() => import("@/components/PromoBanner"), "PromoBanner");
const WhyChoose = named(() => import("@/components/WhyChoose"), "WhyChoose");
const Timeline30Years = named(() => import("@/components/Timeline30Years"), "Timeline30Years");
const BeforeAfterSection = named(() => import("@/components/BeforeAfterSection"), "BeforeAfterSection");
const Gallery = named(() => import("@/components/Gallery"), "Gallery");
const GoogleReviews = named(() => import("@/components/GoogleReviews"), "GoogleReviews");
const BrandMarquee = named(() => import("@/components/BrandMarquee"), "BrandMarquee");
const PartnerProgram = named(() => import("@/components/PartnerProgram"), "PartnerProgram");
const FAQ = named(() => import("@/components/FAQ"), "FAQ");
const ContactSection = named(() => import("@/components/ContactSection"), "ContactSection");
const Footer = named(() => import("@/components/Footer"), "Footer");
const ExitIntentOffer = named(() => import("@/components/ExitIntentOffer"), "ExitIntentOffer");

const Lazy = ({ children, h = "60vh" }: { children: ReactNode; h?: string }) => (
  <Suspense fallback={<div style={{ minHeight: h }} aria-hidden="true" />}>{children}</Suspense>
);

/*
 * Fora da home nesta rodada (componentes continuam no disco):
 * EngineBlueprint, AssemblyLine, SpecSheet, HexServiceStrip, PhoneCTABar, LeadMagnet,
 * Testimonials, Brands, InstagramFeed, UrgencyCTA, RaceMode, PlansComparison, ChapterMark,
 * About, LocalPresence/Contact (fundidos em ContactSection), WheelsTires/Electromechanical/
 * ScannerDiagnostics (viraram cards em Services), FloatingDecorations.
 */
const Index = () => {
  const touch = useIsTouch();
  return (
    <div className="min-h-screen bg-background overflow-x-clip relative pb-16 md:pb-0">
      <SEO />
      <QuickInfoPanel />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <TrustStrip />
          <Lazy><Services /></Lazy>
          <Lazy h="40vh"><PromoBanner /></Lazy>
          <div id="sobre">
            <Lazy><Reveal><WhyChoose /></Reveal></Lazy>
            <Lazy h="40vh"><Timeline30Years compact /></Lazy>
          </div>
          <Lazy><Reveal><BeforeAfterSection /></Reveal></Lazy>
          <Lazy><Reveal><Gallery /></Reveal></Lazy>
          <Lazy><Reveal><GoogleReviews /></Reveal></Lazy>
          <div id="marcas">
            <Lazy h="20vh"><BrandMarquee /></Lazy>
            <Lazy><Reveal><PartnerProgram /></Reveal></Lazy>
          </div>
          <Lazy><Reveal><FAQ /></Reveal></Lazy>
          <Lazy><ContactSection /></Lazy>
        </main>
        <Lazy h="20vh"><Footer /></Lazy>
        <WhatsAppFloat />
        <MobileActionBar />
        {!touch && <Lazy h="0"><ExitIntentOffer /></Lazy>}
      </div>
    </div>
  );
};

export default Index;
