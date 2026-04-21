import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Velocímetro animado de 0 a 200 km/h com ponteiro + display digital. */
export const Speedometer = ({ to = 200, label = "PERFORMANCE" }: { to?: number; label?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(0);
  const angle = useMotionValue(-120);

  useEffect(() => {
    if (!inView) return;
    const targetAngle = -120 + (240 * to) / 240; // 0..240 km/h scale → -120..120 deg
    const a = animate(angle, targetAngle, {
      duration: 2.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        const kmh = Math.round(((v + 120) / 240) * 240);
        setDisplay(kmh);
      },
    });
    return () => a.stop();
  }, [inView, to, angle]);

  // Tick marks (every 20 km/h from 0 to 240)
  const ticks = Array.from({ length: 13 }, (_, i) => i * 20);

  return (
    <div ref={ref} className="relative w-full max-w-xs mx-auto select-none">
      <svg viewBox="0 0 200 130" className="w-full h-auto">
        {/* Outer arc */}
        <defs>
          <linearGradient id="speedo-grad" x1="0" x2="1">
            <stop offset="0%" stopColor="hsl(50 100% 55%)" />
            <stop offset="60%" stopColor="hsl(15 100% 55%)" />
            <stop offset="100%" stopColor="hsl(0 100% 55%)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background arc */}
        <path
          d="M 20 110 A 80 80 0 0 1 180 110"
          fill="none"
          stroke="hsl(0 0% 18%)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Foreground arc (animated stroke-dashoffset) */}
        <motion.path
          d="M 20 110 A 80 80 0 0 1 180 110"
          fill="none"
          stroke="url(#speedo-grad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="251"
          initial={{ strokeDashoffset: 251 }}
          animate={inView ? { strokeDashoffset: 251 - (251 * to) / 240 } : {}}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          filter="url(#glow)"
        />

        {/* Tick marks */}
        {ticks.map((t) => {
          const a = (-120 + (240 * t) / 240) * (Math.PI / 180);
          const inner = 65;
          const outer = 76;
          const x1 = 100 + Math.sin(a) * inner;
          const y1 = 110 - Math.cos(a) * inner;
          const x2 = 100 + Math.sin(a) * outer;
          const y2 = 110 - Math.cos(a) * outer;
          return (
            <line
              key={t}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={t >= 180 ? "hsl(0 100% 60%)" : "hsl(0 0% 50%)"}
              strokeWidth={t % 40 === 0 ? 2 : 1}
            />
          );
        })}

        {/* Needle */}
        <motion.g style={{ rotate: angle, transformOrigin: "100px 110px" }}>
          <line x1="100" y1="110" x2="100" y2="40" stroke="hsl(0 100% 55%)" strokeWidth="3" strokeLinecap="round" filter="url(#glow)" />
          <circle cx="100" cy="110" r="6" fill="hsl(50 100% 55%)" />
          <circle cx="100" cy="110" r="3" fill="hsl(0 0% 5%)" />
        </motion.g>
      </svg>

      {/* Digital display */}
      <div className="text-center -mt-2">
        <div className="font-display text-5xl text-fire tabular-nums leading-none">
          {display}
          <span className="text-base text-muted-foreground ml-1">km/h</span>
        </div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-secondary mt-1">{label}</div>
      </div>
    </div>
  );
};
