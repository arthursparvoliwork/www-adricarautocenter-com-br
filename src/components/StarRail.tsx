import { motion } from "framer-motion";
import { Star } from "lucide-react";

/** Fileira de 5 estrelas douradas em arco — assinatura visual da arte da Adricar. */
export const StarRail = ({ className = "" }: { className?: string }) => {
  const sizes = [18, 26, 38, 26, 18];
  const offsets = [10, 2, -8, 2, 10];

  return (
    <div className={`flex items-end justify-center gap-1.5 ${className}`}>
      {sizes.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: offsets[i] }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, type: "spring", stiffness: 220, damping: 14 }}
        >
          <Star
            style={{ width: s, height: s }}
            className="text-secondary fill-current drop-shadow-[0_0_12px_hsl(50_100%_55%/0.8)]"
          />
        </motion.div>
      ))}
    </div>
  );
};
