import { useEffect, useState } from "react";
import { Menu, X, Phone, MessageCircle, Gauge } from "lucide-react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import lockup from "@/assets/adricar-lockup-clean.png";
import { LogoAura } from "@/components/LogoAura";
import { Magnetic } from "@/components/Magnetic";

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#galeria", label: "Galeria" },
  { href: "#marcas", label: "Marcas" },
  { href: "#contato", label: "Contato" },
];

/** Oficina aberta: seg-sex 08-18, sáb 08-13 (horário de São Paulo) */
const useShopOpen = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const check = () => {
      const now = new Date();
      const d = now.getDay();
      const h = now.getHours() + now.getMinutes() / 60;
      setOpen((d >= 1 && d <= 5 && h >= 8 && h < 18) || (d === 6 && h >= 8 && h < 13));
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);
  return open;
};

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#inicio");
  const [rpm, setRpm] = useState(0);
  const shopOpen = useShopOpen();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  useMotionValueEvent(scrollYProgress, "change", (v) => setRpm(Math.round(v * 8000)));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Seção ativa
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0.01, 0.25, 0.5] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-primary/30 shadow-[0_4px_30px_hsl(0_100%_50%/0.15)]"
          : "bg-transparent"
      )}
    >
      {/* Top white hairline detail */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      {/* Faixa de checkered flag sutil */}
      <div
        className="pointer-events-none absolute top-0 inset-x-0 h-1.5 opacity-[0.14]"
        style={{
          backgroundImage:
            "repeating-conic-gradient(hsl(0 0% 100%) 0% 25%, transparent 0% 50%)",
          backgroundSize: "12px 12px",
        }}
        aria-hidden="true"
      />

      {/* Light sweep (faróis passando) */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 w-40 opacity-40 mix-blend-screen"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(var(--secondary)/0.35), hsl(var(--primary)/0.25), transparent)",
        }}
        animate={{ x: ["-12rem", "110vw"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
        aria-hidden="true"
      />

      <div className="container-x flex items-center justify-between h-20 relative">
        <a href="#inicio" className="flex items-center gap-3 group shrink-0">
          <LogoAura intensity="sm">
            <img
              src={lockup}
              alt="Adricar Centro Automotivo"
              className="h-10 w-auto object-contain drop-shadow-[0_4px_18px_rgba(230,57,70,0.45)] transition-transform duration-500 group-hover:scale-105"
            />
          </LogoAura>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-lg text-foreground tracking-wide">ADRICAR</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-secondary">Centro Automotivo</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative px-3 py-2 text-sm font-semibold uppercase tracking-wider transition-colors group",
                  isActive ? "text-secondary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-md border border-secondary/40 bg-secondary/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{l.label}</span>
                {/* tachometer ticks */}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[3px] w-8 transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                  )}
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, hsl(var(--primary)) 0 3px, transparent 3px 6px)",
                  }}
                  aria-hidden="true"
                />
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {/* Status da oficina */}
          <div
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-[0.18em]",
              shopOpen
                ? "border-secondary/40 bg-secondary/10 text-secondary"
                : "border-border bg-muted/40 text-muted-foreground"
            )}
          >
            <span className="relative flex h-2 w-2">
              {shopOpen && (
                <span className="absolute inline-flex h-full w-full rounded-full bg-secondary opacity-70 animate-ping" />
              )}
              <span
                className={cn(
                  "relative inline-flex h-2 w-2 rounded-full",
                  shopOpen ? "bg-secondary" : "bg-muted-foreground"
                )}
              />
            </span>
            {shopOpen ? "Aberto agora" : "Fechado"}
          </div>

          {/* Tacômetro digital do scroll */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-primary/30 bg-card/60 font-display text-[11px] text-primary tabular-nums">
            <Gauge className="w-3.5 h-3.5" />
            {rpm.toString().padStart(4, "0")}
            <span className="text-muted-foreground text-[9px]">RPM</span>
          </div>

          <a
            href="tel:+5511985370952"
            className="flex items-center gap-2 text-secondary font-semibold hover:text-secondary-glow transition-colors"
          >
            <Phone className="w-4 h-4" />
            (11) 98537-0952
          </a>
          <Magnetic>
            <Button variant="whatsapp" size="sm" asChild>
              <a
                href="https://wa.me/5511985370952?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20na%20Adricar."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4" />
                Orçamento
              </a>
            </Button>
          </Magnetic>
        </div>

        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Barra de progresso estilo redline */}
      <motion.div
        className="absolute bottom-0 left-0 h-[3px] w-full origin-left"
        style={{
          scaleX: progress,
          background:
            "linear-gradient(90deg, hsl(var(--secondary)), hsl(30 100% 55%), hsl(var(--primary)))",
          boxShadow: "0 0 12px hsl(0 100% 55% / 0.7)",
        }}
        aria-hidden="true"
      />

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-primary/30 animate-fade-in">
          <nav className="container-x py-6 flex flex-col gap-1">
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "flex items-center gap-3 py-3 border-b border-border/60 text-base font-semibold uppercase tracking-wider",
                  active === l.href ? "text-secondary" : "text-foreground"
                )}
              >
                <span className="font-display text-xs text-primary">{`0${i + 1}`}</span>
                {l.label}
              </motion.a>
            ))}
            <div className="flex items-center gap-2 pt-4 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-secondary">
              <span className={cn("h-2 w-2 rounded-full", shopOpen ? "bg-secondary animate-pulse" : "bg-muted-foreground")} />
              {shopOpen ? "Oficina aberta agora" : "Oficina fechada"}
            </div>
            <Button variant="whatsapp" asChild>
              <a
                href="https://wa.me/5511985370952?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20na%20Adricar."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                <MessageCircle className="w-4 h-4" />
                Solicitar Orçamento WhatsApp
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
