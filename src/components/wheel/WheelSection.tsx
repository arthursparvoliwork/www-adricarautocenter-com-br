import { lazy, Suspense, useRef, useState } from "react";
import { motion, useInView, useMotionValueEvent, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { CircleDot, Disc, ShieldCheck, Gauge } from "lucide-react";
import { useRichMotion } from "@/hooks/useMotionPrefs";
import { DURATION, EASE_BRAND } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Spotlight } from "@/components/Spotlight";
import { WHEEL_STEPS, stepFor } from "./wheelMath";
import rodaImg from "@/assets/roda-pneu.jpg";

const WheelCanvas = lazy(() => import("./WheelCanvas"));

const DETAILS = [
  { icon: CircleDot, text: "Pirelli, Michelin, Bridgestone e Firestone. Montagem e calibragem na hora." },
  { icon: Disc, text: "Rodas de liga: desempeno, troca e o jogo completo com instalação." },
  { icon: ShieldCheck, text: "Pastilhas, discos e pinças revisados — frenagem segura e silenciosa." },
  { icon: Gauge, text: "Alinhamento computadorizado e balanceamento eletrônico de precisão." },
];

/** Seção assinatura: roda 3D que gira com o scroll + textos sincronizados. */
export const WheelSection = () => {
  const ref = useRef<HTMLElement>(null);
  const rich = useRichMotion();
  const near = useInView(ref, { margin: "400px 0px" });
  const visible = useInView(ref, { margin: "0px" });
  const [mounted3D, setMounted3D] = useState(false);
  if (rich && near && !mounted3D) setMounted3D(true);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [step, setStep] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => setStep(stepFor(p)));
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} id="rodas" className={rich ? "relative h-[320vh]" : "relative py-24"}>
      <div className={rich ? "sticky top-0 h-screen flex items-center overflow-hidden" : "relative"}>
        {rich && <Spotlight />}
        <div className="container-x relative z-10 grid lg:grid-cols-2 gap-10 items-center w-full">
          <div className="relative aspect-square max-h-[78vh] w-full">
            {rich && mounted3D ? (
              <Suspense fallback={<img src={rodaImg} alt="" className="w-full h-full object-cover chamfer-lg opacity-40" />}>
                <WheelCanvas progress={scrollYProgress} active={visible} />
              </Suspense>
            ) : (
              <motion.img
                src={rodaImg}
                alt="Roda e pneu na oficina Adricar"
                loading="lazy"
                decoding="async"
                style={{ y: imgY }}
                className="w-full h-full object-cover chamfer-lg"
              />
            )}
          </div>

          <div>
            <SectionHeading align="left" kicker="Rodas & Pneus · Alinhamento" title="Do pneu ao *freio,* | peça por peça." className="mb-8" />
            <ol className="space-y-3">
              {WHEEL_STEPS.map((s, i) => {
                const on = !rich || i === step;
                return (
                  <li key={s} className={`card-metal p-5 transition-[border-color,opacity] duration-300 ${on ? "border-primary/70 opacity-100" : "opacity-40"}`}>
                    <div className="flex items-center gap-4">
                      <span className="font-display text-3xl text-fire tabular-nums w-12">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-display text-xl">{s}</span>
                    </div>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: DURATION.enter, ease: EASE_BRAND }}
                          className="text-muted-foreground pl-16 overflow-hidden"
                        >
                          {DETAILS[i].text}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};
