import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface BeforeAfterProps {
  before: string;
  after: string;
  alt: string;
  caption?: string;
}

export const BeforeAfter = ({ before, after, alt, caption }: BeforeAfterProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      handleMove(x);
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-2"
    >
      <div
        ref={containerRef}
        className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-primary/30 cursor-ew-resize select-none glow-red"
        onMouseDown={(e) => { setDragging(true); handleMove(e.clientX); }}
        onTouchStart={(e) => { setDragging(true); handleMove(e.touches[0].clientX); }}
      >
        <img src={after} alt={`${alt} — depois`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <img src={before} alt={`${alt} — antes`} className="absolute inset-0 h-full object-cover" style={{ width: `${100 / (position / 100)}%`, maxWidth: "none" }} loading="lazy" />
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">Antes</div>
        <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">Depois</div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 8l-3 2 3 2V8zM15 8l3 2-3 2V8z" />
              <path d="M9 6h2v8H9z" />
            </svg>
          </div>
        </div>
      </div>
      {caption && <p className="text-sm text-center text-muted-foreground italic">{caption}</p>}
    </motion.div>
  );
};
