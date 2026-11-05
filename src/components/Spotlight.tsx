import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRichMotion } from "@/hooks/useMotionPrefs";

/** Spotlight suave que segue o cursor dentro do pai (só desktop, sem reduced motion). */
export const Spotlight = () => {
  const rich = useRichMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!rich || !parent) return;
    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      x.set(e.clientX - r.left - 300);
      y.set(e.clientY - r.top - 300);
    };
    parent.addEventListener("pointermove", onMove);
    return () => parent.removeEventListener("pointermove", onMove);
  }, [rich, x, y]);

  if (!rich) return null;
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
      <motion.div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-radial-glow opacity-70" style={{ x: sx, y: sy }} />
    </div>
  );
};
