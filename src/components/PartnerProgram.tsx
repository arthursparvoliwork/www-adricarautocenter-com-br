import { SectionHeading } from "@/components/SectionHeading";
import { useState } from "react";
import { motion } from "framer-motion";
import { Handshake, Building2, Percent, CalendarClock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSubmitLead } from "@/features/leads/useSubmitLead";
import { maskPhone } from "@/features/leads/phone";
import { FloatingInput, FloatingTextarea } from "@/features/leads/LeadFields";
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
  const { submit, status, errors, setErrors, reset } = useSubmitLead();
  const [form, setForm] = useState({ nome: "", telefone: "", empresa: "", mensagem: "" });
  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (k in errors) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await submit({
      nome: form.nome,
      telefone: form.telefone,
      servico: "Programa de parcerias",
      mensagem: [form.empresa && `Empresa: ${form.empresa}`, form.mensagem].filter(Boolean).join(" — ").slice(0, 2000),
      origem: originLabel("parceria"),
    });
    if (!res.ok) {
      if (res.reason === "network") toast.error("Não foi possível enviar. Tente novamente ou fale no WhatsApp.");
      return;
    }
    setForm({ nome: "", telefone: "", empresa: "", mensagem: "" });
    toast.success("Proposta recebida!", { description: "Entraremos em contato para fechar a parceria." });
    setTimeout(reset, 2500);
  };

  return (
    <section id="parcerias" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/60 to-background" />
      <div className="absolute inset-0 tire-tracks opacity-50" />

      <div className="container-x relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading className="mb-0" kicker="Marcas & Parcerias" title="Quem confia | *na* *Adricar.*" sub={<>
            Somos oficina parceira de plataformas e empresas do setor automotivo. Tem loja,
            revenda ou frota? Vamos fechar uma parceria.
          </>} />
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

          <form onSubmit={onSubmit} noValidate className="chamfer-lg border-2 border-primary/35 bg-card/90 p-6 sm:p-8 backdrop-blur-sm">
            <h3 className="font-display text-2xl text-metal">SEJA PARCEIRO</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Deixe seus dados: respondemos em horário comercial.
            </p>
            <div className="mt-5 space-y-1">
              <FloatingInput name="p_nome" label="Seu nome" value={form.nome} maxLength={100} onChange={(e) => set("nome", e.target.value)} error={errors.nome} />
              <FloatingInput name="p_telefone" label="WhatsApp (11) 99999-9999" type="tel" inputMode="numeric" value={form.telefone} onChange={(e) => set("telefone", maskPhone(e.target.value))} error={errors.telefone} />
              <FloatingInput name="p_empresa" label="Empresa / loja (opcional)" value={form.empresa} maxLength={100} onChange={(e) => set("empresa", e.target.value)} />
              <FloatingTextarea name="p_mensagem" label="Conte rapidamente sobre a sua operação" rows={3} maxLength={1800} value={form.mensagem} onChange={(e) => set("mensagem", e.target.value)} error={errors.mensagem} />
            </div>
            <Button type="submit" variant="hero" size="lg" className="mt-3 w-full" state={status === "loading" ? "loading" : status === "success" ? "success" : "idle"} disabled={status === "loading"}>
              <Handshake className="h-5 w-5" />
              Quero ser parceiro
              <ArrowRight className="btn-arrow h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
