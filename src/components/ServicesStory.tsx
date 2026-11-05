import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DURATION, EASE_BRAND } from "@/lib/motion";
import motor from "@/assets/oficina-motor.jpg";
import roda from "@/assets/roda-pneu.jpg";
import freios from "@/assets/freios.jpg";
import diag from "@/assets/diagnostico.jpg";
import mecanico from "@/assets/mecanico-trabalho.jpg";
import escape from "@/assets/escapamentos.jpg";

export const STORY = [
  { img: mecanico, title: "Mecânica Geral", desc: "Motor, câmbio, correia dentada, embreagem e revisão completa para nacionais e importados.", tags: ["Motor e câmbio", "Correia dentada", "Revisão"] },
  { img: diag, title: "Diagnóstico com Scanner", desc: "Leitura de falhas multimarca em tempo real, injeção eletrônica, ABS e Air Bag.", tags: ["Injeção", "ABS / Air Bag", "Rede CAN"], slug: "injecao-eletronica" },
  { img: freios, title: "Freios", desc: "Pastilhas, discos, fluido e sangria com peças de qualidade e teste final.", tags: ["Pastilhas", "Discos", "Sangria"], slug: "freios" },
  { img: roda, title: "Rodas e Pneus", desc: "Pirelli, Michelin, Bridgestone e Firestone — montagem, alinhamento e balanceamento.", tags: ["Pneus", "Alinhamento", "Balanceamento"], slug: "rodas-e-pneus" },
  { img: motor, title: "Suspensão e Direção", desc: "Amortecedores, molas, cambagem e caixa de direção hidráulica ou elétrica.", tags: ["Amortecedores", "Cambagem", "Direção"], slug: "suspensao" },
  { img: escape, title: "Escapamentos e Elétrica", desc: "Escapamentos, ar-condicionado e elétrica automotiva completa.", tags: ["Escapamento", "Ar-condicionado", "Elétrica"], slug: "eletromecanica" },
];

/** Desktop: visual fixo à esquerda que troca conforme o card ativo à direita. */
export const ServicesStory = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 40%", "end 60%"] });
  useMotionValueEvent(scrollYProgress, "change", (p) =>
    setActive(Math.min(STORY.length - 1, Math.max(0, Math.floor(p * STORY.length))))
  );

  return (
    <div ref={ref} className="relative grid grid-cols-[1.1fr_1fr] gap-12">
      {/* Visual fixo */}
      <div className="sticky top-28 h-[calc(100vh-9rem)] self-start">
        <div className="relative h-full card-metal overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.img
              key={active}
              src={STORY[active].img}
              alt={STORY[active].title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)", scale: 1.08 }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)", scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION.hero, ease: EASE_BRAND }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <div className="font-display text-8xl text-fire leading-none tabular-nums">{String(active + 1).padStart(2, "0")}</div>
            <div className="font-display text-3xl mt-2">{STORY[active].title}</div>
          </div>
          {/* Progresso vertical */}
          <div className="absolute right-4 top-6 bottom-6 w-[3px] bg-border/60 overflow-hidden rounded-full">
            <motion.div className="w-full h-full origin-top bg-gradient-to-b from-primary to-secondary" style={{ scaleY: scrollYProgress }} />
          </div>
        </div>
      </div>

      {/* Cards que passam */}
      <div className="py-[18vh] space-y-[22vh]">
        {STORY.map((s, i) => {
          const on = i === active;
          const body = (
            <motion.div
              animate={{ scale: on ? 1 : 0.94, opacity: on ? 1 : 0.45 }}
              transition={{ duration: DURATION.enter, ease: EASE_BRAND }}
              className={cn("card-metal p-8 transition-[border-color,box-shadow] duration-300", on && "border-primary/70 shadow-[0_0_40px_hsl(var(--primary)/0.35)]")}
            >
              <div className="flex items-start justify-between gap-4">
                <span className={cn("font-display text-6xl leading-none tabular-nums", on ? "text-fire" : "text-muted-foreground/40")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.slug && <ArrowUpRight className="w-6 h-6 text-secondary" />}
              </div>
              <h3 className="font-display text-3xl mt-4">{s.title}</h3>
              <p className="text-muted-foreground mt-3 text-lg">{s.desc}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {s.tags.map((t) => (
                  <span key={t} className="text-xs font-bold uppercase tracking-wider px-3 py-1 border border-secondary/30 text-secondary">{t}</span>
                ))}
              </div>
            </motion.div>
          );
          return s.slug ? <Link key={s.title} to={`/servicos/${s.slug}`} className="block">{body}</Link> : <div key={s.title}>{body}</div>;
        })}
      </div>
    </div>
  );
};
