import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/** Cinematic engine blueprint section — scroll-driven rotation, wireframe aesthetic. */
export const EngineBlueprint = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-45, 45]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.05, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-carbon">
      <div className="absolute inset-0 bg-gradient-radial-glow opacity-30" />
      <div className="absolute inset-0 tire-tracks opacity-40" />

      <div className="container-x relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="text-[10px] uppercase tracking-[0.4em] text-secondary">
            — Engenharia · Blueprint
          </div>
          <h2 className="font-display text-4xl sm:text-6xl leading-[0.95]">
            <span className="block text-foreground">CADA PEÇA.</span>
            <span className="block text-fire">CADA MILÍMETRO.</span>
            <span className="block text-stroke-white text-transparent">SOB CONTROLE.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
            Do bloco do motor à mais fina linha de injeção — mapeamos, calibramos e
            devolvemos o seu carro pronto pra queimar asfalto. Diagnóstico digital,
            execução artesanal.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { n: "0.01", u: "mm", l: "precisão" },
              { n: "240", u: "km/h", l: "confiança" },
              { n: "30", u: "anos", l: "expertise" },
            ].map((s) => (
              <div key={s.l} className="border-l-2 border-primary/60 pl-3">
                <div className="font-display text-2xl text-neon-yellow tabular-nums">
                  {s.n}
                  <span className="text-xs text-muted-foreground ml-1">{s.u}</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/50 mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div style={{ scale, opacity }} className="relative aspect-square">
          {/* Rotating dashed ring */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          >
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <circle cx="200" cy="200" r="195" fill="none" stroke="hsl(50 100% 55% / 0.3)" strokeWidth="1" strokeDasharray="4 8" />
              <circle cx="200" cy="200" r="170" fill="none" stroke="hsl(0 100% 55% / 0.2)" strokeWidth="1" strokeDasharray="2 12" />
            </svg>
          </motion.div>

          {/* Engine wireframe — rotates with scroll */}
          <motion.div style={{ rotate }} className="absolute inset-8">
            <svg viewBox="0 0 300 300" className="w-full h-full">
              <defs>
                <linearGradient id="eng-fill" x1="0" x2="1">
                  <stop offset="0%" stopColor="hsl(0 90% 55% / 0.15)" />
                  <stop offset="100%" stopColor="hsl(50 100% 55% / 0.15)" />
                </linearGradient>
                <filter id="eng-glow">
                  <feGaussianBlur stdDeviation="2" />
                </filter>
              </defs>

              {/* Block */}
              <rect x="70" y="90" width="160" height="120" rx="6" fill="url(#eng-fill)" stroke="hsl(50 100% 55%)" strokeWidth="1.2" />
              {/* Cylinders */}
              {[0, 1, 2, 3].map((i) => (
                <g key={i}>
                  <circle cx={95 + i * 37} cy="130" r="14" fill="hsl(0 0% 5%)" stroke="hsl(0 100% 55%)" strokeWidth="1.2" />
                  <circle cx={95 + i * 37} cy="130" r="8" fill="none" stroke="hsl(50 100% 55% / 0.6)" strokeWidth="0.8" />
                  <motion.circle
                    cx={95 + i * 37}
                    cy="130"
                    r="3"
                    fill="hsl(50 100% 60%)"
                    filter="url(#eng-glow)"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.15 }}
                  />
                </g>
              ))}
              {/* Manifold */}
              <path d="M 70 100 Q 40 60 40 30" fill="none" stroke="hsl(0 100% 55%)" strokeWidth="1.5" />
              <path d="M 100 90 Q 90 60 90 30" fill="none" stroke="hsl(0 100% 55%)" strokeWidth="1.2" />
              <path d="M 200 90 Q 210 60 210 30" fill="none" stroke="hsl(0 100% 55%)" strokeWidth="1.2" />
              <path d="M 230 100 Q 260 60 260 30" fill="none" stroke="hsl(0 100% 55%)" strokeWidth="1.5" />
              {/* Base */}
              <rect x="60" y="210" width="180" height="18" fill="hsl(0 0% 10%)" stroke="hsl(50 100% 55% / 0.5)" strokeWidth="0.8" />
              {/* Belt */}
              <ellipse cx="150" cy="180" rx="70" ry="8" fill="none" stroke="hsl(0 0% 40%)" strokeWidth="1" strokeDasharray="3 3" />

              {/* Callouts */}
              <g fontFamily="monospace" fontSize="8" fill="hsl(50 100% 65%)">
                <line x1="95" y1="130" x2="30" y2="240" stroke="hsl(50 100% 55% / 0.5)" strokeWidth="0.5" />
                <text x="10" y="252">01 · PISTÃO</text>
                <line x1="230" y1="100" x2="285" y2="60" stroke="hsl(50 100% 55% / 0.5)" strokeWidth="0.5" />
                <text x="240" y="52">02 · ADMISSÃO</text>
                <line x1="240" y1="219" x2="290" y2="260" stroke="hsl(50 100% 55% / 0.5)" strokeWidth="0.5" />
                <text x="240" y="275">03 · CARTER</text>
              </g>
            </svg>
          </motion.div>

          {/* Crosshair reticle */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
