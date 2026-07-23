import { motion, useSpring, useTransform, useScroll } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { ClipboardCheck, Wrench, Cog, SprayCan, Flag } from "lucide-react";

const STAGES = [
  { icon: ClipboardCheck, num: "01", title: "DIAGNÓSTICO", desc: "Scanner OBD-II, análise visual e histórico do veículo. Nada escapa." },
  { icon: Wrench, num: "02", title: "DESMONTAGEM", desc: "Peças abertas com cuidado cirúrgico. Fotos de cada etapa pra você." },
  { icon: Cog, num: "03", title: "REPARO", desc: "Peças originais ou premium. Bancada calibrada, torque no ponto." },
  { icon: SprayCan, num: "04", title: "ACABAMENTO", desc: "Detalhamento, limpeza e teste em pista. Nada sai daqui torto." },
  { icon: Flag, num: "05", title: "ENTREGA", desc: "Relatório completo + garantia. Você acelera com confiança." },
];

/** Horizontal scroll-pinned assembly line — cinematic journey of a car through Adricar. */
export const AssemblyLine = () => {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const edgePadding = window.innerWidth * 0.08;
      setTravel(Math.max(track.scrollWidth - window.innerWidth + edgePadding, 0));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Move only the track's real width. The former -80% transform overshot the
  // cards and left several empty black viewports before the next section.
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const x = useSpring(rawX, { stiffness: 80, damping: 20, mass: 0.5 });
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: travel > 0 ? `calc(100vh + ${Math.ceil(travel * 1.15)}px)` : "220vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center bg-carbon">
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-gradient-radial-glow opacity-20" />

        {/* Header */}
        <div className="container-x relative z-10 mb-12">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-secondary/80 mb-2">
                — Linha de montagem · Adricar
              </div>
              <h2 className="font-display text-3xl sm:text-5xl leading-none">
                <span className="text-foreground">DA CHAVE </span>
                <span className="text-fire">À PISTA.</span>
              </h2>
            </div>
            <div className="text-xs uppercase tracking-[0.3em] text-white/50">
              role para acompanhar →
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-6 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: progressScale, transformOrigin: "left" }}
              className="h-full bg-gradient-fire"
            />
          </div>
        </div>

        {/* Rail with stages */}
        <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-8 pl-[10vw] pr-[10vw] will-change-transform">
          {STAGES.map((s, i) => (
            <div
              key={s.num}
              className="relative flex-shrink-0 w-[80vw] sm:w-[55vw] lg:w-[40vw] aspect-[4/3] rounded-2xl border border-white/10 bg-card/40 backdrop-blur-sm p-8 sm:p-10 overflow-hidden group corner-brackets"
            >
              {/* Big ghost number */}
              <div className="absolute -bottom-8 -right-4 font-display text-[14rem] leading-none text-transparent text-stroke-white opacity-[0.08] select-none pointer-events-none">
                {s.num}
              </div>
              {/* Racing stripe */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-fire opacity-70" />

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono uppercase tracking-[0.3em] text-secondary/80">
                    STAGE {s.num} / 05
                  </div>
                  <div className="mt-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-fire glow-red">
                    <s.icon className="w-8 h-8 text-primary-foreground" strokeWidth={2.4} />
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-4xl sm:text-5xl text-neon-yellow leading-none mb-4">
                    {s.title}
                  </h3>
                  <p className="text-white/70 text-sm sm:text-base max-w-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>

              {/* Connector dot on right (except last) */}
              {i < STAGES.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 w-3 h-3 rounded-full bg-secondary shadow-[0_0_20px_hsl(50_100%_55%/0.8)]" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Bottom ambient line */}
        <div className="absolute bottom-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </section>
  );
};
