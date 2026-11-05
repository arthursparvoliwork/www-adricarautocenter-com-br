import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/useMotionPrefs";

const BRANDS = [
  "TOYOTA", "VOLKSWAGEN", "FORD", "CHEVROLET", "HONDA", "FIAT",
  "HYUNDAI", "RENAULT", "PEUGEOT", "NISSAN", "JEEP", "BMW",
  "MERCEDES", "AUDI", "MITSUBISHI", "KIA", "CITROËN", "SENAI",
];
const BASE_SPEED = 2.5; // % da largura por segundo
const wrap = (min: number, max: number, v: number) => ((((v - min) % (max - min)) + (max - min)) % (max - min)) + min;

/** Marquee de marcas: acelera com a velocidade do scroll e pausa no hover. */
export const BrandMarquee = () => {
  const reduced = usePrefersReducedMotion();
  const base = useMotionValue(0);
  const hovered = useRef(false);
  const dir = useRef(-1);
  const { scrollY } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(vel, [-2000, 0, 2000], [-5, 0, 5], { clamp: false });
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced || hovered.current) return;
    const f = factor.get();
    if (f < 0) dir.current = 1;
    else if (f > 0) dir.current = -1;
    base.set(base.get() + dir.current * BASE_SPEED * (delta / 1000) * (1 + Math.abs(f)));
  });

  const loop = [...BRANDS, ...BRANDS];
  return (
    <div
      className="relative py-10 border-y border-border bg-card/40 overflow-hidden"
      onMouseEnter={() => (hovered.current = true)}
      onMouseLeave={() => (hovered.current = false)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      <motion.div className="flex gap-12 whitespace-nowrap w-max" style={{ x }}>
        {loop.map((b, i) => (
          <div key={i} className="flex items-center gap-12 shrink-0">
            <span className="font-display text-2xl sm:text-3xl tracking-[0.15em] text-foreground/30 hover:text-secondary transition-colors">{b}</span>
            <span className="w-2 h-2 rounded-full bg-primary/60" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
