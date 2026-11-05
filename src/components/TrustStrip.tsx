import { Award, Star, ShieldCheck, CreditCard } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const ITEMS = [
  { icon: Award, value: "30+", label: "anos no mercado" },
  { icon: Star, value: "4.4★", label: "no Google" },
  { icon: ShieldCheck, value: "90 dias", label: "de garantia" },
  { icon: CreditCard, value: "18x", label: "no cartão" },
];

/** Faixa de confiança logo abaixo do hero. */
export const TrustStrip = () => (
  <section aria-label="Por que confiar" className="relative border-y border-border bg-card/60 backdrop-blur-sm">
    <Stagger className="container-x grid grid-cols-2 lg:grid-cols-4 divide-x divide-border/60">
      {ITEMS.map((it) => (
        <StaggerItem key={it.label} className="flex items-center justify-center gap-3 py-6 px-3">
          <it.icon className="w-6 h-6 text-secondary shrink-0" aria-hidden="true" />
          <div className="leading-tight">
            <AnimatedCounter value={it.value} className="block font-display text-2xl sm:text-3xl text-foreground tabular-nums" />
            <div className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">{it.label}</div>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  </section>
);
