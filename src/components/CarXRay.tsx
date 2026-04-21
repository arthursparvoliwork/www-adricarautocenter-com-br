import { motion } from "framer-motion";

/** Mini ilustração SVG de carro em raio-X com peça destacada por slug. */
export const CarXRay = ({ highlight = "freios" }: { highlight?: string }) => {
  const isActive = (key: string) => highlight === key;

  return (
    <svg viewBox="0 0 200 90" className="w-full h-auto">
      <defs>
        <linearGradient id="xray-body" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(0 90% 55% / 0.15)" />
          <stop offset="100%" stopColor="hsl(0 90% 55% / 0.05)" />
        </linearGradient>
        <filter id="xray-glow">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* Carro outline */}
      <path
        d="M 20 65 L 35 45 Q 40 38 50 38 L 130 38 Q 145 38 155 50 L 175 55 Q 182 56 182 62 L 182 70 L 165 70 A 12 12 0 0 0 141 70 L 59 70 A 12 12 0 0 0 35 70 L 20 70 Z"
        fill="url(#xray-body)"
        stroke="hsl(50 100% 55% / 0.6)"
        strokeWidth="1"
      />

      {/* Janelas */}
      <path d="M 50 42 L 60 50 L 100 50 L 100 42 Z" fill="hsl(50 100% 55% / 0.1)" stroke="hsl(50 100% 55% / 0.3)" strokeWidth="0.5" />
      <path d="M 100 42 L 100 50 L 140 50 L 130 42 Z" fill="hsl(50 100% 55% / 0.1)" stroke="hsl(50 100% 55% / 0.3)" strokeWidth="0.5" />

      {/* Rodas */}
      <motion.g
        animate={isActive("freios") || isActive("alinhamento-balanceamento") || isActive("suspensao") ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: Infinity, duration: 1.2 }}
        style={{ transformOrigin: "47px 70px" }}
      >
        <circle cx="47" cy="70" r="11" fill="hsl(0 0% 8%)" stroke={isActive("freios") || isActive("alinhamento-balanceamento") || isActive("suspensao") ? "hsl(0 100% 55%)" : "hsl(50 100% 55% / 0.5)"} strokeWidth={isActive("freios") || isActive("alinhamento-balanceamento") || isActive("suspensao") ? 2 : 1} />
        <circle cx="47" cy="70" r="5" fill={isActive("freios") ? "hsl(0 100% 55%)" : "hsl(0 0% 25%)"} filter={isActive("freios") ? "url(#xray-glow)" : ""} />
      </motion.g>

      <motion.g
        animate={isActive("freios") || isActive("alinhamento-balanceamento") || isActive("suspensao") ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: Infinity, duration: 1.2, delay: 0.3 }}
        style={{ transformOrigin: "153px 70px" }}
      >
        <circle cx="153" cy="70" r="11" fill="hsl(0 0% 8%)" stroke={isActive("freios") || isActive("alinhamento-balanceamento") || isActive("suspensao") ? "hsl(0 100% 55%)" : "hsl(50 100% 55% / 0.5)"} strokeWidth={isActive("freios") || isActive("alinhamento-balanceamento") || isActive("suspensao") ? 2 : 1} />
        <circle cx="153" cy="70" r="5" fill={isActive("freios") ? "hsl(0 100% 55%)" : "hsl(0 0% 25%)"} filter={isActive("freios") ? "url(#xray-glow)" : ""} />
      </motion.g>

      {/* Motor (capô dianteiro) */}
      <motion.rect
        x="142"
        y="50"
        width="35"
        height="14"
        rx="2"
        fill={isActive("injecao-eletronica") ? "hsl(50 100% 55% / 0.4)" : "hsl(50 100% 55% / 0.05)"}
        stroke={isActive("injecao-eletronica") ? "hsl(50 100% 55%)" : "hsl(50 100% 55% / 0.2)"}
        strokeWidth={isActive("injecao-eletronica") ? 1.5 : 0.5}
        animate={isActive("injecao-eletronica") ? { opacity: [0.5, 1, 0.5] } : {}}
        transition={{ repeat: Infinity, duration: 1.5 }}
        filter={isActive("injecao-eletronica") ? "url(#xray-glow)" : ""}
      />

      {/* Suspensão (linhas) */}
      {isActive("suspensao") && (
        <>
          <motion.line x1="47" y1="50" x2="47" y2="60" stroke="hsl(0 100% 55%)" strokeWidth="2" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} />
          <motion.line x1="153" y1="50" x2="153" y2="60" stroke="hsl(0 100% 55%)" strokeWidth="2" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.3 }} />
        </>
      )}
    </svg>
  );
};
