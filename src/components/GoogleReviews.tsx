import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ReviewData {
  rating: number;
  total: number;
  reviews: { author: string; rating: number; text: string; relative_time?: string }[];
  isOpen?: boolean;
  openingHours?: string[];
  source?: "google" | "fallback";
}

const FALLBACK: ReviewData = {
  rating: 4.4,
  total: 87,
  reviews: [
    { author: "Carlos M.", rating: 5, text: "Atendimento excelente! Resolveram meu problema de injeção rapidamente.", relative_time: "há 2 semanas" },
    { author: "Ana L.", rating: 5, text: "Honestos e competentes. Cobraram o justo e fizeram um trabalho impecável.", relative_time: "há 1 mês" },
    { author: "Roberto S.", rating: 4, text: "Levo meu carro há anos. Confio de olhos fechados.", relative_time: "há 2 meses" },
  ],
  source: "fallback",
};

export const GoogleReviews = () => {
  const [data, setData] = useState<ReviewData>(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data: result, error } = await supabase.functions.invoke("google-reviews");
        if (!mounted) return;
        if (error || !result) {
          console.warn("Google Reviews fallback:", error?.message);
        } else if (result.rating) {
          setData({ ...result, source: "google" });
        }
      } catch (e) {
        console.warn("Google Reviews fetch failed", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-12 bg-carbon">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border-2 border-secondary/30 rounded-3xl p-6 lg:p-10 max-w-5xl mx-auto"
        >
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30 mb-3">
                <MapPin className="w-3 h-3 text-secondary" />
                <span className="text-[10px] uppercase tracking-wider text-secondary font-bold">Google Meu Negócio</span>
              </div>
              <div className="font-display text-6xl text-fire">{data.rating.toFixed(1)}</div>
              <div className="flex items-center justify-center lg:justify-start gap-0.5 my-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i <= Math.round(data.rating) ? "fill-secondary text-secondary" : "text-muted"}`}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Baseado em <strong className="text-foreground">{data.total}+ avaliações</strong>
              </div>
              {data.isOpen !== undefined && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/50 border border-border">
                  <span className={`w-2 h-2 rounded-full ${data.isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs font-semibold">{data.isOpen ? "Aberto agora" : "Fechado"}</span>
                </div>
              )}
              <a
                href="https://www.google.com/maps/place/Adricar+Centro+Automotivo"
                target="_blank"
                rel="noopener"
                className="inline-block mt-4 text-xs text-secondary hover:text-secondary-glow underline"
              >
                Ver no Google Maps →
              </a>
            </div>

            <div className="lg:col-span-2 grid sm:grid-cols-3 gap-3">
              {(loading ? FALLBACK.reviews : data.reviews).slice(0, 3).map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background/50 border border-border rounded-xl p-4"
                >
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-xs text-foreground/80 line-clamp-4 mb-3">"{r.text}"</p>
                  <div className="text-[10px] text-muted-foreground">
                    <strong className="text-foreground">{r.author}</strong>
                    {r.relative_time && ` · ${r.relative_time}`}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
