import { useState } from "react";
import { motion } from "framer-motion";
import { Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UrgencyBadge } from "@/components/UrgencyBadge";
import { fireSparks } from "@/components/ConfettiSparks";
import { GuaranteePDF } from "@/components/GuaranteePDF";
import { useNavigate } from "react-router-dom";
import { originLabel } from "@/lib/tracking";
import { useSubmitLead } from "@/features/leads/useSubmitLead";
import { maskPhone } from "@/features/leads/phone";
import { buildLeadWhatsappText, whatsappLink } from "@/features/leads/whatsapp";
import { FloatingInput, FloatingTextarea, ServiceChips } from "@/features/leads/LeadFields";
import { useRichMotion } from "@/hooks/useMotionPrefs";

const EMPTY = { nome: "", telefone: "", modelo_carro: "", servico: "", mensagem: "" };

export const QuoteForm = () => {
  const navigate = useNavigate();
  const rich = useRichMotion();
  const { submit, status, errors, setErrors } = useSubmitLead();
  const [form, setForm] = useState(EMPTY);

  const set = (k: keyof typeof EMPTY, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await submit({ ...form, origem: originLabel("formulario_site") });
    if (!res.ok) {
      if (res.reason === "network") toast.error("Erro ao enviar. Tente de novo ou chame no WhatsApp.");
      return;
    }
    if (rich) fireSparks();
    toast.success("Pedido enviado! Te chamamos no WhatsApp em instantes.");
    const url = whatsappLink(buildLeadWhatsappText(form));
    setTimeout(() => window.open(url, "_blank", "noopener"), 800);
    setForm(EMPTY);
    setTimeout(() => navigate("/obrigado?src=formulario_site"), 1200);
  };

  const btnState = status === "loading" ? "loading" : status === "success" ? "success" : "idle";

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      onSubmit={handleSubmit}
      noValidate
      className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-6 lg:p-8 space-y-3 hover:border-primary/40 transition-colors"
    >
      <UrgencyBadge />
      <div className="pb-1">
        <h3 className="font-display text-2xl mb-1">Peça seu <span className="text-fire">orçamento grátis</span></h3>
        <p className="text-sm text-muted-foreground">Resposta em até 30 minutos no horário comercial.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-x-4">
        <FloatingInput name="nome" label="Nome *" value={form.nome} maxLength={100} autoComplete="name" onChange={(e) => set("nome", e.target.value)} error={errors.nome} />
        <FloatingInput
          name="telefone"
          label="WhatsApp * (11) 99999-9999"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          value={form.telefone}
          onChange={(e) => set("telefone", maskPhone(e.target.value))}
          error={errors.telefone}
        />
      </div>

      <FloatingInput name="modelo_carro" label="Modelo do carro (ex: Civic 2018)" value={form.modelo_carro} maxLength={100} onChange={(e) => set("modelo_carro", e.target.value)} error={errors.modelo_carro} />

      <ServiceChips value={form.servico} onChange={(v) => set("servico", v)} />

      <FloatingTextarea name="mensagem" label="Mensagem (opcional)" rows={3} maxLength={2000} value={form.mensagem} onChange={(e) => set("mensagem", e.target.value)} error={errors.mensagem} />

      <Button type="submit" variant="hero" size="lg" state={btnState} disabled={status === "loading" || status === "success"} className="w-full">
        <Send className="w-4 h-4" /> Enviar e abrir WhatsApp <ArrowRight className="btn-arrow w-4 h-4" />
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Ao enviar, abrimos o WhatsApp com seus dados pré-preenchidos.
      </p>

      <div className="pt-3 border-t border-border flex justify-center">
        <GuaranteePDF variant="outlineNeon" size="default" />
      </div>
    </motion.form>
  );
};
