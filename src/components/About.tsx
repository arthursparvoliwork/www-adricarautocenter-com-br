import { CheckCircle2, Users, Wrench, MapPin } from "lucide-react";
import oficina from "@/assets/oficina-motor.jpg";

export const About = () => {
  return (
    <section id="sobre" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial-glow opacity-50 pointer-events-none"
        style={{ background: "radial-gradient(circle at right, hsl(0 90% 30% / 0.15) 0%, transparent 60%)" }} />

      <div className="container-x grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-fire opacity-30 blur-2xl rounded-2xl" />
          <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30">
            <img
              src={oficina}
              alt="Mecânico trabalhando em motor na Adricar"
              loading="lazy"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-secondary text-secondary-foreground font-display text-2xl px-6 py-3 rounded-lg inline-block">
                DIAGNÓSTICO PRECISO
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -top-6 -right-6 bg-primary text-primary-foreground rounded-2xl p-6 glow-red animate-float">
            <div className="font-display text-5xl leading-none">30</div>
            <div className="text-xs uppercase tracking-wider mt-1">Anos</div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Sobre Nós</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Referência em mecânica no <span className="text-fire">Grajaú</span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            A <span className="text-secondary font-semibold">Auto Center Adricar</span> é referência como
            oficina mecânica no Grajaú — Zona Sul de São Paulo, atendendo também Parque Grajaú e Jardim
            Castro Alves. Especialistas em mecânica automotiva completa para veículos
            <span className="text-foreground font-semibold"> nacionais e importados</span>.
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Trabalhamos com diagnóstico preciso, equipamentos modernos e equipe profissional.
            Aberta inclusive aos <span className="text-secondary font-semibold">domingos</span> para sua comodidade.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            {[
              { icon: Wrench, title: "Equipe Especialista", desc: "Profissionais qualificados" },
              { icon: Users, title: "Atendimento Premium", desc: "Trato direto com o dono" },
              { icon: CheckCircle2, title: "Garantia Real", desc: "Em peças e serviços" },
              { icon: MapPin, title: "Fácil Acesso", desc: "Av. Dona Belmira Marin" },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border hover:border-primary/40 transition-colors"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-gradient-fire flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-display text-foreground">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
