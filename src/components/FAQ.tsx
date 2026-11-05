import { SectionHeading } from "@/components/SectionHeading";
import { motion } from "framer-motion";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Vocês atendem carros importados?",
    a: "Sim! Trabalhamos com nacionais e importados — Toyota, Honda, Hyundai, Volkswagen, Fiat, Chevrolet, BMW, Audi, Mercedes e muitos outros. Equipamentos modernos e equipe especialista pra qualquer marca.",
  },
  {
    q: "Quanto custa uma revisão completa?",
    a: "Depende do modelo e do que precisa ser feito. Fazemos diagnóstico gratuito e passamos orçamento sem compromisso. Chame no WhatsApp pra agendar.",
  },
  {
    q: "Vocês parcelam o serviço?",
    a: "Sim! Parcelamos em até 18x no cartão de crédito. Trabalhamos com todas as bandeiras.",
  },
  {
    q: "Funcionam aos domingos?",
    a: "Sim, abrimos aos domingos das 10h às 15h. Segunda a sábado: 8h às 18h.",
  },
  {
    q: "Quanto tempo demora um serviço?",
    a: "Serviços rápidos (troca de óleo, alinhamento, balanceamento) ficam prontos no mesmo dia. Reparos maiores podem levar 1-3 dias dependendo da complexidade. Sempre informamos prazo no orçamento.",
  },
  {
    q: "Dão garantia nos serviços?",
    a: "Sim! Garantia em peças e mão de obra. O prazo varia conforme o serviço — informamos por escrito no orçamento.",
  },
  {
    q: "Onde ficam vocês?",
    a: "Av. Dona Belmira Marin, 1670/1674 — Parque Brasil, Grajaú, São Paulo/SP. Atendemos toda Zona Sul: Grajaú, Parelheiros, Jardim Castro Alves, Cidade Dutra.",
  },
  {
    q: "Como agendar?",
    a: "Pelo WhatsApp (11) 98537-0952 ou telefone (11) 2667-9953. Também pode preencher o formulário aqui no site.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="relative py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container-x relative z-10 max-w-4xl">
        <SectionHeading kicker="Dúvidas frequentes" title="Perguntas *comuns.*" />

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <AccordionItem value={`item-${i}`} className="card-metal card-metal-hover px-5 border-b-0">
                <AccordionTrigger className="text-left font-display text-base hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
