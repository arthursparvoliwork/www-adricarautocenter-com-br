import { motion } from "framer-motion";
import { Instagram, Play, Heart, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/Magnetic";
import motor from "@/assets/oficina-motor.jpg";
import freios from "@/assets/freios.jpg";
import roda from "@/assets/roda-pneu.jpg";
import mecanico from "@/assets/mecanico-trabalho.jpg";
import escape from "@/assets/escapamentos.jpg";
import diag from "@/assets/diagnostico.jpg";

const IG = "https://instagram.com/adricarautocenter";

const POSTS = [
  { img: motor, cap: "Retífica e motor no ponto", tag: "#motor", reel: true },
  { img: freios, cap: "Freio novo, segurança total", tag: "#freios", reel: false },
  { img: roda, cap: "Alinhamento e cambagem", tag: "#suspensao", reel: true },
  { img: mecanico, cap: "Equipe formada pelo SENAI", tag: "#time", reel: false },
  { img: escape, cap: "Escapamento esportivo", tag: "#performance", reel: true },
  { img: diag, cap: "Scanner e diagnóstico", tag: "#diagnostico", reel: false },
];

/** Vitrine social: puxa o público do site para o Instagram e vice-versa. */
export const InstagramFeed = () => (
  <section id="instagram" className="relative py-20 sm:py-28 overflow-hidden bg-carbon">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-fire" />
    <div className="absolute inset-0 bg-gradient-radial-glow opacity-40" />

    <div className="container mx-auto px-4 relative">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-accent">
            <Instagram className="w-3.5 h-3.5" /> Bastidores
          </span>
          <h2 className="font-display text-3xl sm:text-5xl mt-3 leading-tight">
            O DIA A DIA DA <span className="text-fire">OFICINA</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl">
            Antes e depois, serviços em tempo real e dicas de manutenção. Siga o @adricarautocenter e não perca as
            promoções que só saem por lá.
          </p>
        </div>
        <Magnetic>
          <Button asChild variant="hero" size="lg">
            <a href={IG} target="_blank" rel="noopener noreferrer">
              <Instagram className="w-4 h-4" /> Seguir no Instagram
            </a>
          </Button>
        </Magnetic>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-10">
        {POSTS.map((p, i) => (
          <motion.a
            key={p.cap}
            href={IG}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="group relative aspect-square rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-colors"
          >
            <img
              src={p.img}
              alt={p.cap}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/25 to-transparent" />

            {p.reel && (
              <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/70 backdrop-blur-sm border border-foreground/20 flex items-center justify-center">
                <Play className="w-3.5 h-3.5 text-foreground" />
              </span>
            )}

            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
              <p className="text-xs sm:text-sm font-semibold leading-snug">{p.cap}</p>
              <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground">
                <span className="text-accent font-mono">{p.tag}</span>
                <span className="inline-flex items-center gap-1">
                  <Heart className="w-3 h-3" /> ver no Instagram
                </span>
              </div>
            </div>

            <span className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-4 h-4 text-accent" />
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);
