import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion";

/** Título padrão de seção: kicker amarelo + título Russo One + linha vermelho→amarelo. */
export const SectionHeading = ({ kicker, title, sub, align = "center", className }:
  { kicker: string; title: ReactNode; sub?: ReactNode; align?: "center" | "left"; className?: string }) => (
  <Reveal className={cn("mb-14 max-w-3xl", align === "center" ? "mx-auto text-center" : "", className)}>
    <div className="section-kicker">{kicker}</div>
    <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.95] mt-3">{title}</h2>
    <div className={cn("section-rule mt-5", align === "center" && "mx-auto")} />
    {sub && <p className="mt-5 text-lg text-muted-foreground">{sub}</p>}
  </Reveal>
);
