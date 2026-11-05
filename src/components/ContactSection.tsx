import { useEffect, useState } from "react";
import { MapPin, Phone, Clock, Navigation, Instagram, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuoteForm } from "@/components/QuoteForm";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion";
import { getShopStatus } from "@/lib/hours";

const MAP_EMBED = "https://www.google.com/maps?q=Av.+Dona+Belmira+Marin,+1670,+S%C3%A3o+Paulo,+SP&output=embed";

/** Contato + localização num bloco só: formulário, mapa e horário. */
export const ContactSection = () => {
  const [status, setStatus] = useState(getShopStatus);
  useEffect(() => {
    const id = setInterval(() => setStatus(getShopStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="contato" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial-glow opacity-30" aria-hidden="true" />
      <div className="container-x relative z-10">
        <SectionHeading
          kicker="Contato · Onde estamos"
          title="Traga seu carro. | *A* *gente* *resolve.*"
          sub="Peça seu orçamento pelo formulário ou venha direto: Av. Dona Belmira Marin, 1670 — Grajaú, São Paulo."
        />

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Reveal variant="fadeLeft"><QuoteForm /></Reveal>

          <Reveal variant="fadeRight" className="space-y-5">
            <div id="onde-estamos" className="card-metal overflow-hidden p-0">
              <iframe
                title="Mapa da Adricar Centro Automotivo"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-72 border-0 grayscale-[30%]"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="card-metal p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-secondary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary">Horário</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${status.open ? "bg-whatsapp" : "bg-muted-foreground"}`} />
                  <span className="font-semibold">{status.label}</span>
                </div>
                <p className="text-sm text-muted-foreground">Seg a Sáb: 08h às 18h<br />Domingo: 10h às 15h</p>
              </div>
              <div className="card-metal p-5">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-secondary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary">Endereço</span>
                </div>
                <p className="text-sm text-foreground/90">Av. Dona Belmira Marin, 1670/1674<br />Parque Brasil — Grajaú, SP</p>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <Star className="w-4 h-4 fill-secondary text-secondary" /> <span className="font-semibold">4,4 no Google</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="hero" asChild>
                <a href="https://www.google.com/maps/dir/?api=1&destination=Av.+Dona+Belmira+Marin,+1670,+S%C3%A3o+Paulo,+SP" target="_blank" rel="noopener noreferrer">
                  <Navigation className="w-4 h-4" /> Traçar rota
                </a>
              </Button>
              <Button variant="outlineNeon" asChild>
                <a href="tel:+551126679953"><Phone className="w-4 h-4" /> (11) 2667-9953</a>
              </Button>
              <Button variant="ghost" asChild>
                <a href="https://instagram.com/adricarautocenter" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-4 h-4" /> @adricarautocenter
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
