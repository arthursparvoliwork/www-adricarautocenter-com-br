import { motion, useScroll, useSpring } from "framer-motion";

/** Barra fina no topo da página indicando progresso de scroll. */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[9997] bg-gradient-to-r from-primary to-secondary pointer-events-none"
    />
  );
};
