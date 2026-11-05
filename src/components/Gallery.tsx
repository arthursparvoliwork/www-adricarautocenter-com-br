import { useRef, useState, useLayoutEffect } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ZoomIn } from "lucide-react";
import oficina from "@/assets/oficina-motor.jpg";
import escapamentos from "@/assets/escapamentos.jpg";
import mecanico from "@/assets/mecanico-trabalho.jpg";
import roda from "@/assets/roda-pneu.jpg";
import freios from "@/assets/freios.jpg";
import diagnostico from "@/assets/diagnostico.jpg";
import { Lightbox } from "@/components/Lightbox";
import { SectionHeading } from "@/components/SectionHeading";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useRichMotion } from "@/hooks/useMotionPrefs";
import { DURATION, EASE_BRAND } from "@/lib/motion";

const items = [
  { src: mecanico, label: "Mão de obra especializada", category: "Mecânica" },
  { src: oficina, label: "Diagnóstico de motor", category: "Injeção" },
  { src: roda, label: "Rodas e pneus premium", category: "Pneus" },
  { src: escapamentos, label: "Estoque de escapamentos", category: "Escape" },
  { src: freios, label: "Sistema de freios", category: "Freios" },
  { src: diagnostico, label: "Scanner automotivo", category: "Diagnóstico" },
];
const PREFIX = "gallery";

type Item = (typeof items)[number];

const Tile = ({ it, i, open, onOpen, className = "" }: { it: Item; i: number; open: boolean; onOpen: () => void; className?: string }) => (
  <motion.button
    onClick={onOpen}
    aria-label={`Ampliar foto: ${it.label}`}
    className={`group relative card-metal card-metal-hover overflow-hidden text-left block w-full ${className}`}
    initial={{ clipPath: "inset(0 0 100% 0)" }}
    whileInView={{ clipPath: "inset(0 0 0% 0)" }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: DURATION.hero, ease: EASE_BRAND }}
  >
    {!open && (
      <motion.img
        layoutId={`${PREFIX}-${i}`}
        src={it.src}
        alt={it.label}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <ZoomIn className="w-4 h-4 text-secondary" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-5">
      <div className="text-[10px] uppercase tracking-[0.3em] text-secondary font-bold mb-1">{it.category}</div>
      <div className="font-display text-xl lg:text-2xl text-foreground">{it.label}</div>
    </div>
  </motion.button>
);

/** Item da trilha horizontal: cada um desliza em velocidade levemente diferente. */
const TrackItem = ({ progress, i, children }: { progress: MotionValue<number>; i: number; children: React.ReactNode }) => {
  const y = useTransform(progress, [0, 1], i % 2 ? [50, -50] : [-30, 30]);
  return <motion.div style={{ y }} className="shrink-0 w-[34vw] max-w-[520px] aspect-[4/5]">{children}</motion.div>;
};

export const Gallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const rich = useRichMotion();
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);

  useLayoutEffect(() => {
    const m = () => track.current && setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 64));
    m();
    window.addEventListener("resize", m);
    return () => window.removeEventListener("resize", m);
  }, [rich]);

  const heading = <SectionHeading align="left" kicker="Nossa oficina" title="Trabalho de *verdade.* | Resultado garantido." sub="Clique em qualquer foto para ampliar." />;

  return (
    <section ref={ref} id="galeria" className={rich ? "relative h-[300vh]" : "relative py-24"}>
      {rich ? (
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="container-x">{heading}</div>
          <motion.div ref={track} style={{ x }} className="flex gap-8 pl-[max(1rem,calc((100vw-80rem)/2+2rem))]">
            {items.map((it, i) => (
              <TrackItem key={it.label} progress={scrollYProgress} i={i}>
                <Tile it={it} i={i} open={lightbox === i} onOpen={() => setLightbox(i)} className="h-full" />
              </TrackItem>
            ))}
          </motion.div>
          <div className="container-x mt-10">
            <div className="h-[3px] bg-border/60 overflow-hidden">
              <motion.div className="h-full origin-left bg-gradient-to-r from-primary to-secondary" style={{ scaleX: scrollYProgress }} />
            </div>
          </div>
        </div>
      ) : (
        <div className="container-x">
          {heading}
          <Carousel opts={{ align: "start", dragFree: false }}>
            <CarouselContent>
              {items.map((it, i) => (
                <CarouselItem key={it.label} className="basis-[82%] sm:basis-1/2">
                  <Tile it={it} i={i} open={lightbox === i} onOpen={() => setLightbox(i)} className="aspect-[4/5]" />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}

      <Lightbox images={items} index={lightbox} onClose={() => setLightbox(null)} onIndexChange={setLightbox} layoutPrefix={PREFIX} />
    </section>
  );
};
