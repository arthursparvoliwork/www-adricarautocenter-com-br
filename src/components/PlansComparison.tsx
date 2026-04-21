import { motion } from "framer-motion";
import { Check, MessageCircle, Sparkles, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const PLANS = [
  {
    name: "Básico",
    icon: Zap,
    color: "border-border",
    accent: "text-foreground",
    badge: null,
    features: [
      "Troca de óleo + filtro",
      "Inspeção visual de freios",
      "Calibragem dos pneus",
      "Verificação de fluidos",
      "Check-list 12 pontos",
    ],
    msg: "Olá Adricar! Quero orçamento da REVISÃO BÁSICA.",
  },
  {
    name: "Completa",
    icon: Sparkles,
    color: "border-primary shadow-[0_0_40px_hsl(0_100%_55%/0.4)] scale-[1.03]",
    accent: "text-fire",
    badge: "MAIS PEDIDA",
    features: [
      "Tudo da Básica +",
      "Sangria de freios",
      "Alinhamento e balanceamento",
      "Limpeza de bicos injetores",
      "Diagnóstico com scanner",
      "Check-list 30 pontos",
    ],
    msg: "Olá Adricar! Quero orçamento da REVISÃO COMPLETA.",
  },
  {
    name: "Premium",
    icon: Crown,
    color: "border-secondary",
    accent: "text-neon-yellow",
    badge: "TOP",
    features: [
      "Tudo da Completa +",
      "Higienização do ar-condicionado",
      "Troca de fluido de freio + radiador",
      "Polimento técnico de faróis",
      "Geometria computadorizada 3D",
      "Garantia estendida de 6 meses",
      "Check-list 50 pontos",
    ],
    msg: "Olá Adricar! Quero orçamento da REVISÃO PREMIUM.",
  },
];

export const PlansComparison = () => {
  return (
    <section id="planos" className="relative py-24 lg:py-32 bg-carbon overflow-hidden">
      <div className="container-x relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 mb-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Escolha seu plano</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
            Compare nossas <span className="text-fire">revisões</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            3 níveis de cuidado pro seu carro. Preço sob consulta — toque no plano e fale com a gente no WhatsApp.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-4">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative bg-card border-2 ${plan.color} rounded-3xl p-8 flex flex-col transition-all duration-500 hover:-translate-y-2`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-fire rounded-full text-[10px] font-bold tracking-[0.2em] text-primary-foreground">
                  {plan.badge}
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center`}>
                  <plan.icon className={`w-6 h-6 ${plan.accent}`} />
                </div>
                <h3 className={`font-display text-3xl ${plan.accent}`}>{plan.name}</h3>
              </div>

              <div className="mb-6">
                <div className="font-display text-4xl text-foreground">Sob consulta</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Toque pra cotação no WhatsApp</div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.name === "Completa" ? "hero" : "outlineNeon"}
                size="lg"
                asChild
                className="w-full"
              >
                <a
                  href={`https://wa.me/5511985370952?text=${encodeURIComponent(plan.msg)}`}
                  target="_blank"
                  rel="noopener"
                >
                  <MessageCircle className="w-4 h-4" /> Pedir cotação
                </a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
