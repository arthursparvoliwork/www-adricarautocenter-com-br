import { motion } from "framer-motion";
import { ScanLine, Search, FileText, Wrench, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/Magnetic";
import diagnostico from "@/assets/diagnostico.jpg";

const steps = [
  { icon: ScanLine, title: "Conexão do scanner", desc: "Leitura de todos os módulos do veículo." },
  { icon: Search, title: "Análise dos códigos", desc: "Interpretação real das falhas, não só o código." },
  { icon: FileText, title: "Laudo transparente", desc: "Você recebe o que foi encontrado e o orçamento." },
  { icon: Wrench, title: "Reparo e reteste", desc: "Corrigimos e apagamos as falhas com o carro testado." },
];

/** Diagnóstico com scanner — base na arte do scanner automotivo. */
export const ScannerDiagnostics = () => {
  return (
    <section id="diagnostico" className="relative py-24 overflow-hidden bg-carbon border-y border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,hsl(0_90%_45%/0.28),transparent_55%)]" />
      <div className="absolute inset-0 speed-lines" />

      <div className="container-x relative z-10">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full border border-secondary/40 bg-secondary/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-secondary">
            Diagnóstico computadorizado
          </span>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.92]">
            <span className="block text-metal">SCANNER DE ALTA</span>
            <span className="block text-fire">TECNOLOGIA.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Descobrimos o problema do seu carro com precisão antes de qualquer reparo. Leitura
            de todos os módulos, teste de sensores em tempo real e laudo explicado em linguagem
            simples.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative chamfer-lg overflow-hidden border-2 border-primary/40">
              <img
                src={diagnostico}
                alt="Scanner automotivo conectado para diagnóstico eletrônico do veículo"
                loading="lazy"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-transparent" />
              {/* Linha de varredura */}
              <motion.div
                aria-hidden="true"
                className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-secondary/30 to-transparent"
                initial={{ y: "-20%" }}
                animate={{ y: ["-20%", "420%"] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          <ol className="order-1 lg:order-2 space-y-3">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: i * 0.09 }}
                className="group flex items-start gap-4 chamfer border border-border bg-card/85 p-5 transition-all duration-500 hover:border-secondary/60 hover:-translate-y-0.5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-yellow shadow-[0_0_20px_hsl(50_100%_55%/0.35)]">
                  <s.icon className="h-5 w-5 text-secondary-foreground" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xs text-primary">0{i + 1}</span>
                    <h3 className="font-display text-lg uppercase tracking-wide text-foreground">{s.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <Button variant="hero" size="lg" asChild>
              <a
                href={`https://wa.me/5511985370952?text=${encodeURIComponent("Olá Adricar! Quero agendar um diagnóstico com scanner.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar diagnóstico
              </a>
            </Button>
          </Magnetic>
          <Link
            to="/servicos/injecao-eletronica"
            className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-secondary hover:text-secondary/80 transition-colors"
          >
            <CheckCircle2 className="h-4 w-4" /> Ver injeção eletrônica
          </Link>
        </div>
      </div>
    </section>
  );
};
