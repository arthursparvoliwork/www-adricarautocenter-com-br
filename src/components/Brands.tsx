const brands = [
  "PIRELLI", "MICHELIN", "BRIDGESTONE", "FIRESTONE", "CONTINENTAL",
  "NAKATA", "SACHS", "TRW", "COFAP", "MAGNETI MARELLI",
  "BARDAHL", "SCAPEX", "MASTRA", "BOSCH", "NGK"
];

export const Brands = () => {
  return (
    <section id="marcas" className="relative py-20 bg-carbon overflow-hidden border-y border-border">
      <div className="container-x mb-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 mb-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Marcas Parceiras</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Trabalhamos com as <span className="text-fire">melhores marcas</span> do mercado
          </h2>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="shrink-0 mx-6 px-8 py-6 border border-border rounded-xl bg-card/50 hover:border-secondary/60 hover:bg-card transition-all group min-w-[200px] flex items-center justify-center"
            >
              <span className="font-display text-xl text-muted-foreground group-hover:text-secondary group-hover:scale-110 transition-all">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
