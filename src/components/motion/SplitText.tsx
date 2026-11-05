import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DURATION, EASE_BRAND, STAGGER } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useMotionPrefs";

type Effect = "mask" | "blur" | "fadeUp" | "scramble";
interface Props {
  text: string;
  by?: "char" | "word" | "line";
  effect?: Effect;
  className?: string;
  delay?: number;
  /** anima no mount em vez de ao entrar na viewport */
  immediate?: boolean;
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&";

const Scramble = ({ text, className, active }: { text: string; className?: string; active: boolean }) => {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const total = text.length * 3;
    const id = setInterval(() => {
      frame++;
      setOut(text.split("").map((c, i) => (c === " " || i < frame / 3 ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join(""));
      if (frame >= total) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [active, text]);
  return <span className={className} aria-label={text}>{out}</span>;
};

/** Títulos animados por caractere, palavra ou linha (linhas separadas por \n). */
export const SplitText = ({ text, by = "word", effect = "mask", className, delay = 0, immediate }: Props) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = usePrefersReducedMotion();
  const active = immediate || inView;

  if (reduced) return <span className={className}>{text}</span>;
  if (effect === "scramble") return <span ref={ref}><Scramble text={text} className={className} active={active} /></span>;

  const pieces = by === "line" ? text.split("\n") : by === "word" ? text.split(" ") : Array.from(text);
  const hidden =
    effect === "mask" ? { y: "110%" } : effect === "blur" ? { opacity: 0, filter: "blur(10px)" } : { opacity: 0, y: 24 };
  const shown = effect === "mask" ? { y: "0%" } : effect === "blur" ? { opacity: 1, filter: "blur(0px)" } : { opacity: 1, y: 0 };

  return (
    <span ref={ref} className={className} aria-label={text}>
      {pieces.map((p, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={by === "line" ? "block overflow-hidden" : "inline-block overflow-hidden align-bottom"}
        >
          <motion.span
            className="inline-block"
            initial={hidden}
            animate={active ? shown : hidden}
            transition={{ duration: DURATION.enter, ease: EASE_BRAND, delay: delay + i * STAGGER }}
          >
            {p === " " ? "\u00A0" : p}
          </motion.span>
          {by === "word" && i < pieces.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </span>
  );
};
