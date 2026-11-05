import { useEffect } from "react";

const MAX_TILT = 6;

/**
 * Listener único (delegado) para todos os `.card-metal`:
 * - spotlight: --x/--y seguem o cursor
 * - `.card-metal-hover`: tilt 3D (máx 6°) + sombra dinâmica, só desktop sem reduced motion
 */
export const CardFx = () => {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches) return;
    let current: HTMLElement | null = null;
    let raf = 0;

    const reset = (el: HTMLElement) => {
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
      el.style.removeProperty("--sx");
      el.style.removeProperty("--sy");
    };

    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.(".card-metal") as HTMLElement | null;
      if (current && current !== card) reset(current);
      current = card;
      if (!card) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty("--x", `${px * 100}%`);
        card.style.setProperty("--y", `${py * 100}%`);
        if (!reduced.matches && card.classList.contains("card-metal-hover")) {
          const ry = (px - 0.5) * 2 * MAX_TILT;
          const rx = -(py - 0.5) * 2 * MAX_TILT;
          card.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
          card.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
          card.style.setProperty("--sx", `${(ry * 2).toFixed(1)}`);
          card.style.setProperty("--sy", `${(rx * -2).toFixed(1)}`);
        }
      });
    };
    const onLeave = () => {
      if (current) reset(current);
      current = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return null;
};
