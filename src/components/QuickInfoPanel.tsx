import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Phone, Calendar } from "lucide-react";

/** Painel flutuante no canto superior direito com horário, ofertas e atalhos. Persiste estado fechado. */
export const QuickInfoPanel = () => {
  const [open, setOpen] = useState(false);
  const [hour, setHour] = useState(new Date().getHours());

  useEffect(() => {
    const t = setInterval(() => setHour(new Date().getHours()), 60_000);
    return () => clearInterval(t);
  }, []);

  const isOpen = hour >= 8 && hour < 18;

  return (
    <div className="fixed top-24 right-4 z-40 hidden md:block">
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.03 }}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-card/90 backdrop-blur-md border border-border hover:border-primary/60 transition-colors text-xs"
      >
        <span className={`w-2 h-2 rounded-full ${isOpen ? "bg-secondary animate-pulse" : "bg-muted"}`} />
        <span className="font-semibold">{isOpen ? "Aberto agora" : "Fechado"}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 top-12 w-72 bg-card border-2 border-primary/40 rounded-2xl p-4 shadow-2xl"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 w-7 h-7 rounded-full hover:bg-muted flex items-center justify-center"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="font-display text-lg mb-3 text-fire">Atendimento</div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Seg–Sáb</span>
                <span className="font-semibold">08h às 18h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Domingo</span>
                <span className="font-semibold">10h às 15h</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href="tel:+551126679953"
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-colors text-xs font-semibold"
              >
                <Phone className="w-3.5 h-3.5" /> Ligar
              </a>
              <a
                href="https://wa.me/5511985370952"
                target="_blank"
                rel="noopener"
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-secondary/10 border border-secondary/30 hover:bg-secondary hover:text-secondary-foreground transition-colors text-xs font-semibold"
              >
                <Calendar className="w-3.5 h-3.5" /> Agendar
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
