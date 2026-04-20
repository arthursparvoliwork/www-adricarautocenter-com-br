import { MessageCircle } from "lucide-react";

export const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/5511985370952?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Adricar%20e%20gostaria%20de%20um%20or%C3%A7amento."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Solicitar orçamento no WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Outer pulsing ring */}
      <span className="absolute inset-0 rounded-full bg-[hsl(142_70%_45%)] animate-ping opacity-30" />
      {/* Decorative white ring */}
      <span className="absolute -inset-1 rounded-full border border-white/40 group-hover:border-white/70 transition-colors" />
      {/* Main button */}
      <span className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[hsl(142_70%_45%)] text-white shadow-[0_0_30px_hsl(142_70%_45%/0.6)] group-hover:scale-110 transition-transform">
        <MessageCircle className="w-7 h-7 fill-current" />
      </span>
      {/* Tooltip with orçamento label */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-card border border-white/20 px-3 py-1.5 rounded-lg text-sm font-semibold text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
        💬 Orçamento Grátis
      </span>
      {/* Always-visible badge */}
      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border border-white/30 shadow-md">
        24h
      </span>
    </a>
  );
};
