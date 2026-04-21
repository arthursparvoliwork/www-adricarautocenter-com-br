import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { UrgencyBadge } from "@/components/UrgencyBadge";

export const QuoteForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    modelo_carro: "",
    servico: "",
    mensagem: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.telefone.trim()) {
      toast.error("Preencha nome e telefone.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("leads").insert({
        nome: form.nome.trim(),
        telefone: form.telefone.trim(),
        modelo_carro: form.modelo_carro.trim() || null,
        servico: form.servico.trim() || null,
        mensagem: form.mensagem.trim() || null,
        origem: "formulario_site",
      });
      if (error) throw error;

      // Dispara notificação ao dono via edge function (fire-and-forget)
      supabase.functions.invoke("notify-new-lead", { body: form }).catch(() => {});

      setSuccess(true);
      toast.success("Pedido enviado! Te chamamos no WhatsApp em instantes.");

      // Abre WhatsApp com mensagem pré-formatada
      const msg = `Olá! Vim pelo site da Adricar.%0A%0A*Nome:* ${form.nome}%0A*Carro:* ${form.modelo_carro || "—"}%0A*Serviço:* ${form.servico || "—"}%0A*Mensagem:* ${form.mensagem || "—"}`;
      setTimeout(() => {
        window.open(`https://wa.me/5511985370952?text=${msg}`, "_blank", "noopener");
      }, 800);

      setForm({ nome: "", telefone: "", modelo_carro: "", servico: "", mensagem: "" });
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar. Chame direto no WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-6 lg:p-8 space-y-4 hover:border-primary/40 transition-colors"
    >
      <UrgencyBadge />
      <div>
        <h3 className="font-display text-2xl mb-1">Peça seu <span className="text-fire">orçamento grátis</span></h3>
        <p className="text-sm text-muted-foreground">Resposta em até 30 minutos no horário comercial.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="nome">Nome *</Label>
          <Input id="nome" name="nome" value={form.nome} onChange={handleChange} required placeholder="Seu nome" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="telefone">WhatsApp *</Label>
          <Input id="telefone" name="telefone" value={form.telefone} onChange={handleChange} required placeholder="(11) 99999-9999" type="tel" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="modelo_carro">Modelo do carro</Label>
          <Input id="modelo_carro" name="modelo_carro" value={form.modelo_carro} onChange={handleChange} placeholder="Ex: Civic 2018" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="servico">Serviço desejado</Label>
          <Input id="servico" name="servico" value={form.servico} onChange={handleChange} placeholder="Ex: Revisão, freios..." />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="mensagem">Mensagem (opcional)</Label>
        <Textarea id="mensagem" name="mensagem" value={form.mensagem} onChange={handleChange} placeholder="Conte mais sobre o que precisa..." rows={3} />
      </div>

      <Button type="submit" variant="hero" size="lg" disabled={loading || success} className="w-full">
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</>
        ) : success ? (
          <><CheckCircle2 className="w-4 h-4" /> Enviado!</>
        ) : (
          <><Send className="w-4 h-4" /> Enviar e abrir WhatsApp</>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Ao enviar, abrimos o WhatsApp com seus dados pré-preenchidos.
      </p>
    </motion.form>
  );
};
