import { motion } from "framer-motion";
import { MapPin, Star, Navigation, Clock, Phone, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/Magnetic";

const MAPS_REVIEW = "https://www.google.com/maps/search/?api=1&query=Adricar+Centro+Automotivo+Av.+Dona+Belmira+Marin+1670";
const MAPS_DIR = "https://www.google.com/maps/dir/?api=1&destination=Av.+Dona+Belmira+Marin,+1670+S%C3%A3o+Paulo";
const MAPS_EMBED =
  "https://www.google.com/maps?q=Av.+Dona+Belmira+Marin,+1670,+S%C3%A3o+Paulo,+SP&output=embed";

const FACTS = [
  { icon: BadgeCheck, t: "30 anos no Grajaú", s: "Referência em mecânica e suspensão na Zona Sul" },
  { icon: Clock, t: "Seg a Sáb · 08h–18h", s: "Domingo 10h–15h para emergências" },
  { icon: Star, t: "Nota 4,4 no Google", s: "Avaliações reais de clientes da região" },
];

/** Presença local: mapa, rota, avaliações no Google Meu Negócio e áreas atendidas. */
export const LocalPresence = () => (
  <section id="onde-estamos" className="relative py-20 sm:py-28 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-radial-glow opacity-50" />
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-fire" />

    <div className="container mx-auto px-4 relative">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-accent">
            <MapPin className="w-3.5 h-3.5" /> Onde estamos
          </span>
          <h2 className="font-display text-3xl sm:text-5xl mt-3 leading-tight">
            A OFICINA DO <span className="text-fire">GRAJAÚ</span> — <br className="hidden sm:block" />
            NO MAPA E NA RUA.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg">
            Av. Dona Belmira Marin, 1670/1674 — São Paulo/SP. Atendemos Grajaú, Interlagos, Cidade Dutra,
            Parelheiros, Jardim Ângela e região.
          </p>

          <div className="mt-7 space-y-3">
            {FACTS.map((f, i) => (
              <motion.div
                key={f.t}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-4 hover:border-primary/40 transition-colors"
              >
                <span className="shrink-0 w-9 h-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                  <f.icon className="w-4 h-4 text-primary" />
                </span>
                <div>
                  <p className="font-semibold text-sm">{f.t}</p>
                  <p className="text-xs text-muted-foreground">{f.s}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-7">
            <Magnetic>
              <Button asChild variant="hero" size="lg">
                <a href={MAPS_DIR} target="_blank" rel="noopener noreferrer">
                  <Navigation className="w-4 h-4" /> Traçar rota
                </a>
              </Button>
            </Magnetic>
            <Button asChild variant="outline" size="lg">
              <a href={MAPS_REVIEW} target="_blank" rel="noopener noreferrer">
                <Star className="w-4 h-4" /> Ver / avaliar no Google
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <a href="tel:+551126679953">
                <Phone className="w-4 h-4" /> (11) 2667-9953
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden border border-border shadow-2xl"
        >
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-foreground/10 rounded-3xl z-10" />
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-fire z-10" />
          <iframe
            title="Mapa da Adricar Centro Automotivo"
            src={MAPS_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[320px] sm:h-[420px] grayscale-[35%] contrast-[1.05]"
          />
        </motion.div>
      </div>
    </div>
  </section>
);
