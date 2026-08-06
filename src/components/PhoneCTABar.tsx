import { Phone, MessageCircle, MapPin } from "lucide-react";

const WA = "https://wa.me/5511985370952?text=Ol%C3%A1!%20Quero%20um%20or%C3%A7amento%20na%20Adricar.";

/** Barra de contato dupla (WhatsApp + telefone fixo) no estilo da arte oficial. */
export const PhoneCTABar = () => {
  return (
    <section className="relative py-10 sm:py-14 bg-black overflow-hidden">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0 30px, hsl(0 90% 45% / 0.25) 30px 32px)",
        }}
      />
      <div className="container-x relative z-10 grid sm:grid-cols-2 gap-4">
        <a
          href={WA}
          target="_blank"
          rel="noopener"
          className="group flex items-center gap-4 px-6 py-5 bg-black border-2 border-[hsl(142_70%_45%)] rounded-xl shadow-[0_0_30px_hsl(142_70%_45%/0.25)] hover:shadow-[0_0_50px_hsl(142_70%_45%/0.5)] transition-shadow"
        >
          <span className="w-12 h-12 shrink-0 rounded-full bg-[hsl(142_70%_45%)] flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white fill-current" />
          </span>
          <span>
            <span className="block text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
              WhatsApp · orçamento grátis
            </span>
            <span className="block font-display text-2xl sm:text-3xl text-white group-hover:text-secondary transition-colors">
              11 98537-0952
            </span>
          </span>
        </a>

        <a
          href="tel:+551126679953"
          className="group flex items-center gap-4 px-6 py-5 bg-black border-2 border-primary rounded-xl shadow-[0_0_30px_hsl(0_100%_55%/0.25)] hover:shadow-[0_0_50px_hsl(0_100%_55%/0.5)] transition-shadow"
        >
          <span className="w-12 h-12 shrink-0 rounded-full bg-gradient-fire flex items-center justify-center">
            <Phone className="w-6 h-6 text-primary-foreground fill-current" />
          </span>
          <span>
            <span className="block text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
              Fixo · fale com a oficina
            </span>
            <span className="block font-display text-2xl sm:text-3xl text-white group-hover:text-secondary transition-colors">
              11 2667-9953
            </span>
          </span>
        </a>
      </div>

      <div className="container-x relative z-10 mt-4 flex items-center justify-center gap-2 text-center">
        <MapPin className="w-4 h-4 text-primary" />
        <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-white/60">
          Av. Dona Belmira Marin, 1670 / 1674 — Grajaú, São Paulo/SP
        </span>
      </div>
    </section>
  );
};
