import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { STAGGER } from "@/lib/motion";
import { revealVariants, type RevealVariant } from "./Reveal";

/** Container que revela filhos <StaggerItem> em cascata. */
export const Stagger = ({ children, className, once = true, stagger = STAGGER, delay = 0 }:
  { children: ReactNode; className?: string; once?: boolean; stagger?: number; delay?: number }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once, margin: "-60px" }}
    variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className, variant = "fadeUp" }:
  { children: ReactNode; className?: string; variant?: RevealVariant }) => (
  <motion.div className={className} variants={revealVariants(variant)}>{children}</motion.div>
);
