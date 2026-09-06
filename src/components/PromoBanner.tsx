import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Gift, Timer, CheckCircle2, BadgePercent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/Magnetic";

const WHATS = "https://wa.me/5511985370952?text=";

/** Fim da semana (domingo 23:59) — a promoção reinicia semanalmente. */
const nextSundayEnd = () => {
  const d = new Date();
  const days = (7 - d.getDay()) % 7;
  const end = new Date(d);
  end.setDate(d.getDate() + days);
  end.setHours(23, 59, 59, 999);
  return end;
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Promoção "Fechou, Ganhou!" — alinhamento grátis + oferta de jogo de rodas. */
export const PromoBanner = () => {
  const target = useMemo(nextSundayEnd, []);
  const [left, setLeft] = useState(() => target.getTime() - Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setLeft(target.getTime() - Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const s = Math.max(0, Math.floor(left / 1000));
  const parts = [
    { v: Math.floor(s / 86400), l: "dias" },
    { v: Math.floor((s % 86400) / 3600), l: "hrs" },
    { v: Math.floor((s % 3600) / 60), l: "min" },
    { v: s % 60, l: "seg" },
  ];

  return (
    <section id="promocao" className="relative py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-carbon" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,hsl(0_90%_45%/0.35),transparent_55%),radial-gradient(circle_at_85%_90%,hsl(50_100%_50%/0.18),transparent_55%)]" />
      <div className="absolute top-0 inset-x-0 accent-line-white" />

      <div className="container-x relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-stretch"
        >
          {/* Oferta principal */}
          <div className="relative chamfer-lg bevel-metal p-8 sm:p-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-primary">
              <BadgePercent className="h-3.5 w-3.5" /> Promoção da semana
            </span>

            <h2 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.88]">
              <span className="block text-metal">FECHOU,</span>
              <span className="block text-fire">GANHOU!</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-foreground/85">
              Fechou qualquer serviço acima de{" "}
              <span className="font-display text-secondary text-2xl align-middle">R$ 300</span> e
              ganhou{" "}
              <span className="font-bold text-secondary">alinhamento grátis</span>.
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground italic">
              Quanto mais você cuida do seu carro, mais você economiza.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 rounded-xl border border-secondary/35 bg-secondary/10 px-4 py-2.5">
                <Timer className="h-4 w-4 text-secondary" />
                <div className="flex items-end gap-2 tabular-nums">
                  {parts.map((p) => (
                    <div key={p.l} className="text-center leading-none">
                      <div className="font-display text-2xl text-secondary">{pad(p.v)}</div>
                      <div className="text-[9px] uppercase tracking-[0.2em] text-secondary/70">{p.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <span className="brush-strip text-[11px] font-bold uppercase tracking-wider text-secondary-foreground">
                Vale só essa semana — a fila anda rápido!
              </span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Magnetic>
                <Button variant="hero" size="xl" asChild>
                  <a
                    href={`${WHATS}${encodeURIComponent("Olá Adricar! Quero garantir a promoção FECHOU, GANHOU — alinhamento grátis acima de R$ 300.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Gift className="h-5 w-5" />
                    Quero minha promoção
                  </a>
                </Button>
              </Magnetic>
              <Button variant="outlineNeon" size="xl" asChild>
                <a href="#servicos">Ver serviços</a>
              </Button>
            </div>

            <ul className="mt-7 grid sm:grid-cols-3 gap-3 text-xs">
              {[
                "Profissionais certificados pelo SENAI",
                "Diagnóstico com scanner de alta tecnologia",
                "Peças e serviços com garantia",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2 text-foreground/80">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="font-semibold uppercase tracking-wide leading-snug">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Oferta de rodas */}
          <div className="relative chamfer-lg overflow-hidden border-2 border-secondary/45 bg-gradient-to-br from-card via-card/90 to-background p-8 flex flex-col justify-between">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-secondary/15 blur-3xl" />
            <div className="relative">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary/80">
                Aproveite essa oferta
              </span>
              <h3 className="mt-3 font-display text-4xl leading-none text-metal">JOGO DE RODAS</h3>
              <div className="mt-5 flex items-end gap-3">
                <span className="font-display text-2xl text-muted-foreground line-through decoration-primary decoration-2">
                  R$ 3.700
                </span>
                <span className="font-display text-5xl sm:text-6xl text-neon-yellow leading-none">R$ 2.900</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Jogo completo com montagem, balanceamento e alinhamento. Estoque limitado.
              </p>
            </div>
            <Magnetic className="relative mt-7">
              <Button variant="whatsapp" size="lg" className="w-full rounded-xl" asChild>
                <a
                  href={`${WHATS}${encodeURIComponent("Olá Adricar! Quero o jogo de rodas por R$ 2.900. Ainda tem disponível?")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Garanta o seu antes que acabe
                </a>
              </Button>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
