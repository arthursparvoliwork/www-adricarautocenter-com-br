import { useState } from "react";
import { motion } from "framer-motion";
import { Handshake, Building2, Percent, CalendarClock, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { originLabel } from "@/lib/tracking";

const partners = ["WEBMOTORS", "CAR10", "SENAI", "BOSCH", "PIRELLI", "NAKATA"];

const benefits = [
  { icon: Percent, title: "Preço de parceiro", desc: "Tabela exclusiva para lojas, frotas e revendas." },
  { icon: CalendarClock, title: "Prioridade na agenda", desc: "Seu carro entra na frente da fila." },
  { icon: Building2, title: "Laudo para venda", desc: "Checklist completo para anunciar com segurança." },
  { icon: Handshake, title: "Atendimento dedicado", desc: "Um contato direto no WhatsApp para o seu negócio." },
];

/** Parcerias (Webmotors, Car10) + captação de novos parceiros. */
export const PartnerProgram = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nome: "", telefone: "", empresa: "", mensagem: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.nome.trim().length < 2 || form.telefone.trim().length < 8) {
      toast({ title: "Confira os dados", description: "Preencha nome e telefone válidos.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      nome: form.nome.trim(),
      telefone: form.telefone.trim(),
      servico: "Programa de parcerias",
      mensagem: [form.empresa && `Empresa: ${form.empresa}`, form.mensagem].filter(Boolean).join(" — ").slice(0, 2000) || null,
      origem: originLabel("parceria"),
    });
    setLoading(false);
    if (error) {
      toast({ title: "Não foi possível enviar", description: "Tente novamente ou fale no WhatsApp.", variant: "destructive" });
      return;
    }
    setForm({ nome: "", telefone: "", empresa: "", mensagem: "" });
    toast({ title: "Proposta recebida!", description: "Entraremos em contato para fechar a parceria." });
  };

  return (
    <section id="parcerias" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/60 to-background" />
      <div className="absolute inset-0 tire-tracks opacity-50" />

      <div className="container-x relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block rounded-full border border-primary/45 bg-primary/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-primary">
            Parcerias
          </span>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.92]">
            <span className="block text-metal">QUEM CONFIA</span>
            <span className="block text-fire">NA ADRICAR.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Somos oficina parceira de plataformas e empresas do setor automotivo. Tem loja,
            revenda ou frota? Vamos fechar uma parceria.
          </p>
        </div>

        {/* Faixa de parceiros */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {partners.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="chamfer bevel-metal px-4 py-5 text-center"
            >
              <span className="font-display text-lg tracking-wide text-metal">{p}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 grid lg:grid-cols-2 gap-10 items-start">
          <div className="grid sm:grid-cols-2 gap-3">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group h-full chamfer border border-border bg-card/85 p-5 transition-all duration-500 hover:border-secondary/60 hover:-translate-y-0.5"
              >
                <b.icon className="h-6 w-6 text-secondary" />
                <h3 className="mt-3 font-display text-base uppercase tracking-wide text-foreground">{b.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>

          <form onSubmit={submit} className="chamfer-lg border-2 border-primary/35 bg-card/90 p-6 sm:p-8 backdrop-blur-sm">
            <h3 className="font-display text-2xl text-metal">SEJA PARCEIRO</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Deixe seus dados: respondemos em horário comercial.
            </p>
            <div className="mt-5 space-y-3">
              <Input
                placeholder="Seu nome"
                value={form.nome}
                maxLength={100}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                required
              />
              <Input
                placeholder="WhatsApp com DDD"
                value={form.telefone}
                maxLength={20}
                onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                required
              />
              <Input
                placeholder="Empresa / loja (opcional)"
                value={form.empresa}
                maxLength={100}
                onChange={(e) => setForm({ ...form, empresa: e.target.value })}
              />
              <Textarea
                placeholder="Conte rapidamente sobre a sua operação"
                value={form.mensagem}
                maxLength={2000}
                rows={3}
                onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
              />
            </div>
            <Button type="submit" variant="hero" size="lg" className="mt-5 w-full" disabled={loading}>
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Handshake className="h-5 w-5" />}
              Quero ser parceiro
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
