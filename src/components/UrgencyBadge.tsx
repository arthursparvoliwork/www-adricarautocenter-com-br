import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";
import { spNow, getShopStatus } from "@/lib/hours";

/** Mostra urgência baseada em horário real: vagas restantes do dia / próximo horário disponível. */
export const UrgencyBadge = () => {
  const [info, setInfo] = useState<{ open: boolean; message: string; vagas: number }>({
    open: true, message: "", vagas: 3,
  });

  useEffect(() => {
    const update = () => {
      const { day, hour } = spNow();
      const st = getShopStatus();
      const totalHours = day === 0 ? 5 : 10;
      const elapsedHours = day === 0 ? Math.max(0, hour - 10) : Math.max(0, hour - 8);
      const vagas = Math.max(1, Math.ceil(5 * (1 - elapsedHours / totalHours)));
      setInfo({ open: st.open, message: st.open ? `Aberto agora — fecha às ${st.closesAt}h` : st.label.replace("Fechado · a", "A"), vagas });
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/15 via-secondary/10 to-primary/15 border border-primary/30"
      >
        <div className="flex items-center gap-2">
          <span className={`relative flex h-2.5 w-2.5`}>
            <span className={`absolute inline-flex h-full w-full rounded-full ${info.open ? "bg-green-500" : "bg-amber-500"} opacity-75 animate-ping`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${info.open ? "bg-green-500" : "bg-amber-500"}`} />
          </span>
          <span className="text-sm font-semibold text-foreground">{info.message}</span>
        </div>
        <div className="hidden sm:block w-px h-4 bg-border" />
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-secondary" />
          <span className="text-sm">
            <span className="font-bold text-secondary">{info.vagas} {info.vagas === 1 ? "vaga restante" : "vagas restantes"}</span>
            <span className="text-muted-foreground"> hoje</span>
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
