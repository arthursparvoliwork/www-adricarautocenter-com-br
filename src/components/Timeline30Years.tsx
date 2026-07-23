import { motion } from "framer-motion";
import { Flag, Wrench, Award, Users, Rocket, Trophy } from "lucide-react";

const MILESTONES = [
  { year: "1996", icon: Flag, title: "PARTIDA", desc: "Adricar abre as portas no Grajaú. Uma bancada, muitas ferramentas e a promessa de fazer certo." },
  { year: "2004", icon: Wrench, title: "EXPANSÃO DA OFICINA", desc: "Chegam os equipamentos de alinhamento computadorizado e balanceamento eletrônico." },
  { year: "2010", icon: Award, title: "CERTIFICAÇÃO SENAI", desc: "Toda a equipe passa por formação técnica contínua. Padrão de fábrica em cada serviço." },
  { year: "2016", icon: Users, title: "1.000+ CLIENTES", desc: "Fidelizamos gerações de motoristas. Muitos carros voltam há mais de uma década." },
  { year: "2022", icon: Rocket, title: "INJEÇÃO ELETRÔNICA AVANÇADA", desc: "Scanners multimarca, reprogramação de módulos e diagnóstico digital em tempo real." },
  { year: "2026", icon: Trophy, title: "30 ANOS DE ESTRADA", desc: "Três décadas cuidando do carro de quem confia. E ainda estamos só na primeira marcha." },
];

/** Vertical racing timeline — 30 years of Adricar as a story. */
export const Timeline30Years = () => {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-carbon opacity-60" />
      <div className="absolute inset-0 bg-gradient-radial-glow opacity-30" />

      <div className="container-x relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-secondary/80 mb-3">
            1996 — 2026 · TIMELINE
          </div>
          <h2 className="font-display text-4xl sm:text-6xl leading-[0.9]">
            <span className="block text-foreground">30 ANOS.</span>
            <span className="block text-fire">UMA VOLTA COMPLETA.</span>
          </h2>
        </div>

        {/* Timeline rail */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/25 to-transparent -translate-x-px" />
          {/* Animated fire pulse traveling */}
          <motion.div
            className="absolute left-4 sm:left-1/2 top-0 w-[3px] h-24 bg-gradient-to-b from-primary via-secondary to-transparent rounded-full -translate-x-[1px] blur-[1px]"
            animate={{ y: ["-10%", "110%"] }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          />

          <div className="space-y-16">
            {MILESTONES.map((m, i) => {
              const isRight = i % 2 === 1;
              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className={`relative grid sm:grid-cols-2 gap-6 items-center ${isRight ? "sm:[&>*:first-child]:order-2" : ""}`}
                >
                  {/* Card */}
                  <div className={`pl-12 sm:pl-0 ${isRight ? "sm:pl-12" : "sm:pr-12 sm:text-right"}`}>
                    <div className={`inline-flex flex-col ${isRight ? "" : "sm:items-end"}`}>
                      <div className="font-display text-5xl sm:text-6xl text-neon-yellow leading-none tabular-nums">
                        {m.year}
                      </div>
                      <div className={`mt-3 max-w-md ${isRight ? "" : "sm:ml-auto"}`}>
                        <h3 className="font-display text-xl sm:text-2xl text-fire leading-tight">
                          {m.title}
                        </h3>
                        <p className="mt-2 text-sm text-white/70 leading-relaxed">
                          {m.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Node */}
                  <div className="absolute left-4 sm:left-1/2 top-1 -translate-x-1/2 z-10">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-primary blur-lg opacity-60 animate-pulse" />
                      <div className="relative w-10 h-10 rounded-full bg-gradient-fire flex items-center justify-center border-2 border-background shadow-[0_0_25px_hsl(0_100%_55%/0.6)]">
                        <m.icon className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>

                  {/* Empty side (kept for grid) */}
                  <div className="hidden sm:block" />
                </motion.div>
              );
            })}
          </div>

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
