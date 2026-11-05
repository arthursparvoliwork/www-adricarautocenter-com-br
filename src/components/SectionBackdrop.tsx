import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DURATION, EASE_BRAND } from "@/lib/motion";

type Tone = "red" | "amber" | "neutral";
const TONES: Record<string, Tone> = {
  inicio: "red", servicos: "red", rodas: "red", promocao: "amber", sobre: "amber",
  "antes-depois": "neutral", galeria: "neutral", avaliacoes: "amber", marcas: "neutral", faq: "neutral", contato: "red",
};

/** Fundo fixo cujo tom muda com a seção ativa — só opacity de camadas sobrepostas. */
export const SectionBackdrop = () => {
  const [tone, setTone] = useState<Tone>("red");
  useEffect(() => {
    const els = Object.keys(TONES).map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setTone(TONES[e.target.id])),
      { rootMargin: "-50% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    // seções carregadas depois (lazy)
    const mo = new MutationObserver(() => {
      Object.keys(TONES).forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);

  const layer = (t: Tone, cls: string) => (
    <motion.div
      className={`absolute inset-0 ${cls}`}
      animate={{ opacity: tone === t ? 1 : 0 }}
      transition={{ duration: DURATION.hero * 1.5, ease: EASE_BRAND }}
    />
  );
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {layer("red", "bg-tone-red")}
      {layer("amber", "bg-tone-amber")}
      {layer("neutral", "bg-tone-neutral")}
    </div>
  );
};
