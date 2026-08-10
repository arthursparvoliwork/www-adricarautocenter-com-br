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
          className="group relative flex items-center gap-4 overflow-hidden px-6 py-5 bg-black/80 backdrop-blur-sm border-2 border-[hsl(142_70%_45%)] rounded-xl shadow-[0_0_30px_hsl(142_70%_45%/0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_50px_hsl(142_70%_45%/0.45)]"
        >
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative w-12 h-12 shrink-0 rounded-full bg-[hsl(142_70%_45%)] flex items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-[hsl(142_70%_45%)] opacity-60 animate-ping" />
            <MessageCircle className="relative w-6 h-6 text-white fill-current" />
          </span>
          <span className="relative">
            <span className="block text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
              WhatsApp · orçamento grátis
            </span>
            <span className="block font-display text-2xl sm:text-3xl text-white tabular-nums group-hover:text-secondary transition-colors">
              11 98537-0952
            </span>
            <span className="mt-1 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-white/45">
              <Clock className="w-3 h-3" /> resposta rápida · aberto domingo
            </span>
          </span>
        </a>

        <a
          href="tel:+551126679953"
          className="group relative flex items-center gap-4 overflow-hidden px-6 py-5 bg-black/80 backdrop-blur-sm border-2 border-primary rounded-xl shadow-[0_0_30px_hsl(0_100%_55%/0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_50px_hsl(0_100%_55%/0.45)]"
        >
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative w-12 h-12 shrink-0 rounded-full bg-gradient-fire flex items-center justify-center">
            <Phone className="w-6 h-6 text-primary-foreground fill-current" />
          </span>
          <span className="relative">
            <span className="block text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
              Fixo · fale com a oficina
            </span>
            <span className="block font-display text-2xl sm:text-3xl text-white tabular-nums group-hover:text-secondary transition-colors">
              11 2667-9953
            </span>
            <span className="mt-1 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-white/45">
              <Clock className="w-3 h-3" /> seg a sáb 8h–18h
            </span>
          </span>
        </a>
      </div>

      <div className="container-x relative z-10 mt-5 flex flex-wrap items-center justify-center gap-2 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/70">
            Av. Dona Belmira Marin, 1670 / 1674 — Grajaú, São Paulo/SP
          </span>
        </span>
      </div>
    </section>
  );
};
