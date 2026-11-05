import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DURATION, EASE_BRAND, STAGGER } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useMotionPrefs";

/**
 * Título padrão de seção: kicker amarelo + título Russo One com mask reveal por palavra
 * + linha vermelho→amarelo que "acelera" da esquerda (scaleX).
 * No `title` (string), palavras entre *asteriscos* ficam com gradiente fogo; "|" quebra a linha.
 */
export const SectionHeading = ({
  kicker, title, sub, align = "center", className,
}: { kicker: string; title: string; sub?: ReactNode; align?: "center" | "left"; className?: string }) => {
  const reduced = usePrefersReducedMotion();
  const lines = title.split("|").map((l) => l.trim().split(" ").filter(Boolean));
  let idx = 0;
  const vp = { once: true, margin: "-60px" } as const;

  return (
    <div className={cn("mb-14 max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <motion.div
        className="section-kicker"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: DURATION.enter, ease: EASE_BRAND }}
      >
        {kicker}
      </motion.div>
      <motion.h2
        className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.98] mt-3"
        aria-label={title.replace(/[*|]/g, "")}
        initial={reduced ? false : "hidden"}
        whileInView="show"
        viewport={vp}
      >
        {lines.map((words, li) => (
          <span key={li} className="block" aria-hidden="true">
            {words.map((w, wi) => {
              const hl = w.startsWith("*");
              const text = w.replace(/\*/g, "");
              const i = idx++;
              return (
                <span key={wi} className="inline-block overflow-hidden align-bottom pb-[0.08em]">
                  <motion.span
                    className={cn("inline-block", hl && "text-fire")}
                    variants={{
                      hidden: { y: "110%" },
                      show: { y: "0%", transition: { duration: DURATION.enter, ease: EASE_BRAND, delay: 0.1 + i * STAGGER } },
                    }}
                  >
                    {text}
                  </motion.span>
                  {wi < words.length - 1 && "\u00A0"}
                </span>
              );
            })}
          </span>
        ))}
      </motion.h2>
      <motion.div
        className={cn("section-rule mt-5 origin-left", align === "center" && "mx-auto")}
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={vp}
        transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1], delay: 0.25 }}
      />
      {sub && (
        <motion.p
          className="mt-5 text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: DURATION.enter, ease: EASE_BRAND, delay: 0.35 }}
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
};
