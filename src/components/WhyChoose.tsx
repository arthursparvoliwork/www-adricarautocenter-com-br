import { Trophy, Clock4, Wrench, Shield, CreditCard, MapPinned } from "lucide-react";

const stats = [
  { num: "30+", label: "Anos no mercado", desc: "Tradição que cuida do seu carro desde 1994" },
  { num: "16+", label: "Categorias de serviço", desc: "Tudo o que seu veículo precisa em um só lugar" },
  { num: "4.4★", label: "Avaliação Google", desc: "Mais de 64 avaliações reais de clientes" },
  { num: "18x", label: "No cartão", desc: "Parcele todos os serviços sem dor de cabeça" },
];

const reasons = [
  { icon: Trophy, title: "Equipe SENAI", desc: "Mecânicos com formação técnica certificada." },
  { icon: Wrench, title: "Equipamentos modernos", desc: "Scanner automotivo e ferramentas de última geração." },
  { icon: Shield, title: "Garantia em serviços", desc: "Trabalhamos com garantia em peças e mão de obra." },
  { icon: Clock4, title: "Aberto aos domingos", desc: "Horário estendido para sua comodidade." },
  { icon: CreditCard, title: "Parcelamos em 18x", desc: "Visa, Master, Elo e Pix aceitos." },
  { icon: MapPinned, title: "Fácil acesso", desc: "Av. Dona Belmira Marin, no Grajaú — ZS de SP." },
];

export const WhyChoose = () => {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-carbon">
      {/* White accent rails (top + bottom) */}
      <div className="absolute top-0 inset-x-0 accent-line-white" />
      <div className="absolute bottom-0 inset-x-0 accent-line-white" />

      {/* Tire tracks pattern */}
      <div className="absolute inset-0 tire-tracks opacity-60 pointer-events-none" />

      <div className="container-x relative z-10">
        {/* Stats strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="relative group bg-gradient-to-br from-card to-background border border-white/10 hover:border-primary/60 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              {/* Number stripe accent */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-secondary to-primary opacity-60 group-hover:opacity-100 transition-opacity" />
              {/* Speed lines white */}
              <div className="absolute top-2 right-2 flex flex-col gap-0.5 opacity-30">
                <span className="w-6 h-px bg-white" />
                <span className="w-4 h-px bg-white" />
                <span className="w-2 h-px bg-white" />
              </div>
              <div className="font-display text-5xl lg:text-6xl text-fire mb-1 leading-none">{s.num}</div>
              <div className="font-display text-sm uppercase tracking-wider text-foreground mb-2">{s.label}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/80">Diferenciais</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Por que escolher a <span className="text-fire">Adricar</span>?
          </h2>
        </div>

        {/* Reasons grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="group relative flex items-start gap-4 p-6 rounded-2xl bg-card/70 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-all hover:-translate-y-1 duration-500 overflow-hidden"
            >
              {/* corner racing flag accent */}
              <div className="absolute top-0 right-0 w-12 h-12 opacity-20 group-hover:opacity-60 transition-opacity"
                style={{
                  backgroundImage:
                    "repeating-conic-gradient(hsl(0 0% 100%) 0deg 90deg, hsl(0 0% 0%) 90deg 180deg)",
                  backgroundSize: "8px 8px",
                  clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                }}
              />
              <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-fire flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform">
                <r.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg text-foreground mb-1">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
