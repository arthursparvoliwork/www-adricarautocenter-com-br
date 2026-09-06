import { motion } from "framer-motion";
import { ShieldCheck, Armchair, Fuel, Flag, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/Magnetic";
import { TiltCard } from "@/components/TiltCard";
import rodaPneu from "@/assets/roda-pneu.jpg";

const perks = [
  { icon: ShieldCheck, title: "Mais segurança", desc: "Pneus e rodas homologados, montagem com torque correto." },
  { icon: Armchair, title: "Mais conforto", desc: "Balanceamento fino: fim da vibração no volante." },
  { icon: Fuel, title: "Maior economia", desc: "Calibragem e geometria certas gastam menos combustível." },
  { icon: Flag, title: "Visual incrível", desc: "Aros 13 a 22, esportivos, low profile e run-flat." },
];

/** Seção Rodas e Pneus — inspirada na arte amarela/preta da Adricar. */
export const WheelsTires = () => {
  return (
    <section id="rodas-e-pneus" className="relative py-24 overflow-hidden border-y border-white/10">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card" />
      <div className="absolute inset-0 tire-tracks opacity-60" />
      <div className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

      <div className="container-x relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block rounded-full border border-secondary/40 bg-secondary/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-secondary">
            Rodas e Pneus
          </span>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.92]">
            <span className="block text-metal">RODAS E PNEUS</span>
            <span className="block text-fire">DO JEITO CERTO.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl">
            Mais que pneus: mais segurança para você. Trabalhamos com Pirelli, Michelin,
            Bridgestone, Firestone e Continental — com montagem, balanceamento e alinhamento
            no mesmo atendimento.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {perks.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <TiltCard className="h-full">
                  <div className="group h-full chamfer border border-border bg-card/80 p-5 transition-colors duration-500 hover:border-secondary/60">
                    <p.icon className="h-6 w-6 text-secondary transition-transform duration-500 group-hover:scale-110" />
                    <h3 className="mt-3 font-display text-lg uppercase tracking-wide text-foreground">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button variant="hero" size="lg" asChild>
                <a
                  href={`https://wa.me/5511985370952?text=${encodeURIComponent("Olá Adricar! Quero orçamento de rodas e pneus.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Orçamento de rodas e pneus
                </a>
              </Button>
            </Magnetic>
            <Link
              to="/servicos/rodas-e-pneus"
              className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-secondary hover:text-secondary/80 transition-colors"
            >
              Ver detalhes do serviço <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <p className="mt-6 brush-strip inline-block text-[11px] font-bold uppercase tracking-wider text-secondary-foreground">
            Qualidade e confiança sempre!
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="absolute -inset-6 bg-gradient-yellow opacity-20 blur-3xl rounded-full" />
          <div className="relative chamfer-lg overflow-hidden border-2 border-secondary/40">
            <img
              src={rodaPneu}
              alt="Rodas esportivas e pneus disponíveis na Adricar Centro Automotivo"
              loading="lazy"
              className="w-full h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <span className="font-display text-2xl text-metal leading-none">
                SEU CARRO EM<br />BOAS MÃOS!
              </span>
              <span className="rounded-lg border border-secondary/50 bg-background/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary backdrop-blur">
                Aro 13 ao 22
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
