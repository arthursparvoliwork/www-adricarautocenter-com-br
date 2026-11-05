import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE_BRAND } from "@/lib/motion";

/** Fade + wipe vermelho rápido entre rotas (~180ms saída + ~200ms entrada). */
export const PageTransition = ({ children }: { children: ReactNode }) => (
  <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.05, ease: EASE_BRAND } }}
      exit={{ opacity: 0, transition: { duration: 0.18, ease: EASE_BRAND } }}
    >
      {children}
    </motion.div>
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9998] bg-gradient-fire"
      initial={{ scaleX: 1, originX: 1 }}
      animate={{ scaleX: 0, originX: 1, transition: { duration: 0.22, ease: EASE_BRAND } }}
      exit={{ scaleX: 1, originX: 0, transition: { duration: 0.18, ease: EASE_BRAND } }}
    />
  </>
);
