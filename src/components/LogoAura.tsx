import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface LogoAuraProps {
  children: ReactNode;
  /** visual scale of the aura relative to the content */
  intensity?: "sm" | "lg";
  className?: string;
}

/**
 * Refined interactive badge: machined frame, light sweep and
 * cursor-reactive depth without competing with the brand mark.
 */
export const LogoAura = ({ children, intensity = "lg", className = "" }: LogoAuraProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const big = intensity === "lg";

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [big ? 5 : 2, big ? -5 : -2]), { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [big ? -7 : -3, big ? 7 : 3]), { stiffness: 150, damping: 20 });
  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

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
      {/* Precision-machined frame */}
      <motion.div
        className={`logo-chassis pointer-events-none absolute ${big ? "-inset-x-[5%] -inset-y-[24%]" : "-inset-x-[10%] -inset-y-[30%]"}`}
        animate={{ opacity: hover ? 1 : 0.78, scale: hover ? 1.012 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        aria-hidden="true"
      >
        <span className="logo-chassis-corner left-0 top-0 border-l-2 border-t-2 border-secondary" />
        <span className="logo-chassis-corner right-0 top-0 border-r-2 border-t-2 border-primary" />
        <span className="logo-chassis-corner bottom-0 left-0 border-b-2 border-l-2 border-primary" />
        <span className="logo-chassis-corner bottom-0 right-0 border-b-2 border-r-2 border-secondary" />

        <div className="absolute left-[9%] right-[9%] top-0 h-px overflow-hidden bg-border/70">
          <motion.span
            className="block h-full w-1/4 bg-gradient-to-r from-transparent via-secondary to-transparent"
            animate={{ x: ["-120%", "500%"] }}
            transition={{ duration: hover ? 1.3 : 4.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="absolute bottom-0 left-[9%] right-[9%] h-px overflow-hidden bg-border/70">
          <motion.span
            className="block h-full w-1/4 bg-gradient-to-r from-transparent via-primary to-transparent"
            animate={{ x: ["500%", "-120%"] }}
            transition={{ duration: hover ? 1.3 : 4.5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {big && (
          <>
            <span className="absolute left-[8%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-secondary shadow-[0_0_12px_hsl(var(--secondary))]" />
            <span className="absolute right-[8%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
            <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-background px-3 font-display text-[9px] uppercase tracking-[0.28em] text-secondary">
              Performance · Precisão · Confiança
            </span>
          </>
        )}
      </motion.div>

      {/* ambient bloom, reacts to hover */}
      <motion.div
        className="pointer-events-none absolute -inset-[12%] blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.12) 48%, transparent 72%)",
        }}
        animate={{ opacity: hover ? 0.9 : 0.42, scale: hover ? 1.04 : 1 }}
        transition={{ duration: 0.5 }}
        aria-hidden="true"
      />

      {/* content with cursor tilt + glare */}
      <motion.div
        className="relative z-10 overflow-hidden"
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        animate={{ scale: hover ? (big ? 1.025 : 1.035) : 1, y: hover ? -2 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
        <motion.div
          className="pointer-events-none absolute inset-0 mix-blend-screen"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) => `radial-gradient(circle at ${x} ${y}, hsl(var(--foreground)/0.28), transparent 38%)`
            ),
            opacity: hover ? 1 : 0,
            transition: "opacity .35s",
          }}
          aria-hidden="true"
        />
        <motion.span
          className="pointer-events-none absolute inset-y-0 w-1/5 -skew-x-12 bg-gradient-to-r from-transparent via-foreground/25 to-transparent"
          animate={{ left: hover ? ["-30%", "120%"] : "-30%" }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
};
