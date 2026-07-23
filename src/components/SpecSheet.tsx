import { motion } from "framer-motion";
import { Gauge, Thermometer, Timer, Zap, Fuel, Activity } from "lucide-react";

const METRICS = [
  { icon: Gauge, label: "RPM MÁX. TESTADO", value: "7,200", unit: "rpm", bar: 0.86 },
  { icon: Thermometer, label: "TEMP. OPERAÇÃO", value: "92", unit: "°C", bar: 0.74 },
  { icon: Timer, label: "TEMPO MÉDIO REVISÃO", value: "2h48", unit: "min", bar: 0.55 },
  { icon: Zap, label: "TORQUE CALIBRADO", value: "320", unit: "N·m", bar: 0.92 },
  { icon: Fuel, label: "EFICIÊNCIA INJEÇÃO", value: "98.7", unit: "%", bar: 0.98 },
  { icon: Activity, label: "DIAGNÓSTICOS/DIA", value: "24", unit: "un", bar: 0.68 },
];

/** Technical spec sheet — manufacturer-grade telemetry card. */
export const SpecSheet = () => {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-stripes opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="container-x relative z-10">
        {/* Header row */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 pb-6 border-b border-white/15">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-secondary/80">
              REF · ADR-30Y · SÃO PAULO/SP
            </div>
            <h2 className="mt-3 font-display text-4xl sm:text-6xl leading-[0.9]">
              <span className="block text-foreground">FICHA</span>
              <span className="block text-fire">TÉCNICA.</span>
            </h2>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
              DOC. 001 / 2026
            </div>
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 border border-secondary/40 rounded-full">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-secondary">
                DADOS AO VIVO
              </span>
            </div>
          </div>
        </div>

        {/* Metrics grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative bg-card/60 backdrop-blur-sm p-6 sm:p-8 group hover:bg-card transition-colors"
            >
              {/* Corner tick */}
              <div className="absolute top-3 right-3 font-mono text-[10px] text-white/40 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className="flex items-start gap-3 mb-6">
                <m.icon className="w-5 h-5 text-primary" strokeWidth={2} />
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/60 leading-tight pt-0.5">
                  {m.label}
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <div className="font-display text-5xl sm:text-6xl text-neon-yellow tabular-nums leading-none">
                  {m.value}
                </div>
                <div className="text-xs font-mono uppercase text-white/50">{m.unit}</div>
              </div>

              {/* Bar */}
              <div className="mt-6 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: m.bar }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "left" }}
                  className="h-full bg-gradient-fire"
                />
              </div>
              <div className="mt-2 flex justify-between font-mono text-[9px] text-white/40">
                <span>MIN</span>
                <span>{Math.round(m.bar * 100)}%</span>
                <span>MAX</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer sign */}
        <div className="mt-8 flex items-center justify-between flex-wrap gap-3 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
          <span>— assinado · adricar centro automotivo</span>
          <span>rev. {new Date().getFullYear()} · certificado senai</span>
        </div>
      </div>
    </section>
  );
};
