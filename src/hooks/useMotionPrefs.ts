import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** true em dispositivos de toque (sem hover fino). */
export const useIsTouch = () => {
  const q = "(hover: none), (pointer: coarse)";
  const [touch, setTouch] = useState(() => typeof window !== "undefined" && window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setTouch(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return touch;
};

export const usePrefersReducedMotion = () => !!useReducedMotion();

/** Desliga partículas, tilt e magnetic no toque ou com reduced motion. */
export const useRichMotion = () => {
  const touch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  return !touch && !reduced;
};
