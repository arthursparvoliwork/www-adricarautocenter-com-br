import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Clock, MessageCircle, ChevronDown } from "lucide-react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { SparkParticles } from "@/components/SparkParticles";
import { Magnetic } from "@/components/Magnetic";
import { Spotlight } from "@/components/Spotlight";
import { useIsTouch, useRichMotion } from "@/hooks/useMotionPrefs";
import { getShopStatus } from "@/lib/hours";
import { setLogoDocked } from "@/lib/logoDock";
import { DURATION, EASE_BRAND } from "@/lib/motion";

import heroCar from "@/assets/hero-car.jpg";
import engineHeroMeta from "@/assets/engine-hero-bg.mp4.asset.json";
import lockup from "@/assets/adricar-lockup-clean.png";

const DOCK_DISTANCE = 320; // px de rolagem até o logo encaixar na navbar
const WA = "https://wa.me/5511985370952?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20revis%C3%A3o%20na%20Adricar.";

type Rect = { left: number; top: number; width: number };

/** Logo grande que, ao rolar, encolhe e viaja até o slot do logo na navbar. */
const DockingLogo = ({ slot }: { slot: React.RefObject<HTMLDivElement> }) => {
  const { scrollY } = useScroll();
  const [from, setFrom] = useState<Rect | null>(null);
  const [to, setTo] = useState<Rect | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const s = slot.current?.getBoundingClientRect();
      const n = document.getElementById("nav-logo-slot")?.getBoundingClientRect();
      if (s) setFrom({ left: s.left, top: s.top + window.scrollY, width: s.width });
      if (n) setTo({ left: n.left, top: n.top, width: n.width });
    };
    measure();
    const t = setTimeout(measure, 600);
    window.addEventListener("resize", measure);
    return () => { clearTimeout(t); window.removeEventListener("resize", measure); };
  }, [slot]);

  useEffect(() => {
    setLogoDocked(window.scrollY >= DOCK_DISTANCE);
    return () => setLogoDocked(true);
  }, []);
  useMotionValueEvent(scrollY, "change", (v) => setLogoDocked(v >= DOCK_DISTANCE));

  const p = useTransform(scrollY, [0, DOCK_DISTANCE], [0, 1], { clamp: true });
  const x = useTransform(p, (t) => (from && to ? (to.left - from.left) * t : 0));
  const y = useTransform(p, (t) => (from && to ? (to.top - from.top) * t : 0));
  const scale = useTransform(p, (t) => (from && to ? 1 + (to.width / from.width - 1) * t : 1));
  const opacity = useTransform(p, (t) => (t >= 1 ? 0 : 1));

  if (!from) return null;
  return createPortal(
    <motion.img
      src={lockup}
      alt=""
      aria-hidden="true"
      initial={{ opacity: 0, filter: "blur(12px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: DURATION.hero, ease: EASE_BRAND }}
      className="logo-mark-glow pointer-events-none fixed z-[55] origin-top-left"
      style={{ left: from.left, top: from.top, width: from.width, x, y, scale, opacity }}
    />,
    document.body
  );
};

export const Hero = () => {
  const touch = useIsTouch();
  const rich = useRichMotion();
  const slot = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState(getShopStatus);
  useEffect(() => {
    const id = setInterval(() => setStatus(getShopStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Camadas em profundidade: vídeo (lento), partículas (médio), texto (rápido)
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 800], [0, 220]);
  const particlesY = useTransform(scrollY, [0, 800], [0, 110]);
  const contentY = useTransform(scrollY, [0, 800], [0, -60]);
  const fade = useTransform(scrollY, [0, 500], [1, 0.2]);

  const lines = ["SEU CARRO", "MERECE O"];

  return (
    <section id="inicio" className="relative min-h-[100svh] flex flex-col overflow-hidden pt-24">
      {/* Vídeo com parallax + ken burns. No celular: só o poster. */}
      <motion.div className="absolute inset-0" style={{ y: videoY }} aria-hidden="true">
        <div className="absolute inset-0 animate-ken-burns">
          {touch ? (
            <img src={heroCar} alt="" className="w-full h-full object-cover" {...{ fetchpriority: "high" }} />
          ) : (
            <video autoPlay muted loop playsInline preload="auto" poster={heroCar} className="w-full h-full object-cover">
              <source src={engineHeroMeta.url} type="video/mp4" />
            </video>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/70" />
      </motion.div>

      {rich && (
        <motion.div className="absolute inset-0" style={{ y: particlesY }}>
          <SparkParticles density={35} />
        </motion.div>
      )}

      <Spotlight />

      {/* Faixa de slogan — abaixo da navbar, nunca cortada */}
      <div className="relative z-10 border-y border-border/50 bg-background/40 backdrop-blur-sm">
        <div className="container-x py-2 flex justify-center gap-3 text-[11px] sm:text-xs font-bold uppercase tracking-[0.35em] text-secondary/90">
          <span>Performance</span><span className="text-primary">·</span><span>Precisão</span><span className="text-primary">·</span><span>Confiança</span>
        </div>
      </div>

      <motion.div className="container-x relative z-10 flex-1 flex flex-col justify-center py-10" style={{ y: contentY, opacity: fade }}>
        {/* Slot reservado para o logo que "voa" até a navbar */}
        <div ref={slot} className="mx-auto w-full max-w-[min(36rem,85vw)] aspect-[1200/487]" />
        <DockingLogo slot={slot} />

        <div className="mt-10 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-end">
          <div className="space-y-7">
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.92] tracking-tight" aria-label="Seu carro merece o melhor.">
              {lines.map((l, i) => (
                <span key={l} className="block overflow-hidden" aria-hidden="true">
                  <motion.span
                    className="block text-foreground"
                    initial={{ y: "105%", filter: "blur(8px)" }}
                    animate={{ y: "0%", filter: "blur(0px)" }}
                    transition={{ duration: DURATION.hero, ease: EASE_BRAND, delay: 0.15 + i * 0.12 }}
                  >
                    {l}
                  </motion.span>
                </span>
              ))}
              <span className="block overflow-hidden" aria-hidden="true">
                <motion.span
                  className="block text-fire-animated"
                  initial={{ y: "105%", filter: "blur(8px)" }}
                  animate={{ y: "0%", filter: "blur(0px)" }}
                  transition={{ duration: DURATION.hero, ease: EASE_BRAND, delay: 0.39 }}
                >
                  MELHOR.
                </motion.span>
              </span>
            </h1>

            <motion.p
              className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.enter, ease: EASE_BRAND, delay: 0.6 }}
            >
              Centro automotivo completo no Grajaú — São Paulo. Mecânica geral, injeção eletrônica,
              freios, suspensão, rodas e pneus para nacionais e importados.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.enter, ease: EASE_BRAND, delay: 0.75 }}
            >
              <Magnetic>
                <motion.a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.96 }}
                  className="cta-primary group"
                >
                  Agende sua revisão
                  <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1.5" />
                </motion.a>
              </Magnetic>
              <Magnetic>
                <motion.a href="#servicos" whileTap={{ scale: 0.96 }} className="cta-secondary">
                  <span className="relative z-10">Ver serviços</span>
                </motion.a>
              </Magnetic>
            </motion.div>
          </div>

          {/* Card informativo com status real */}
          <motion.div
            className="card-metal p-6 max-w-sm lg:ml-auto w-full"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: DURATION.enter, ease: EASE_BRAND, delay: 0.9 }}
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                {status.open && <span className="absolute inline-flex h-full w-full rounded-full bg-whatsapp opacity-60 animate-ping" />}
                <span className={`relative inline-flex h-3 w-3 rounded-full ${status.open ? "bg-whatsapp" : "bg-muted-foreground"}`} />
              </span>
              <span className="font-display text-xl">{status.label}</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4 text-secondary" />
              <span>Resposta em até <strong className="text-secondary">30 min</strong> no WhatsApp</span>
            </div>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center justify-center gap-2 rounded-md bg-whatsapp text-whatsapp-foreground py-3 font-bold uppercase tracking-wider transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5" /> Chamar no WhatsApp
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <a href="#servicos" aria-label="Rolar para os serviços" className="relative z-10 mx-auto mb-6 hidden md:flex flex-col items-center gap-1 text-secondary/80">
        <span className="text-[10px] uppercase tracking-[0.3em]">Role</span>
        <span className="w-6 h-10 rounded-full border border-secondary/60 flex justify-center pt-2">
          <span className="w-1 h-2 rounded-full bg-secondary animate-scroll-dot" />
        </span>
        <ChevronDown className="w-4 h-4" />
      </a>
    </section>
  );
};
