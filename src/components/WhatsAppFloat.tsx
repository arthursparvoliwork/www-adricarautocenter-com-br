import { MessageCircle } from "lucide-react";

/** Botão WhatsApp flutuante — só desktop (no celular usa a barra inferior). */
export const WhatsAppFloat = () => (
  <a
    href="https://wa.me/5511985370952?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Adricar%20e%20gostaria%20de%20um%20or%C3%A7amento."
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Solicitar orçamento no WhatsApp"
    className="hidden md:block fixed bottom-6 right-6 z-50 group"
  >
    <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp text-whatsapp-foreground shadow-[0_0_30px_hsl(var(--whatsapp)/0.5)] transition-transform duration-200 group-hover:scale-110">
      <MessageCircle className="w-7 h-7 fill-current" />
    </span>
    <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-card border border-border px-3 py-1.5 rounded-lg text-sm font-semibold text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      Orçamento no WhatsApp
    </span>
  </a>
);
