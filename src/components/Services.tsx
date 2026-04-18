import {
  Wrench, Disc, Droplets, Zap, Cog, Gauge, Wind, Activity,
  Settings, Cpu, CircleDot, Truck, Car, ShieldCheck, Hammer, Battery
} from "lucide-react";
import { VideoBackdrop } from "@/components/VideoBackdrop";

const services = [
  { icon: Wrench, title: "Mecânica Geral", desc: "Manutenção completa para todas as marcas" },
  { icon: CircleDot, title: "Rodas e Pneus", desc: "Pirelli, Michelin, Bridgestone, Firestone" },
  { icon: Droplets, title: "Troca de Óleo", desc: "Óleos sintéticos e semissintéticos" },
  { icon: Wind, title: "Escapamentos", desc: "Reparo, troca e personalização" },
  { icon: Gauge, title: "Alinhamento", desc: "Precisão e segurança na direção" },
  { icon: Disc, title: "Balanceamento", desc: "Conforto e durabilidade dos pneus" },
  { icon: Zap, title: "Elétrica Automotiva", desc: "Diagnóstico e reparo elétrico" },
  { icon: Cpu, title: "Eletrônica Embarcada", desc: "ABS, Air Bag, Rede CAN, ECU" },
  { icon: Wind, title: "Ar Condicionado", desc: "Higienização, gás e manutenção" },
  { icon: Settings, title: "Caixa de Direção", desc: "Hidráulica e elétrica" },
  { icon: Activity, title: "Suspensão", desc: "Estabilidade e absorção de impactos" },
  { icon: ShieldCheck, title: "Sistema de Freios", desc: "Pastilhas, discos e sangria" },
  { icon: Cpu, title: "Injeção Eletrônica", desc: "Scanner, reset e reprogramação" },
  { icon: Cog, title: "Motor e Câmbio", desc: "Retífica, troca e revisão" },
  { icon: Hammer, title: "Cambagem", desc: "Geometria precisa do veículo" },
  { icon: Truck, title: "Correia Dentada", desc: "Troca preventiva e tensionador" },
];

export const Services = () => {
  return (
    <section id="servicos" className="relative py-24 lg:py-32 bg-stripes overflow-hidden">
      <VideoBackdrop overlay={0.88} flip />
      <div className="container-x relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 mb-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Nossos Serviços</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
            Tudo o que seu carro <span className="text-fire">precisa</span>,
            <br />em um só lugar.
          </h2>
          <p className="text-lg text-muted-foreground">
            Especialistas em <span className="text-secondary font-semibold">veículos nacionais e importados</span>.
            Mais de 16 categorias de serviços com equipamentos de última geração.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_hsl(0_100%_50%/0.2)] overflow-hidden"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/0 group-hover:bg-primary/10 blur-2xl rounded-full transition-all duration-500" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-[0_0_20px_hsl(0_100%_50%/0.3)]">
                  <s.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl mb-2 text-foreground group-hover:text-secondary transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <div className="mt-4 h-px w-12 bg-gradient-to-r from-primary to-transparent group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Payment banner */}
        <div className="mt-16 relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-secondary p-8 lg:p-12 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(50_100%_55%/0.4),transparent_50%)]" />
          <div className="relative">
            <div className="text-secondary-foreground/80 uppercase tracking-[0.3em] text-xs font-bold mb-2">
              Facilitamos para você
            </div>
            <div className="font-display text-3xl sm:text-5xl text-primary-foreground mb-2">
              PARCELAMOS EM ATÉ <span className="text-neon-yellow">18x</span> NO CARTÃO
            </div>
            <div className="text-primary-foreground/90 font-semibold">
              Aceitamos Visa · Mastercard · Elo · Pix
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
