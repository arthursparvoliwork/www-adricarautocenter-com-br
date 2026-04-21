import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

interface AnimatedCounterProps {
  value: string; // ex: "30+", "4.4★", "1000+", "18x"
  duration?: number;
  className?: string;
}

/** Conta de 0 até o número detectado dentro de `value`, preservando sufixos (+, ★, x, etc). */
export const AnimatedCounter = ({ value, duration = 1.6, className }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const target = parseFloat(match[1]);
    const suffix = match[2];
    const isFloat = match[1].includes(".");
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      const cur = target * eased;
      setDisplay(`${isFloat ? cur.toFixed(1) : Math.floor(cur)}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4 }}
    >
      {display}
    </motion.span>
  );
};
