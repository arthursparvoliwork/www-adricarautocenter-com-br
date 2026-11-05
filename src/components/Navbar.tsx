import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { DURATION, EASE_BRAND, STAGGER } from "@/lib/motion";
import { whatsappLink } from "@/features/leads/whatsapp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import lockup from "@/assets/adricar-lockup-clean.png";
import { useLogoDocked } from "@/lib/logoDock";

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre" },
  { href: "#galeria", label: "Galeria" },
  { href: "#marcas", label: "Marcas" },
  { href: "#contato", label: "Contato" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const docked = useLogoDocked();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#inicio");

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      // esconde ao descer, reaparece ao subir (só depois do logo encaixar)
      if (y <= 480 || y < last - 4) setHidden(false);
      else if (y > last + 4) setHidden(true);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter(Boolean) as HTMLElement[];
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
        "fixed top-0 inset-x-0 z-50 transition-[transform,background-color,box-shadow] duration-300",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
        scrolled
          ? "bg-background/85 backdrop-blur-xl shadow-[0_4px_30px_hsl(0_100%_50%/0.15)]"
          : "bg-transparent"
      )}
    >
      {/* Top white hairline detail */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="container-x flex items-center justify-between h-20 gap-4">
        <a href="#inicio" className="group shrink-0" aria-label="Adricar Centro Automotivo — início">
          <div id="nav-logo-slot" className="w-[118px] sm:w-[136px]">
            <img
              src={lockup}
              alt="Adricar Centro Automotivo"
              className={cn(
                "logo-mark-glow w-full h-auto transition-opacity duration-200",
                docked ? "opacity-100" : "opacity-0"
              )}
            />
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-border/60 bg-card/40 backdrop-blur-md px-1.5 py-1.5">
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group/link relative px-3.5 py-1.5 rounded-full text-[13px] font-semibold uppercase tracking-wider transition-colors duration-300",
                  isActive ? "text-secondary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-gradient-yellow shadow-[0_0_18px_hsl(50_100%_55%/0.45)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{l.label}</span>
                {!isActive && (
                  <span className="absolute left-3.5 right-3.5 bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-primary to-secondary transition-transform duration-200 group-hover/link:scale-x-100" aria-hidden="true" />
                )}
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+5511985370952"
            className="group flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-full border border-secondary/25 bg-secondary/5 text-sm font-semibold text-secondary transition-all duration-300 hover:border-secondary/60 hover:bg-secondary/10 hover:shadow-[0_0_20px_hsl(50_100%_55%/0.3)]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary/15 transition-colors duration-300 group-hover:bg-secondary/25">
              <Phone className="w-3.5 h-3.5" />
            </span>
            <span className="flex flex-col leading-none text-left">
              <span className="text-[9px] uppercase tracking-[0.2em] text-secondary/60">Ligue agora</span>
              <span className="tabular-nums">(11) 98537-0952</span>
            </span>
          </a>
          <Button
            variant="whatsapp"
            size="sm"
            className="rounded-full px-5 shadow-[0_8px_24px_hsl(145_70%_35%/0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_hsl(145_70%_35%/0.5)]"
            asChild
          >
            <a
              href="https://wa.me/5511985370952?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20na%20Adricar."
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-4 h-4" />
              Orçamento
            </a>
          </Button>
        </div>

        <button
          className="lg:hidden text-foreground p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <Menu />
        </button>
      </div>

      {/* Divisão inferior: hairline branco + degradê vermelho→amarelo */}
      <div
        className={cn(
          "absolute bottom-0 inset-x-0 transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-50"
        )}
        aria-hidden="true"
      >
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(0 0% 100%/0.25) 30%, hsl(0 0% 100%/0.25) 70%, transparent)",
          }}
        />
        <div
          className="h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--primary)/0.9) 28%, hsl(30 100% 55%/0.9) 50%, hsl(var(--secondary)/0.9) 72%, transparent)",
            boxShadow: "0 0 14px hsl(0 100% 55%/0.35)",
          }}
        />
      </div>


      <MobileMenu open={open} onClose={() => setOpen(false)} active={active} />
    </header>
  );
};

const ORIGIN = "calc(100% - 2.25rem) 2.5rem";

/** Menu mobile fullscreen: abre em máscara circular a partir do botão, Esc fecha, trava scroll e prende o foco. */
const MobileMenu = ({ open, onClose, active }: { open: boolean; onClose: () => void; active: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => ref.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !ref.current) return;
      const items = Array.from(ref.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      prevFocus?.focus?.();
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="lg:hidden fixed inset-0 z-[70] bg-background/[0.97] backdrop-blur-xl flex flex-col"
          initial={{ clipPath: `circle(0% at ${ORIGIN})` }}
          animate={{ clipPath: `circle(150% at ${ORIGIN})` }}
          exit={{ clipPath: `circle(0% at ${ORIGIN})` }}
          transition={{ duration: DURATION.enter, ease: EASE_BRAND }}
        >
          <div className="absolute inset-0 bg-gradient-radial-glow opacity-50 pointer-events-none" />
          <div className="container-x w-full relative flex h-20 items-center justify-between">
            <span className="section-kicker">Menu</span>
            <button data-autofocus onClick={onClose} aria-label="Fechar menu" className="p-2 rounded-md text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary">
              <X />
            </button>
          </div>
          <motion.nav
            className="container-x w-full relative flex-1 flex flex-col justify-center gap-1 pb-10"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: STAGGER, delayChildren: 0.12 } } }}
          >
            {links.map((l) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={onClose}
                variants={{ hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0 } }}
                className={cn(
                  "py-3 border-b border-border/50 font-display text-3xl uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:text-secondary",
                  active === l.href ? "text-secondary" : "text-foreground hover:text-secondary"
                )}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }} className="mt-8 grid grid-cols-2 gap-3">
              <Button variant="outline" size="lg" asChild>
                <a href="tel:+5511985370952" onClick={onClose}><Phone className="w-4 h-4" /> Ligar</a>
              </Button>
              <Button variant="whatsapp" size="lg" asChild>
                <a href={whatsappLink("Olá! Gostaria de um orçamento na Adricar.")} target="_blank" rel="noopener noreferrer" onClick={onClose}>
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </Button>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
