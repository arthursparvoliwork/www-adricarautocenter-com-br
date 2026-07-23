import { motion } from "framer-motion";

interface ChapterMarkProps {
  number: string;
  label: string;
  title: string;
  kicker?: string;
}

/** Editorial numbered chapter label — magazine/premium style transition between sections. */
export const ChapterMark = ({ number, label, title, kicker }: ChapterMarkProps) => {
  return (
    <div className="container-x py-8 sm:py-12">
      <div className="grid grid-cols-12 gap-4 items-end">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="col-span-3 sm:col-span-2"
        >
          <div className="font-display text-6xl sm:text-8xl text-stroke-white text-transparent leading-none tabular-nums">
            {number}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="col-span-9 sm:col-span-10 border-l border-white/20 pl-4 sm:pl-8"
        >
          {kicker && (
            <div className="text-[10px] uppercase tracking-[0.4em] text-secondary/80 mb-2">
              {kicker}
            </div>
          )}
          <div className="text-xs uppercase tracking-[0.3em] text-white/60 mb-3">
            — {label}
          </div>
          <h3 className="font-display text-3xl sm:text-5xl leading-[0.95] text-fire">
            {title}
          </h3>
        </motion.div>
      </div>
      <div className="mt-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  );
};
