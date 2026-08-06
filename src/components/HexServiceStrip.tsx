import { motion } from "framer-motion";
import {
  Cog, Disc3, ShieldCheck, Wrench, Wind, Zap, Cpu,
} from "lucide-react";
import arte from "@/assets/arte-adricar.jpg";
import lockup from "@/assets/adricar-lockup-clean.png";


const CHIPS = [
  { icon: Cog, title: "SUSPENSÃO", sub: "Perfeita" },
  { icon: Disc3, title: "FREIOS", sub: "Alta performance" },
  { icon: ShieldCheck, title: "AIR BAG E ABS", sub: "Diagnóstico" },
  { icon: Wrench, title: "MOTOR E CÂMBIO", sub: "Revisão completa" },
  { icon: Wind, title: "PEÇAS E SERVIÇOS", sub: "Originais" },
  { icon: Zap, title: "ELÉTRICA", sub: "Especializada" },
  { icon: Cpu, title: "INJEÇÃO", sub: "Eletrônica" },
];

const TRUST = [
  { t: "QUALIDADE", s: "que você confia" },
  { t: "SEGURANÇA", s: "que você merece" },
  { t: "PERFORMANCE", s: "que impressiona" },
  { t: "ATENDIMENTO", s: "que faz a diferença" },
];

/** Faixa de especialidades em chips hexagonais + selos de confiança (inspirado na arte oficial). */
export const HexServiceStrip = () => {
  return (
    <section className="relative py-14 sm:py-20 overflow-hidden bg-carbon">
      {/* Arte oficial como plano de fundo */}
      <img
        src={arte}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/60 to-background/95" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-fire" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-fire" />

      <div className="container-x relative z-10">
        <motion.img
          src={lockup}
          alt="Adricar Centro Automotivo"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto w-full max-w-2xl drop-shadow-[0_16px_60px_rgba(230,57,70,0.5)]"
        />
        <p className="mt-4 text-center text-[10px] sm:text-xs font-mono uppercase tracking-[0.35em] text-white/70">
          30 anos · peças e serviços · garantia real
        </p>


        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {CHIPS.map((c, i) => (
            <motion.a
              key={c.title}
              href="#contato"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group relative flex flex-col items-center gap-2 px-3 py-5 bg-black/70 border border-white/10 hover:border-primary transition-colors"
              style={{
                clipPath:
                  "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)",
              }}
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-b from-primary/20 to-transparent" />
              <c.icon className="relative w-7 h-7 text-white group-hover:text-secondary transition-colors drop-shadow-[0_0_10px_hsl(0_100%_55%/0.5)]" />
              <span className="relative font-display text-[11px] sm:text-xs text-white tracking-wide text-center leading-tight">
                {c.title}
              </span>
              <span className="relative text-[9px] font-mono uppercase tracking-[0.15em] text-white/45 text-center">
                {c.sub}
              </span>
            </motion.a>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {TRUST.map((t) => (
            <div key={t.t} className="bg-black/80 px-4 py-4 text-center">
              <div className="font-display text-sm sm:text-base text-secondary tracking-wide">{t.t}</div>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/50">{t.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
