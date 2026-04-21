import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type Step = "greeting" | "service" | "urgency" | "name" | "summary";

const services = [
  "Mecânica geral / Revisão",
  "Freios (pastilha/disco)",
  "Suspensão / Amortecedor",
  "Injeção eletrônica",
  "Alinhamento e balanceamento",
  "Ar condicionado",
  "Outro / Não sei",
];

const urgencies = ["🔥 Urgente — hoje", "📅 Esta semana", "💭 Só pesquisando preço"];

/** Chatbot flutuante de pré-atendimento — coleta dados e envia pro WhatsApp. */
export const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("greeting");
  const [service, setService] = useState("");
  const [urgency, setUrgency] = useState("");
  const [name, setName] = useState("");

  const reset = () => {
    setStep("greeting");
    setService("");
    setUrgency("");
    setName("");
  };

  const submit = () => {
    const msg = `Olá Adricar! 👋\n\n*Nome:* ${name}\n*Serviço:* ${service}\n*Urgência:* ${urgency}\n\nGostaria de receber um orçamento.`;
    const url = `https://wa.me/5511985370952?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setStep("summary");
  };

  return (
    <>
      {/* Toggle */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 left-6 z-[60] w-14 h-14 rounded-full bg-gradient-fire shadow-[0_0_30px_hsl(0_100%_55%/0.6)] flex items-center justify-center text-primary-foreground"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Abrir chat de pré-atendimento"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-secondary animate-pulse" />
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 left-6 z-[60] w-[calc(100vw-3rem)] max-w-sm bg-card border-2 border-primary/40 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-fire p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center font-display text-primary">A</div>
              <div className="flex-1">
                <div className="font-display text-primary-foreground">Atendente Adricar</div>
                <div className="text-[10px] text-primary-foreground/80 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Online agora
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3 max-h-[50vh] overflow-y-auto bg-background/50">
              {step === "greeting" && (
                <>
                  <Bubble>Olá! 👋 Sou o assistente da Adricar. Vou te ajudar a montar um orçamento rápido.</Bubble>
                  <Bubble>Qual serviço seu carro precisa?</Bubble>
                  <div className="grid gap-2 pt-2">
                    {services.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setService(s);
                          setStep("urgency");
                        }}
                        className="text-left text-sm px-3 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === "urgency" && (
                <>
                  <UserBubble>{service}</UserBubble>
                  <Bubble>Pra quando você precisa?</Bubble>
                  <div className="grid gap-2 pt-2">
                    {urgencies.map((u) => (
                      <button
                        key={u}
                        onClick={() => {
                          setUrgency(u);
                          setStep("name");
                        }}
                        className="text-left text-sm px-3 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition-colors"
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === "name" && (
                <>
                  <UserBubble>{urgency}</UserBubble>
                  <Bubble>Qual seu primeiro nome?</Bubble>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (name.trim()) submit();
                    }}
                    className="flex gap-2 pt-2"
                  >
                    <input
                      autoFocus
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                      className="flex-1 px-3 py-2 rounded-lg bg-input border border-border text-sm focus:outline-none focus:border-primary"
                    />
                    <Button type="submit" size="sm" variant="hero" disabled={!name.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </>
              )}

              {step === "summary" && (
                <>
                  <UserBubble>{name}</UserBubble>
                  <Bubble>
                    Perfeito, {name}! 🎉 Já abri o WhatsApp com sua mensagem pronta. Nossa equipe vai te responder em poucos minutos.
                  </Bubble>
                  <Button variant="outline" size="sm" className="w-full" onClick={reset}>
                    <ArrowLeft className="w-4 h-4" /> Começar novo
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Bubble = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    className="max-w-[85%] bg-muted text-foreground text-sm px-3 py-2 rounded-2xl rounded-bl-sm"
  >
    {children}
  </motion.div>
);

const UserBubble = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    className="max-w-[85%] ml-auto bg-primary text-primary-foreground text-sm px-3 py-2 rounded-2xl rounded-br-sm"
  >
    {children}
  </motion.div>
);
