import { useState } from "react";
import oficina from "@/assets/oficina-motor.jpg";
import escapamentos from "@/assets/escapamentos.jpg";
import mecanico from "@/assets/mecanico-trabalho.jpg";
import roda from "@/assets/roda-pneu.jpg";
import freios from "@/assets/freios.jpg";
import diagnostico from "@/assets/diagnostico.jpg";
import { Lightbox } from "@/components/Lightbox";
import { ZoomIn } from "lucide-react";

const items = [
  { src: mecanico, label: "Mão de obra especializada", category: "Mecânica" },
  { src: oficina, label: "Diagnóstico de motor", category: "Injeção" },
  { src: roda, label: "Rodas e pneus premium", category: "Pneus" },
  { src: escapamentos, label: "Estoque de escapamentos", category: "Escape" },
  { src: freios, label: "Sistema de freios", category: "Freios" },
  { src: diagnostico, label: "Scanner automotivo", category: "Diagnóstico" },
];

export const Gallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="galeria" className="relative py-24 lg:py-32">
      <div className="container-x">
        <div className="max-w-3xl mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 mb-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Nossa Oficina</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Trabalho de <span className="text-fire">verdade.</span>
            <br />Resultado <span className="text-neon-yellow">garantido.</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-4">Clique em qualquer foto para ampliar.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {items.map((it, i) => (
            <button
              key={it.label}
              onClick={() => setLightbox(i)}
              aria-label={`Ampliar foto: ${it.label}`}
              className={`group relative overflow-hidden rounded-2xl border border-border hover:border-primary/60 transition-all duration-500 text-left ${
                i === 0 ? "lg:col-span-2 lg:row-span-2 aspect-square lg:aspect-auto" : "aspect-square"
              }`}
            >
              <img
                src={it.src}
                alt={it.label}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-75 transition-all">
                <ZoomIn className="w-4 h-4 text-secondary" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                <div className="text-[10px] uppercase tracking-[0.3em] text-secondary font-bold mb-1">
                  {it.category}
                </div>
                <div className="font-display text-lg lg:text-2xl text-foreground">{it.label}</div>
                <div className="h-0.5 w-0 group-hover:w-16 bg-primary mt-2 transition-all duration-500" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        images={items}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndexChange={setLightbox}
      />
    </section>
  );
};
