import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/Magnetic";

/** Full-bleed CTA band with live countdown to end of business day. */
export const UrgencyCTA = () => {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date();
      // Adricar closes 18h. If already past, target next day 18h.
      end.setHours(18, 0, 0, 0);
      if (end.getTime() <= now.getTime()) end.setDate(end.getDate() + 1);
      const diff = Math.max(0, end.getTime() - now.getTime());
      setTime({
        h: Math.floor(diff / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Diagonal fire bg */}
      <div className="absolute inset-0 bg-gradient-fire opacity-90" />
      <div className="absolute inset-0 bg-carbon opacity-40 mix-blend-multiply" />
      {/* Racing chevrons */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0 40px, hsl(0 0% 0% / 0.4) 40px 42px)",
        }}
      />

      <div className="container-x relative z-10 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/30 mb-5">
            <Clock className="w-3.5 h-3.5 text-white" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white">
              JANELA DE AGENDAMENTO ABERTA
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl leading-[0.9] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <span className="block">TRAGA SEU CARRO</span>
            <span className="block text-black">HOJE MESMO.</span>
          </h2>
          <p className="mt-4 text-white/90 text-lg max-w-lg">
            Reserve seu horário antes que a agenda feche. Diagnóstico expresso e
            orçamento sem compromisso.
          </p>
        </div>

        <div className="relative">
          {/* Countdown */}
          <div className="flex justify-end gap-3 mb-6">
            {[
              { v: pad(time.h), l: "HORAS" },
              { v: pad(time.m), l: "MIN" },
              { v: pad(time.s), l: "SEG" },
            ].map((t) => (
              <div
                key={t.l}
                className="bg-black/70 border border-white/20 rounded-lg px-4 py-3 min-w-[76px] text-center backdrop-blur-sm"
              >
                <motion.div
                  key={t.v}
                  initial={{ y: -6, opacity: 0.5 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="font-display text-3xl sm:text-4xl text-neon-yellow tabular-nums leading-none"
                >
                  {t.v}
                </motion.div>
                <div className="mt-1 text-[9px] font-mono uppercase tracking-[0.25em] text-white/70">
                  {t.l}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Magnetic>
              <Button variant="hero" size="xl" asChild className="bg-black text-neon-yellow hover:bg-black/90 border-2 border-black shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                <a href="https://wa.me/5511985370952?text=Quero%20agendar%20minha%20revis%C3%A3o" target="_blank" rel="noopener">
                  Agendar Agora
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </Magnetic>
          </div>
          <div className="mt-3 text-right text-[10px] font-mono uppercase tracking-[0.3em] text-white/80">
            até o fechamento de hoje · seg–sáb 8h–18h
          </div>
        </div>
      </div>
    </section>
  );
};
