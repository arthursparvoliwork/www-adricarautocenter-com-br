import { motion } from "framer-motion";
import { Zap, Cpu, Battery, Fan, Lightbulb, Cog, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/Magnetic";
import { VideoBackdrop } from "@/components/VideoBackdrop";
import mecanico from "@/assets/mecanico-trabalho.jpg";

const items = [
  { icon: Zap, title: "Elétrica automotiva", desc: "Curto, fuga de corrente, chicote e partida." },
  { icon: Cpu, title: "Eletrônica embarcada", desc: "ABS, Air Bag, rede CAN e módulos (ECU)." },
  { icon: Battery, title: "Bateria e alternador", desc: "Teste de carga, troca e correção de consumo." },
  { icon: Fan, title: "Ar-condicionado", desc: "Gás, higienização e reparo do compressor." },
  { icon: Lightbulb, title: "Iluminação", desc: "Faróis, lanternas, setas e revisão de painel." },
  { icon: Cog, title: "Injeção eletrônica", desc: "Limpeza de bicos, sensores e reprogramação." },
];

/** Seção Eletromecânica — base na arte "eletromecânica" da Adricar. */
export const Electromechanical = () => {
  return (
    <section id="eletromecanica" className="relative py-24 overflow-hidden">
      <VideoBackdrop overlay={0.9} source="mechanic" tint="fire" />
      <div className="container-x relative z-10">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -inset-5 bg-gradient-fire opacity-20 blur-3xl rounded-full" />
            <div className="relative chamfer-lg overflow-hidden border-2 border-primary/40 corner-brackets">
              <img
                src={mecanico}
                alt="Especialista em eletromecânica trabalhando na parte elétrica de um veículo"
                loading="lazy"
                className="w-full h-[430px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 chamfer bevel-metal px-5 py-3 text-center">
              <span className="font-display text-lg text-metal">TÉCNICOS FORMADOS PELO SENAI</span>
            </div>
          </motion.div>

          <div>
            <span className="inline-block rounded-full border border-primary/45 bg-primary/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-primary">
              Eletromecânica
            </span>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.92]">
              <span className="block text-metal">ELÉTRICA E ELETRÔNICA</span>
              <span className="block text-fire">SEM ACHISMO.</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              Luz de injeção acesa, carro morrendo, vidro ou trava sem funcionar? Diagnosticamos
              com scanner e multímetro antes de trocar qualquer peça — você paga pelo problema
              resolvido, não pelo chute.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {items.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                  className="group flex gap-3 chamfer border border-border bg-card/85 p-4 backdrop-blur-sm transition-all duration-500 hover:border-primary/60 hover:-translate-y-0.5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/50 shadow-[0_0_18px_hsl(0_100%_50%/0.35)]">
                    <s.icon className="h-5 w-5 text-primary-foreground" />
                  </span>
                  <div>
                    <h3 className="font-display text-base uppercase tracking-wide text-foreground group-hover:text-secondary transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Button variant="hero" size="lg" asChild>
                  <a
                    href={`https://wa.me/5511985370952?text=${encodeURIComponent("Olá Adricar! Preciso de eletromecânica (elétrica/eletrônica) no meu carro.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Falar com um especialista
                  </a>
                </Button>
              </Magnetic>
              <Link
                to="/servicos/eletromecanica"
                className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-secondary hover:text-secondary/80 transition-colors"
              >
                Ver detalhes do serviço <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
