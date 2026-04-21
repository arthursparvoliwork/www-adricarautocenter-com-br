import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Car } from "lucide-react";

/** Cursor customizado em formato de carro 🏎️ que segue o mouse, gira na direção do movimento e acelera em áreas clicáveis. */
export const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rotation = useMotionValue(0);

  // Smooth follow
  const springX = useSpring(x, { stiffness: 400, damping: 28, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 400, damping: 28, mass: 0.4 });
  const springRot = useSpring(rotation, { stiffness: 200, damping: 20 });

  // Scale up when hovering interactive
  const scale = useTransform(() => (isPointer ? 1.4 : 1));

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-on");

    let lastX = 0;
    let lastY = 0;
    let lastT = performance.now();

    const move = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const speed = Math.hypot(dx, dy) / dt;

      // Only update angle if moving fast enough (avoids jitter when stopped)
      if (speed > 0.05) {
        // Car points "right" by default in our SVG, so 0deg = facing right
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        rotation.set(angle);
      }

      x.set(e.clientX);
      y.set(e.clientY);
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
      setHidden(false);

      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, label");
      setIsPointer(!!interactive);
    };

    const leave = () => setHidden(true);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("custom-cursor-on");
    };
  }, [x, y, rotation]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{ x: springX, y: springY, opacity: hidden ? 0 : 1 }}
    >
      <motion.div
        style={{ rotate: springRot, scale }}
        className="-translate-x-1/2 -translate-y-1/2"
      >
        <div className={`relative transition-colors duration-200 ${isPointer ? "text-secondary" : "text-primary"}`}>
          {/* Glow */}
          <div
            className={`absolute inset-0 blur-md rounded-full transition-opacity ${
              isPointer ? "bg-secondary/60 opacity-80" : "bg-primary/50 opacity-60"
            }`}
          />
          {/* Car icon */}
          <Car className="relative w-7 h-7" strokeWidth={2.5} fill="currentColor" />
        </div>
      </motion.div>
    </motion.div>
  );
};
