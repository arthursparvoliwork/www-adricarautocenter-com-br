import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** Tela de loading inicial com motor "ligando". Mostra apenas na primeira visita da sessão. */
export const LoadingScreen = () => {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("adricar-loaded");
  });

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      sessionStorage.setItem("adricar-loaded", "1");
      setVisible(false);
    }, 1700);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[10000] bg-background flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-radial-glow opacity-50" />
          <div className="relative flex flex-col items-center gap-6">
            <div className="relative w-32 h-32">
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-primary/30"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-secondary"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-4 rounded-full bg-gradient-fire flex items-center justify-center font-display text-2xl text-primary-foreground"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              >
                A
              </motion.div>
            </div>
            <motion.div
              className="font-display text-3xl text-fire tracking-wider"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              ADRICAR
            </motion.div>
            <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Ligando o motor...
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
