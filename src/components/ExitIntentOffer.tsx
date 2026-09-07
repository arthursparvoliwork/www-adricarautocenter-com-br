import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const KEY = "adricar_exit_offer_v1";

/** Exit-intent: última oferta antes do visitante sair (desktop) ou após scroll longo (mobile). */
export const ExitIntentOffer = () => {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(KEY)) return;
    let fired = false;
    const trigger = () => {
      if (fired) return;
      fired = true;
      setOpen(true);
      localStorage.setItem(KEY, "1");
    };
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    const timer = window.setTimeout(trigger, 75_000);
    document.addEventListener("mouseout", onLeave);
    return () => {
      document.removeEventListener("mouseout", onLeave);
      window.clearTimeout(timer);
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim().length < 2 || telefone.replace(/\D/g, "").length < 10) {
      toast.error("Informe nome e WhatsApp válidos.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("leads").insert({
        nome: nome.trim(),
        telefone: telefone.trim(),
        servico: "Promo Fechou, Ganhou! (exit intent)",
        origem: "exit_intent",
      });
      if (error) throw error;
      supabase.functions.invoke("notify-new-lead", { body: { nome, telefone, origem: "exit_intent" } }).catch(() => {});
      toast.success("Pronto! Vamos te chamar no WhatsApp.");
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar. Chame no WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-label="Promoção Fechou, Ganhou"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-md bg-carbon border-2 border-primary rounded-2xl p-7 shadow-[0_0_80px_hsl(0_100%_55%/0.35)]"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Fechar oferta"
              className="absolute top-3 right-3 p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Wrench className="w-4 h-4 text-secondary" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-secondary">
                Espera! Promoção da semana
              </span>
            </div>
            <h3 className="font-display text-3xl leading-tight">
              <span className="block text-metal">FECHOU,</span>
              <span className="block text-fire">GANHOU!</span>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Fechou serviço acima de R$ 300 e ganhou <span className="font-bold text-secondary">alinhamento
              grátis</span>. Deixe seu WhatsApp que a gente reserva a sua vaga na agenda desta semana.
            </p>

            <form onSubmit={submit} className="mt-5 space-y-3">
              <Input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" aria-label="Seu nome" maxLength={80} />
              <Input value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="WhatsApp" aria-label="Seu WhatsApp" type="tel" maxLength={20} />
              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</> : "Quero minha promoção"}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
