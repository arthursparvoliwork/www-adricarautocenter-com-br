import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: { src: string; label: string; category?: string }[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}

/** Lightbox em tela cheia com setas e fechar via ESC. */
export const Lightbox = ({ images, index, onClose, onIndexChange }: LightboxProps) => {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndexChange((index + 1) % images.length);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + images.length) % images.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, images.length, onClose, onIndexChange]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9990] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-card/80 border border-border flex items-center justify-center hover:bg-primary hover:border-primary transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index - 1 + images.length) % images.length);
            }}
            aria-label="Anterior"
            className="absolute left-4 w-12 h-12 rounded-full bg-card/80 border border-border flex items-center justify-center hover:bg-primary hover:border-primary transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index + 1) % images.length);
            }}
            aria-label="Próxima"
            className="absolute right-4 w-12 h-12 rounded-full bg-card/80 border border-border flex items-center justify-center hover:bg-primary hover:border-primary transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="relative max-w-5xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[index].src}
              alt={images[index].label}
              className="w-full h-full object-contain rounded-2xl border-2 border-primary/40 shadow-[0_0_60px_hsl(0_100%_55%/0.4)]"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent rounded-b-2xl">
              {images[index].category && (
                <div className="text-[10px] uppercase tracking-[0.3em] text-secondary font-bold mb-1">
                  {images[index].category}
                </div>
              )}
              <div className="font-display text-2xl">{images[index].label}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {index + 1} / {images.length}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
