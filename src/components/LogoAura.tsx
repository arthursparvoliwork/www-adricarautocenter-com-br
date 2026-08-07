import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface LogoAuraProps {
  children: ReactNode;
  /** visual scale of the aura relative to the content */
  intensity?: "sm" | "lg";
  className?: string;
}

/**
 * Interactive energy aura: rotating electric ring, lightning arcs,
 * orbiting sparks and a cursor-reactive tilt/glare.
 */
export const LogoAura = ({ children, intensity = "lg", className = "" }: LogoAuraProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 120, damping: 14 });
  const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 120, damping: 14 });
  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  const big = intensity === "lg";
  const arcs = big ? 5 : 3;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        mx.set(0.5);
        my.set(0.5);
      }}
      className={`relative inline-block ${className}`}
      style={{ perspective: 900 }}
    >
      {/* rotating electric ring */}
      <div
        className="pointer-events-none absolute -inset-[12%] rounded-full opacity-60 blur-[2px] animate-spin-slow"
        style={{
          animationDuration: big ? "18s" : "26s",
          background:
            "conic-gradient(from 0deg, transparent 0deg, hsl(var(--secondary)/0.55) 40deg, transparent 90deg, transparent 190deg, hsl(var(--primary)/0.6) 235deg, transparent 290deg)",
          maskImage: "radial-gradient(closest-side, transparent 72%, #000 78%, #000 92%, transparent 96%)",
          WebkitMaskImage: "radial-gradient(closest-side, transparent 72%, #000 78%, #000 92%, transparent 96%)",
        }}
        aria-hidden="true"
      />

      {/* ambient bloom, reacts to hover */}
      <motion.div
        className="pointer-events-none absolute -inset-[18%] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, hsl(var(--primary)/0.35), hsl(var(--secondary)/0.18) 45%, transparent 70%)",
        }}
        animate={{ opacity: hover ? 0.95 : 0.5, scale: hover ? 1.06 : 1 }}
        transition={{ duration: 0.5 }}
        aria-hidden="true"
      />

      {/* lightning arcs */}
      <svg
        className="pointer-events-none absolute -inset-[14%] w-[128%] h-[128%]"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        {Array.from({ length: arcs }).map((_, i) => {
          const rot = (360 / arcs) * i + 12;
          return (
            <motion.path
              key={i}
              d="M100 8 L108 30 L94 34 L106 52 L88 46 L98 70"
              stroke={i % 2 ? "hsl(var(--secondary))" : "hsl(var(--primary))"}
              strokeWidth={big ? 1.4 : 1.8}
              strokeLinecap="round"
              style={{ transformOrigin: "100px 100px", filter: "drop-shadow(0 0 6px currentColor)" }}
              transform={`rotate(${rot} 100 100)`}
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: [0, 0.9, 0, 0], pathLength: [0, 1, 1, 1] }}
              transition={{
                duration: hover ? 1.4 : 2.6,
                repeat: Infinity,
                delay: i * (hover ? 0.18 : 0.42),
                ease: "easeOut",
              }}
            />
          );
        })}
      </svg>

      {/* orbiting sparks */}
      {Array.from({ length: big ? 3 : 2 }).map((_, i) => (
        <div
          key={i}
          className="pointer-events-none absolute inset-0 animate-spin-slow"
          style={{ animationDuration: `${8 + i * 5}s`, animationDirection: i % 2 ? "reverse" : "normal" }}
          aria-hidden="true"
        >
          <span
            className="absolute left-1/2 top-0 block rounded-full bg-secondary"
            style={{
              width: big ? 6 : 4,
              height: big ? 6 : 4,
              boxShadow: "0 0 12px 3px hsl(var(--secondary)/0.8)",
            }}
          />
        </div>
      ))}

      {/* content with cursor tilt + glare */}
      <motion.div className="relative" style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
        {children}
        <motion.div
          className="pointer-events-none absolute inset-0 mix-blend-overlay"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) => `radial-gradient(circle at ${x} ${y}, hsl(var(--foreground)/0.35), transparent 45%)`
            ),
            opacity: hover ? 1 : 0,
            transition: "opacity .35s",
          }}
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
};
