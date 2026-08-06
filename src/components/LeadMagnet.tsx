import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Gift, CheckCircle2, ShieldCheck, Timer, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { StarRail } from "@/components/StarRail";
import arte from "@/assets/arte-adricar.jpg";
import { fireSparks } from "@/components/ConfettiSparks";

const BENEFITS = [
  { icon: ShieldCheck, t: "Checklist de 30 pontos", s: "Diagnóstico visual gratuito na sua primeira visita" },
  { icon: Percent, t: "10% OFF na mão de obra", s: "Válido para o primeiro serviço agendado pelo site" },
  { icon: Timer, t: "Retorno em 30 minutos", s: "No horário comercial, direto no seu WhatsApp" },
];

/** Oferta de entrada (lead magnet): captura nome + WhatsApp em troca do cupom + checklist. */
export const LeadMagnet = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim().length < 2 || telefone.replace(/\D/g, "").length < 10) {
      toast.error("Informe seu nome e um WhatsApp válido.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("leads").insert({
        nome: nome.trim(),
        telefone: telefone.trim(),
        servico: "Cupom 10% + Checklist 30 pontos",
        origem: "lead_magnet_cupom",
      });
      if (error) throw error;
      supabase.functions.invoke("notify-new-lead", { body: { nome, telefone, origem: "lead_magnet_cupom" } }).catch(() => {});
      setDone(true);
      fireSparks();
      toast.success("Cupom garantido! Te chamamos no WhatsApp.");
      const msg = `Ol%C3%A1! Sou ${encodeURIComponent(nome)} e quero resgatar meu cupom de 10%25 OFF + checklist de 30 pontos.`;
      setTimeout(() => window.open(`https://wa.me/5511985370952?text=${msg}`, "_blank", "noopener"), 700);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar. Chame direto no WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="oferta" className="relative py-16 sm:py-24 overflow-hidden bg-carbon">
      <img src={arte} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95" />
      <div className="absolute inset-0 bg-gradient-radial-glow opacity-60" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-fire" />

      <div className="container-x relative z-10 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <StarRail className="mb-5 justify-start" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/40 bg-secondary/10 mb-4">
            <Gift className="w-3.5 h-3.5 text-secondary" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-secondary">
              Oferta exclusiva do site
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
            <span className="block text-white">SEU CARRO REVISADO</span>
            <span className="block text-fire">COM 10% OFF.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md">
            Deixe seu WhatsApp e receba o cupom de 10% na mão de obra mais o
            checklist de 30 pontos gratuito. Sem compromisso, sem pegadinha.
          </p>

          <ul className="mt-7 space-y-4">
            {BENEFITS.map((b) => (
              <li key={b.t} className="flex gap-3">
                <span className="shrink-0 w-10 h-10 rounded-lg bg-gradient-fire flex items-center justify-center">
                  <b.icon className="w-5 h-5 text-primary-foreground" />
                </span>
                <span>
                  <span className="block font-display text-base text-white">{b.t}</span>
                  <span className="block text-sm text-muted-foreground">{b.s}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-black/80 backdrop-blur-md border-2 border-primary/50 rounded-2xl p-6 sm:p-8 space-y-4 shadow-[0_0_60px_hsl(0_100%_55%/0.2)]"
        >
          <div className="text-center">
            <div className="font-display text-5xl sm:text-6xl text-fire leading-none">10% OFF</div>
            <div className="mt-1 text-[10px] font-mono uppercase tracking-[0.3em] text-white/60">
              na mão de obra do primeiro serviço
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              aria-label="Seu nome"
              maxLength={80}
            />
            <Input
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="WhatsApp (11) 99999-9999"
              aria-label="Seu WhatsApp"
              type="tel"
              maxLength={20}
            />
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading || done}>
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Gerando cupom...</>
            ) : done ? (
              <><CheckCircle2 className="w-4 h-4" /> Cupom garantido!</>
            ) : (
              <>Quero meu cupom de 10%</>
            )}
          </Button>
          <p className="text-[10px] text-center font-mono uppercase tracking-[0.2em] text-white/40">
            Usamos seu contato apenas para enviar o orçamento
          </p>
        </motion.form>
      </div>
    </section>
  );
};
