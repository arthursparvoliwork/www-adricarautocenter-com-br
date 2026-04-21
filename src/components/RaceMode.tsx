import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flag, X } from "lucide-react";
import { toast } from "sonner";

/** Easter egg: digite "race" em qualquer lugar pra ativar/desativar o modo F1. */
export const RaceMode = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let buffer = "";
    const handler = (e: KeyboardEvent) => {
      // Ignora se estiver digitando em input/textarea
      const target = e.target as HTMLElement;
      if (target.matches("input, textarea, [contenteditable]")) return;

      buffer = (buffer + e.key.toLowerCase()).slice(-4);
      if (buffer === "race") {
        setActive((prev) => {
          const next = !prev;
          if (next) {
            toast.success("🏁 MODO RACE ATIVADO!", { description: "Acelerou tudo. Digite 'race' de novo pra desativar." });
            document.documentElement.classList.add("race-mode");
          } else {
            toast.info("Modo race desativado");
            document.documentElement.classList.remove("race-mode");
          }
          return next;
        });
        buffer = "";
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      document.documentElement.classList.remove("race-mode");
    };
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -20 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[9996] pointer-events-auto"
        >
          <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-fire border-2 border-secondary shadow-[0_0_30px_hsl(50_100%_55%/0.6)]">
            <Flag className="w-5 h-5 text-primary-foreground animate-pulse" />
            <span className="font-display tracking-wider text-primary-foreground text-sm">
              MODO RACE ATIVO
            </span>
            <button
              onClick={() => {
                setActive(false);
                document.documentElement.classList.remove("race-mode");
                toast.info("Modo race desativado");
              }}
              className="p-1 rounded-full bg-background/20 hover:bg-background/40 transition-colors"
              aria-label="Sair do modo race"
            >
              <X className="w-3.5 h-3.5 text-primary-foreground" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
