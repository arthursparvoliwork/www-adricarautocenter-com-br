import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Cursor customizado com efeito magnético/chama em áreas clicáveis. Desativado em touch devices. */
export const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 35 });
  const springY = useSpring(y, { stiffness: 500, damping: 35 });

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-on");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
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
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{ x: springX, y: springY, opacity: hidden ? 0 : 1 }}
      >
        <div
          className={`relative -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
            isPointer ? "w-12 h-12" : "w-4 h-4"
          }`}
        >
          <div
            className={`absolute inset-0 rounded-full border-2 border-white ${
              isPointer ? "bg-white/10" : "bg-white"
            }`}
          />
        </div>
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{ x, y, opacity: hidden ? 0 : 0.6 }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
            isPointer
              ? "w-20 h-20 bg-[radial-gradient(circle,hsl(0_100%_55%/0.5)_0%,transparent_70%)] blur-md"
              : "w-8 h-8 bg-[radial-gradient(circle,hsl(50_100%_55%/0.4)_0%,transparent_70%)]"
          }`}
        />
      </motion.div>
    </>
  );
};
