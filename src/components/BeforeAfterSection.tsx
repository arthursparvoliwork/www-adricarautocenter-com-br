import { motion } from "framer-motion";
import { BeforeAfter } from "@/components/BeforeAfter";
import freios from "@/assets/freios.jpg";
import diagnostico from "@/assets/diagnostico.jpg";
import roda from "@/assets/roda-pneu.jpg";
import escapamentos from "@/assets/escapamentos.jpg";

export const BeforeAfterSection = () => {
  // Como ainda não temos pares antes/depois, usamos imagens existentes como "antes" (com filtro escuro via CSS) e "depois" (original)
  const cases = [
    {
      before: freios,
      after: diagnostico,
      alt: "Sistema de freios",
      caption: "🔧 Sistema de freios — recuperação completa",
    },
    {
      before: escapamentos,
      after: roda,
      alt: "Suspensão e rodas",
      caption: "🛞 Suspensão e rodas — alinhamento de precisão",
    },
  ];

  return (
    <section id="antes-depois" className="relative py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container-x relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 mb-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Antes & Depois</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Resultados que <span className="text-fire">você vê</span>.
          </h2>
          <p className="text-lg text-muted-foreground mt-4">
            Arraste o slider e veja a diferença. <span className="text-secondary font-semibold">Trabalho honesto, resultado garantido.</span>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {cases.map((c) => (
            <BeforeAfter key={c.alt} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
};
