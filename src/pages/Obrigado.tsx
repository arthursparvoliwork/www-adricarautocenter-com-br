import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, Phone, Star, Instagram, ArrowLeft, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackLead } from "@/lib/tracking";
import { EASE_BRAND } from "@/lib/motion";
import { fireSparks } from "@/components/ConfettiSparks";
import { whatsappLink } from "@/features/leads/whatsapp";
import lockup from "@/assets/adricar-lockup-clean.png";

const WHATSAPP = whatsappLink("Olá! Acabei de pedir um orçamento no site da Adricar.");
const MAPS_REVIEW = "https://search.google.com/local/writereview?placeid=ChIJ_____ADRICAR";
const MAPS_DIR = "https://www.google.com/maps/dir/?api=1&destination=Av.+Dona+Belmira+Marin,+1670+S%C3%A3o+Paulo";

const STEPS = [
  { icon: MessageCircle, t: "Recebemos seu pedido", s: "Já está na fila da nossa equipe técnica." },
  { icon: Clock, t: "Retorno em até 30 min", s: "No horário comercial, direto no seu WhatsApp." },
  { icon: MapPin, t: "Traga o carro", s: "Av. Dona Belmira Marin, 1670 — Grajaú, São Paulo." },
];

const Obrigado = () => {
  const [params] = useSearchParams();
  const source = params.get("src") || "formulario_site";

  useEffect(() => {
    trackLead(source);
    // confete leve, uma vez por sessão
    const k = "adricar_thanks_confetti";
    if (!sessionStorage.getItem(k) && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem(k, "1");
      fireSparks();
    }
  }, [source]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center px-4 py-16">
      <Helmet>
        <title>Pedido enviado | Adricar Auto Center</title>
        <meta name="description" content="Recebemos seu pedido de orçamento. Nossa equipe retorna em até 30 minutos no WhatsApp." />
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* fundo */}
      <div className="absolute inset-0 bg-gradient-radial-glow opacity-70" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-fire" />
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-3xl bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-7 sm:p-10 text-center shadow-2xl"
      >
        <img src={lockup} alt="Adricar Centro Automotivo" className="h-10 sm:h-12 mx-auto object-contain" />

        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
          className="mt-7 mx-auto w-24 h-24 rounded-full bg-whatsapp/10 border border-whatsapp/30 flex items-center justify-center"
        >
          <svg viewBox="0 0 52 52" className="w-14 h-14" fill="none" aria-hidden="true">
            <motion.circle cx="26" cy="26" r="23" stroke="hsl(var(--whatsapp))" strokeWidth="3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.2, ease: EASE_BRAND }} />
            <motion.path d="M15 27l7 7 15-16" stroke="hsl(var(--whatsapp))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.75, ease: EASE_BRAND }} />
          </svg>
        </motion.div>

        <h1 className="font-display text-3xl sm:text-5xl mt-6 leading-tight">
          PEDIDO <span className="text-fire">ENVIADO!</span>
        </h1>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          Obrigado pela confiança. Um especialista da Adricar já está analisando seu pedido — 30 anos de estrada cuidando do seu carro.
        </p>

        <div className="grid sm:grid-cols-3 gap-3 mt-8 text-left">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.1 }}
              className="rounded-2xl border border-border bg-background/60 p-4 hover:border-primary/40 transition-colors"
            >
              <s.icon className="w-5 h-5 text-accent" />
              <p className="font-semibold mt-2 text-sm">{s.t}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.s}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Button asChild variant="hero" size="lg">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" /> Falar agora no WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="tel:+551126679953">
              <Phone className="w-4 h-4" /> (11) 2667-9953
            </a>
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-wrap gap-3 justify-center text-sm">
          <a
            href={MAPS_REVIEW}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/40 text-accent hover:bg-accent/10 transition-colors"
          >
            <Star className="w-4 h-4" /> Avaliar no Google
          </a>
          <a
            href="https://instagram.com/adricarautocenter"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-primary/50 transition-colors"
          >
            <Instagram className="w-4 h-4" /> @adricarautocenter
          </a>
          <a
            href={MAPS_DIR}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-primary/50 transition-colors"
          >
            <MapPin className="w-4 h-4" /> Como chegar
          </a>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-primary/50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar ao site
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Obrigado;
