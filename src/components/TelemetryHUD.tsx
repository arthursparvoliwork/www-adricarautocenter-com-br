import { motion } from "framer-motion";

/** Cinematic HUD telemetry strip — floats over hero video, aircraft-style readouts. */
export const TelemetryHUD = () => {
  return (
    <div className="pointer-events-none absolute top-24 right-4 sm:right-8 z-20 hidden md:flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.2em]">
      {/* Coords */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-2 px-3 py-1.5 border border-secondary/40 bg-black/50 backdrop-blur-sm rounded"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
        <span className="text-secondary/90">LAT −23.6821 · LON −46.6398</span>
      </motion.div>

      {/* Status readouts */}
      {[
        { l: "SYS", v: "ONLINE", c: "text-neon-yellow" },
        { l: "BAY 01", v: "READY", c: "text-white" },
        { l: "BAY 02", v: "IN-USE", c: "text-primary" },
        { l: "SIGNAL", v: "5G · 100%", c: "text-white" },
      ].map((r, i) => (
        <motion.div
          key={r.l}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 + i * 0.08 }}
          className="flex items-center justify-between gap-4 px-3 py-1.5 border border-white/15 bg-black/40 backdrop-blur-sm rounded min-w-[190px]"
        >
          <span className="text-white/50">{r.l}</span>
          <span className={r.c}>{r.v}</span>
        </motion.div>
      ))}

      {/* Vertical tick meter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-1 flex items-center gap-1 px-2 py-1 border border-white/15 bg-black/40 backdrop-blur-sm rounded"
      >
        <span className="text-white/50 text-[9px]">PWR</span>
        <div className="flex items-end gap-[2px] h-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-[3px] rounded-sm"
              style={{
                height: `${30 + i * 7}%`,
                backgroundColor: i < 8 ? "hsl(50 100% 55%)" : "hsl(0 100% 55%)",
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.08 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
