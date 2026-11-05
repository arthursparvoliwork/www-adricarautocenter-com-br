import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { DURATION, EASE_BRAND } from "@/lib/motion";
import { Flag, Wrench, Award, Users, Rocket, Trophy } from "lucide-react";

const MILESTONES = [
  { year: "1996", icon: Flag, title: "PARTIDA", desc: "Adricar abre as portas no Grajaú. Uma bancada, muitas ferramentas e a promessa de fazer certo." },
  { year: "2004", icon: Wrench, title: "EXPANSÃO DA OFICINA", desc: "Chegam os equipamentos de alinhamento computadorizado e balanceamento eletrônico." },
  { year: "2010", icon: Award, title: "CERTIFICAÇÃO SENAI", desc: "Toda a equipe passa por formação técnica contínua. Padrão de fábrica em cada serviço." },
  { year: "2016", icon: Users, title: "1.000+ CLIENTES", desc: "Fidelizamos gerações de motoristas. Muitos carros voltam há mais de uma década." },
  { year: "2022", icon: Rocket, title: "INJEÇÃO ELETRÔNICA AVANÇADA", desc: "Scanners multimarca, reprogramação de módulos e diagnóstico digital em tempo real." },
  { year: "2026", icon: Trophy, title: "30 ANOS DE ESTRADA", desc: "Três décadas cuidando do carro de quem confia. E ainda estamos só na primeira marcha." },
];

/** Trilho com linha SVG que se desenha conforme o scroll e nó pulsante no marco atual. */
const TimelineRail = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 50%"] });
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  const [current, setCurrent] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) =>
    setCurrent(Math.min(MILESTONES.length - 1, Math.floor(p * MILESTONES.length)))
  );

  return (
    <div ref={ref} className="relative max-w-4xl mx-auto">
      <svg className="absolute left-4 sm:left-1/2 top-0 h-full w-[6px] -translate-x-1/2 overflow-visible" preserveAspectRatio="none" viewBox="0 0 6 100" aria-hidden="true">
        <line x1="3" y1="0" x2="3" y2="100" stroke="hsl(var(--border))" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <defs>
          <linearGradient id="tl-fire" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="hsl(var(--primary))" />
            <stop offset="1" stopColor="hsl(var(--secondary))" />
          </linearGradient>
        </defs>
        <motion.line x1="3" y1="0" x2="3" y2="100" stroke="url(#tl-fire)" strokeWidth="3" vectorEffect="non-scaling-stroke" style={{ pathLength: draw }} />
      </svg>

      <div className="space-y-16">
        {MILESTONES.map((m, i) => {
          const isRight = i % 2 === 1;
          const isCurrent = i === current;
          return (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: DURATION.enter, ease: EASE_BRAND, delay: 0.06 }}
              className={`relative grid sm:grid-cols-2 gap-6 items-center ${isRight ? "sm:[&>*:first-child]:order-2" : ""}`}
            >
              <div className={`pl-12 sm:pl-0 ${isRight ? "sm:pl-12" : "sm:pr-12 sm:text-right"}`}>
                <div className={`inline-flex flex-col ${isRight ? "" : "sm:items-end"}`}>
                  <AnimatedCounter value={m.year} className="font-display text-5xl sm:text-6xl text-secondary leading-none tabular-nums" />
                  <div className={`mt-3 max-w-md ${isRight ? "" : "sm:ml-auto"}`}>
                    <h3 className="font-display text-xl sm:text-2xl text-fire leading-tight">{m.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </div>
              <div className="absolute left-4 sm:left-1/2 top-1 -translate-x-1/2 z-10">
                <div className="relative">
                  {isCurrent && <span className="absolute inset-0 rounded-full bg-primary opacity-60 animate-ping" />}
                  <div className={`relative w-10 h-10 rounded-full flex items-center justify-center border-2 border-background transition-colors duration-300 ${i <= current ? "bg-gradient-fire" : "bg-muted"}`}>
                    <m.icon className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
              <div className="hidden sm:block" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

/** Vertical racing timeline — 30 years of Adricar as a story. */
export const Timeline30Years = ({ compact = false }: { compact?: boolean }) => {
  return (
    <section className={`relative overflow-hidden ${compact ? "py-12" : "py-24 sm:py-32"}`}>
      <div className="absolute inset-0 bg-carbon opacity-60" />
      <div className="absolute inset-0 bg-gradient-radial-glow opacity-30" />

      <div className="container-x relative z-10">
        {/* Header */}
        <div className={compact ? "sr-only" : "text-center mb-16"}>
          <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-secondary/80 mb-3">
            1996 — 2026 · TIMELINE
          </div>
          <h2 className="font-display text-4xl sm:text-6xl leading-[0.9]">
            <span className="block text-foreground">30 ANOS.</span>
            <span className="block text-fire">UMA VOLTA COMPLETA.</span>
          </h2>
        </div>

        {/* Timeline rail */}
        <TimelineRail />

        <div className="relative max-w-4xl mx-auto">
          {/* Finish line */}
          <div className="mt-16 flex items-center justify-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/30" />
            <div
              className="w-10 h-6 rounded-sm"
              style={{
                backgroundImage:
                  "repeating-conic-gradient(#000 0% 25%, #fff 0% 50%)",
                backgroundSize: "8px 8px",
              }}
            />
            <div className="font-display text-sm tracking-[0.3em] text-white/70">FINISH</div>
            <div
              className="w-10 h-6 rounded-sm"
              style={{
                backgroundImage:
                  "repeating-conic-gradient(#000 0% 25%, #fff 0% 50%)",
                backgroundSize: "8px 8px",
              }}
            />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/30" />
          </div>
        </div>
      </div>
    </section>
  );
};
