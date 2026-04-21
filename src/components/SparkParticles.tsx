import { useEffect, useRef } from "react";

/** Canvas com fagulhas/brasas subindo (efeito oficina/solda). Pausa quando off-screen. */
export const SparkParticles = ({ density = 50 }: { density?: number }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; hue: number };
    const particles: P[] = [];

    const spawn = (): P => {
      const r = canvas.getBoundingClientRect();
      const hue = Math.random() < 0.5 ? 10 + Math.random() * 20 : 45 + Math.random() * 15;
      return {
        x: Math.random() * r.width,
        y: r.height + 10,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -0.4 - Math.random() * 1.4,
        life: 0,
        max: 80 + Math.random() * 120,
        size: 1 + Math.random() * 2.2,
        hue,
      };
    };

    for (let i = 0; i < density; i++) particles.push(spawn());

    const tick = () => {
      if (!running) return;
      const r = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.005;
        p.life++;
        const alpha = Math.max(0, 1 - p.life / p.max);
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 55%, ${alpha})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        if (p.life >= p.max || p.y < -10) particles[i] = spawn();
      }
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
      if (running) raf = requestAnimationFrame(tick);
      else cancelAnimationFrame(raf);
    });
    io.observe(canvas);

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};
