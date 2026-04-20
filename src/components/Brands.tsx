import { GraduationCap, Award } from "lucide-react";
import senaiLogo from "@/assets/senai-logo.png";
import { VideoBackdrop } from "@/components/VideoBackdrop";

const brands = [
  "PIRELLI", "MICHELIN", "BRIDGESTONE", "FIRESTONE", "CONTINENTAL",
  "NAKATA", "SACHS", "TRW", "COFAP", "MAGNETI MARELLI",
  "BARDAHL", "SCAPEX", "MASTRA", "BOSCH", "NGK"
];

export const Brands = () => {
  return (
    <section id="marcas" className="relative py-20 overflow-hidden border-y border-white/10">
      <VideoBackdrop overlay={0.92} source="workshop" tint="fire" />
      {/* Top white accent line */}
      <div className="absolute top-0 inset-x-0 accent-line-white z-10" />
      <div className="container-x mb-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 mb-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Marcas Parceiras</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Trabalhamos com as <span className="text-fire">melhores marcas</span> do mercado
          </h2>
        </div>
      </div>

      {/* SENAI – Parceiro principal de formação */}
      <div className="container-x mb-14 relative z-10">
        <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border-2 border-primary/40 bg-gradient-to-br from-card/90 via-card/95 to-background/95 backdrop-blur-sm p-8 sm:p-10 group hover:border-primary transition-all corner-brackets">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/10 blur-3xl rounded-full" />

          <div className="relative flex flex-col sm:flex-row items-center gap-8">
            <a
              href="https://www.sp.senai.br"
              target="_blank"
              rel="noopener"
              className="shrink-0 group/logo"
              aria-label="SENAI – Serviço Nacional de Aprendizagem Industrial"
            >
              <div className="relative bg-white rounded-2xl p-4 shadow-[0_0_40px_hsl(0_100%_55%/0.4)] group-hover/logo:scale-105 transition-transform">
                <img
                  src={senaiLogo}
                  alt="SENAI – Serviço Nacional de Aprendizagem Industrial"
                  className="w-40 sm:w-48 h-auto object-contain"
                  width={192}
                  height={60}
                  loading="lazy"
                />
              </div>
            </a>

            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/40 bg-primary/10 mb-3">
                <GraduationCap className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  Parceiro Oficial de Formação
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl mb-3 text-foreground">
                Equipe formada pelo <span className="text-fire">SENAI</span>
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Nossos mecânicos têm formação técnica certificada pelo SENAI — referência
                nacional em capacitação automotiva. Conhecimento técnico de verdade,
                aplicado ao seu carro com precisão e responsabilidade.
              </p>
              <div className="flex flex-wrap gap-3 mt-4 justify-center sm:justify-start">
                <span className="inline-flex items-center gap-1.5 text-xs text-secondary font-semibold">
                  <Award className="w-3.5 h-3.5" /> Mecânica Geral
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-secondary font-semibold">
                  <Award className="w-3.5 h-3.5" /> Injeção Eletrônica
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-secondary font-semibold">
                  <Award className="w-3.5 h-3.5" /> Diagnóstico Automotivo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative z-10">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="shrink-0 mx-6 px-8 py-6 border border-white/10 rounded-xl bg-card/60 backdrop-blur-sm hover:border-secondary/60 hover:bg-card transition-all group min-w-[200px] flex items-center justify-center"
            >
              <span className="font-display text-xl text-muted-foreground group-hover:text-secondary group-hover:scale-110 transition-all">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom white accent */}
      <div className="absolute bottom-0 inset-x-0 accent-line-white z-10" />
    </section>
  );
};
