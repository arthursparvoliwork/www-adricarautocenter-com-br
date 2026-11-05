import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowUp } from "lucide-react";

const R = 20;

/** Voltar ao topo com anel de progresso de scroll. */
export const BackToTop = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 800));

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
          aria-label="Voltar ao topo"
          className="group fixed left-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] md:bottom-6 md:left-6 z-40 h-12 w-12 rounded-full bg-card/90 backdrop-blur border border-border flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        >
          <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" aria-hidden="true">
            <circle cx="24" cy="24" r={R} fill="none" stroke="hsl(var(--border))" strokeWidth="2.5" />
            <motion.circle cx="24" cy="24" r={R} fill="none" stroke="hsl(var(--secondary))" strokeWidth="2.5" strokeLinecap="round" style={{ pathLength: scrollYProgress }} />
          </svg>
          <ArrowUp className="relative h-4 w-4 text-foreground transition-transform duration-200 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
