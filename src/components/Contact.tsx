import { MapPin, Phone, Clock, Instagram, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoBackdrop } from "@/components/VideoBackdrop";

export const Contact = () => {
  return (
    <section id="contato" className="relative py-24 lg:py-32 overflow-hidden">
      <VideoBackdrop overlay={0.9} />
      <div className="container-x relative z-10">
        <div className="max-w-3xl mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 mb-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Contato</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Venha nos <span className="text-fire">visitar.</span>
            <br />Ou ligue agora.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Info */}
          <div className="space-y-5">
            {[
              {
                icon: MapPin,
                title: "Endereço",
                content: "Av. Dona Belmira Marin, 1670/1674\nParque Brasil — Grajaú, São Paulo/SP",
                cta: { label: "Abrir no Maps", href: "https://maps.google.com/?q=Av.+Dona+Belmira+Marin,+1670,+São+Paulo" },
              },
              {
                icon: Phone,
                title: "Telefone & WhatsApp",
                content: "(11) 98537-0952\n(11) 2667-9953",
                cta: { label: "Chamar no WhatsApp", href: "https://wa.me/5511985370952" },
              },
              {
                icon: Clock,
                title: "Horário de Funcionamento",
                content: "Seg a Sáb: 08:00 às 18:00\nDomingo: 10:00 às 15:00",
              },
              {
                icon: Instagram,
                title: "Redes Sociais",
                content: "@adricarautocenter\nadricarautocenter.com.br",
                cta: { label: "Ver Instagram", href: "https://instagram.com/adricarautocenter" },
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/60 transition-all group"
              >
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-fire flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg mb-2 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground whitespace-pre-line text-sm leading-relaxed">{item.content}</p>
                    {item.cta && (
                      <a
                        href={item.cta.href}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-secondary hover:text-secondary-glow transition-colors"
                      >
                        {item.cta.label} →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="relative">
            <div className="sticky top-24 rounded-2xl overflow-hidden border-2 border-primary/30 h-[600px] glow-red">
              <iframe
                src="https://www.google.com/maps?q=Av.+Dona+Belmira+Marin,+1670,+São+Paulo,+SP&output=embed"
                title="Localização Adricar Auto Center"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(1.2)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* CTA Bottom */}
        <div className="mt-16 text-center bg-gradient-to-br from-card to-background border border-border rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial-glow opacity-30" />
          <div className="relative">
            <h3 className="font-display text-3xl sm:text-4xl mb-4">
              Pronto para cuidar do seu carro?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Agende sua revisão agora mesmo pelo WhatsApp e receba atendimento personalizado.
            </p>
            <Button variant="hero" size="xl" asChild>
              <a href="https://wa.me/5511985370952?text=Olá!%20Gostaria%20de%20agendar%20um%20serviço%20na%20Adricar." target="_blank" rel="noopener">
                Agendar pelo WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
