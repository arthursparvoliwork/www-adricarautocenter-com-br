import { SectionHeading } from "@/components/SectionHeading";
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
        <SectionHeading
          align="left"
          kicker="Antes & Depois"
          title="Resultados que *você* *vê.*"
          sub="Arraste o comparador e veja a diferença. Trabalho honesto, resultado garantido."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {cases.map((c) => (
            <BeforeAfter key={c.alt} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
};
