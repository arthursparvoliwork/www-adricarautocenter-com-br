import { Button } from "@/components/ui/button";
import { ArrowRight, Wrench, Shield, Award } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import engineHeroMeta from "@/assets/engine-hero-bg.mp4.asset.json";

export const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroCar}
          className="w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src={engineHeroMeta.url} type="video/mp4" />
        </video>
        {/* Dark overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/70" />
        <div className="absolute inset-0 bg-background/30" />
      </div>

      {/* Speed line accent */}
      <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent opacity-60" />
      <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      <div className="container-x relative z-10 grid lg:grid-cols-2 gap-12 items-center py-16">
        <div className="space-y-8 animate-fade-in">
          {/* Badge 30 anos */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-secondary/40 bg-secondary/10 backdrop-blur-sm">
            <Award className="w-4 h-4 text-secondary" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">
              30 Anos de Tradição
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-tight">
            <span className="block text-foreground">SEU CARRO</span>
            <span className="block text-fire">MERECE O</span>
            <span className="block text-neon-yellow">MELHOR.</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
            Centro automotivo completo no Grajaú — São Paulo. Mecânica geral, injeção
            eletrônica, freios, suspensão, rodas e pneus para nacionais e importados.
            <span className="text-secondary font-semibold"> Equipamentos modernos. Equipe especialista.</span>
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="xl" asChild>
              <a href="https://wa.me/5511985370952" target="_blank" rel="noopener">
                Agende sua Revisão
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="outlineNeon" size="xl" asChild>
              <a href="#servicos">Ver Serviços</a>
            </Button>
          </div>

          {/* Mini features */}
          <div className="flex flex-wrap gap-6 pt-4">
            {[
              { icon: Wrench, label: "Mecânica Geral" },
              { icon: Shield, label: "Garantia em Serviços" },
              { icon: Award, label: "Parcelamos em 18x" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-2 text-sm text-foreground/80">
                <f.icon className="w-4 h-4 text-primary" />
                <span className="font-semibold">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Side stats card */}
        <div className="hidden lg:flex justify-end animate-scale-in">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-fire opacity-20 blur-3xl rounded-full" />
            <div className="relative grid grid-cols-2 gap-4 max-w-md">
              {[
                { num: "30+", label: "Anos no Mercado" },
                { num: "4.4★", label: "Google Reviews" },
                { num: "1000+", label: "Clientes Atendidos" },
                { num: "18x", label: "no Cartão" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="bg-card/80 backdrop-blur-md border border-border rounded-xl p-6 hover:border-primary/60 transition-all duration-500 hover:-translate-y-1"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="font-display text-4xl text-fire mb-1">{s.num}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float hidden md:flex flex-col items-center gap-2 text-secondary/70">
        <span className="text-[10px] uppercase tracking-[0.3em]">Role para baixo</span>
        <div className="w-px h-12 bg-gradient-to-b from-secondary to-transparent" />
      </div>
    </section>
  );
};
