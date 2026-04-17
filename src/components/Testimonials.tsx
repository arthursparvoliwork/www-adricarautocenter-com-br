import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Cliente Google",
    text: "Serviço ótimo e os preços que cabem no bolso.",
    stars: 4,
  },
  {
    name: "Cliente Google",
    text: "Mecânica de auto padrão, me atendeu todas as minhas necessidades.",
    stars: 5,
  },
  {
    name: "Cliente Google",
    text: "Um centro automotivo recomendado na região do Grajaú.",
    stars: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container-x relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-secondary/40 bg-secondary/10 mb-6">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-secondary fill-secondary" />
              ))}
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
              4.4 · 64 Avaliações Google
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Quem conhece, <span className="text-fire">recomenda.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="relative bg-card border border-border rounded-2xl p-8 hover:border-primary/60 transition-all hover:-translate-y-2 duration-500 group"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/20 group-hover:text-primary/40 transition-colors" />
              <div className="flex gap-1 mb-4">
                {[...Array(r.stars)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 text-secondary fill-secondary" />
                ))}
              </div>
              <p className="text-lg text-foreground/90 mb-6 leading-relaxed italic">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-gradient-fire flex items-center justify-center font-display text-primary-foreground">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="font-display text-foreground">{r.name}</div>
                  <div className="text-xs text-muted-foreground">Verificado no Google</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
