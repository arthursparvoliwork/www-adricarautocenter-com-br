import { Phone, MessageCircle } from "lucide-react";

/** Barra fixa inferior no celular: Ligar | WhatsApp. */
export const MobileActionBar = () => (
  <div
    className="md:hidden fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-border bg-background/95 backdrop-blur-xl"
    style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
  >
    <a href="tel:+551126679953" className="flex items-center justify-center gap-2 py-4 font-bold uppercase tracking-wider text-primary-foreground bg-primary">
      <Phone className="w-5 h-5" /> Ligar
    </a>
    <a
      href="https://wa.me/5511985370952?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Adricar%20e%20gostaria%20de%20um%20or%C3%A7amento."
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 py-4 font-bold uppercase tracking-wider bg-whatsapp text-whatsapp-foreground"
    >
      <MessageCircle className="w-5 h-5" /> WhatsApp
    </a>
  </div>
);
