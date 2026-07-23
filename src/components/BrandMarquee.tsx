import { motion } from "framer-motion";

const BRANDS = [
  "TOYOTA", "VOLKSWAGEN", "FORD", "CHEVROLET", "HONDA", "FIAT",
  "HYUNDAI", "RENAULT", "PEUGEOT", "NISSAN", "JEEP", "BMW",
  "MERCEDES", "AUDI", "MITSUBISHI", "KIA", "CITROËN", "SENAI",
];

/** Infinite marquee of partner brand names — seamless loop, mechanical rhythm. */
export const BrandMarquee = () => {
  const loop = [...BRANDS, ...BRANDS];

  return (
    <div className="relative py-10 border-y border-white/10 bg-black/60 overflow-hidden">
      {/* Edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        {loop.map((b, i) => (
          <div key={i} className="flex items-center gap-12 shrink-0">
            <span className="font-display text-2xl sm:text-3xl tracking-[0.15em] text-white/30 hover:text-secondary transition-colors">
              {b}
            </span>
            <span className="w-2 h-2 rounded-full bg-primary/60" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
