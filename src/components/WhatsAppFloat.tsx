import { MessageCircle } from "lucide-react";

export const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/5511985370952?text=Olá!%20Vim%20pelo%20site%20da%20Adricar."
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-[hsl(142_70%_45%)] animate-ping opacity-30" />
      <span className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[hsl(142_70%_45%)] text-white shadow-[0_0_30px_hsl(142_70%_45%/0.6)] group-hover:scale-110 transition-transform">
        <MessageCircle className="w-7 h-7 fill-current" />
      </span>
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-card border border-border px-3 py-1.5 rounded-lg text-sm font-semibold text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Fale Conosco
      </span>
    </a>
  );
};
