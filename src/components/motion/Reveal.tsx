import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { DURATION, EASE_BRAND, SPRING } from "@/lib/motion";

export type RevealVariant =
  | "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scaleIn" | "blur" | "clip"
  | "mask" | "wipe" | "circle" | "diagonal" | "flip" | "spring";

const HIDDEN: Record<RevealVariant, Record<string, unknown>> = {
  fadeUp: { opacity: 0, y: 40 },
  fadeDown: { opacity: 0, y: -40 },
  fadeLeft: { opacity: 0, x: -48 },
  fadeRight: { opacity: 0, x: 48 },
  scaleIn: { opacity: 0, scale: 0.92 },
  blur: { opacity: 0, filter: "blur(12px)" },
  clip: { clipPath: "inset(0 0 100% 0)" },
  mask: { clipPath: "inset(100% 0 0 0)", y: 24 },
  wipe: { clipPath: "inset(0 100% 0 0)" },
  circle: { clipPath: "circle(0% at 50% 50%)" },
  diagonal: { clipPath: "polygon(0 0, 0 0, 0 0, 0 0)" },
  flip: { opacity: 0, rotateX: -70, transformPerspective: 900 },
  spring: { opacity: 0, y: 60, scale: 0.96 },
};
const SHOWN: Record<RevealVariant, Record<string, unknown>> = {
  fadeUp: { opacity: 1, y: 0 }, fadeDown: { opacity: 1, y: 0 },
  fadeLeft: { opacity: 1, x: 0 }, fadeRight: { opacity: 1, x: 0 },
  scaleIn: { opacity: 1, scale: 1 }, blur: { opacity: 1, filter: "blur(0px)" },
  clip: { clipPath: "inset(0 0 0% 0)" }, mask: { clipPath: "inset(0% 0 0 0)", y: 0 },
  wipe: { clipPath: "inset(0 0% 0 0)" }, circle: { clipPath: "circle(75% at 50% 50%)" },
  diagonal: { clipPath: "polygon(0 0, 200% 0, 0 200%, 0 0)" },
  flip: { opacity: 1, rotateX: 0, transformPerspective: 900 },
  spring: { opacity: 1, y: 0, scale: 1 },
};

export const revealVariants = (v: RevealVariant, delay = 0): Variants => ({
  hidden: HIDDEN[v],
  visible: {
    ...SHOWN[v],
    transition: v === "spring" ? { ...SPRING, delay } : { duration: DURATION.enter, ease: EASE_BRAND, delay },
  },
});

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  /** false = reverte ao sair da tela (anima de novo ao voltar). */
  once?: boolean;
  className?: string;
  as?: "div" | "section";
}

export const Reveal = ({ children, variant = "fadeUp", delay = 0, once = true, className, as = "div" }: RevealProps) => {
  const Comp = as === "section" ? motion.section : motion.div;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={revealVariants(variant, delay)}
    >
      {children}
    </Comp>
  );
};
