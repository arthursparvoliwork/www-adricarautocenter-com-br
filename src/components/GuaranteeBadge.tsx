import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

/** Selo circular de garantia com texto girando ao redor (estilo premium). */
export const GuaranteeBadge = ({ className = "" }: { className?: string }) => {
  const text = "GARANTIA · 90 DIAS · PEÇAS E SERVIÇO · ";
  const chars = text.split("");
  const radius = 58;

  return (
    <div className={`relative w-36 h-36 ${className}`}>
      {/* Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-fire blur-2xl opacity-50" />

      {/* Disc */}
      <div className="absolute inset-2 rounded-full bg-card border-2 border-primary/60 shadow-[0_0_30px_hsl(0_100%_55%/0.5)] flex items-center justify-center">
        <div className="text-center">
          <ShieldCheck className="w-8 h-8 text-secondary mx-auto mb-1" strokeWidth={2.5} />
          <div className="font-display text-xs text-fire leading-tight">90<br />DIAS</div>
        </div>
      </div>

      {/* Rotating text ring */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
      >
        {chars.map((ch, i) => {
          const angle = (i / chars.length) * 360;
          return (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 font-display text-[10px] tracking-[0.15em] text-secondary"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
                transformOrigin: "center",
              }}
            >
              {ch}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
};
