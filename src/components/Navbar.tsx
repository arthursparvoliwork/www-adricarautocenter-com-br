import { useEffect, useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import lockup from "@/assets/adricar-lockup-clean.png";
import { LogoAura } from "@/components/LogoAura";

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#galeria", label: "Galeria" },
  { href: "#marcas", label: "Marcas" },
  { href: "#contato", label: "Contato" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
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
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/85 backdrop-blur-xl shadow-[0_4px_30px_hsl(0_100%_50%/0.15)]"
          : "bg-transparent"
      )}
    >
      {/* Top white hairline detail */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="container-x flex items-center justify-between h-20 gap-4">
        <a href="#inicio" className="flex items-center gap-3 group shrink-0">
          <LogoAura intensity="sm">
            <img
              src={lockup}
              alt="Adricar Centro Automotivo"
              className="h-10 w-auto object-contain drop-shadow-[0_4px_18px_rgba(230,57,70,0.45)]"
            />
          </LogoAura>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-lg text-foreground tracking-wide">ADRICAR</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-secondary">Centro Automotivo</span>
          </span>
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
                  "relative px-3.5 py-1.5 rounded-full text-[13px] font-semibold uppercase tracking-wider transition-colors duration-300",
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
          className="lg:hidden text-foreground p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
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


      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-primary/30 animate-fade-in">
          <nav className="container-x py-6 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "py-3 border-b border-border/60 text-base font-semibold uppercase tracking-wider transition-colors",
                  active === l.href ? "text-secondary" : "text-foreground hover:text-secondary"
                )}
              >
                {l.label}
              </a>
            ))}
            <a
              href="tel:+5511985370952"
              onClick={() => setOpen(false)}
              className="mt-4 flex items-center gap-3 rounded-lg border border-secondary/30 bg-secondary/5 px-4 py-3 text-secondary"
            >
              <Phone className="w-4 h-4" />
              <span className="font-semibold tabular-nums">(11) 98537-0952</span>
            </a>
            <Button variant="whatsapp" className="mt-2 rounded-lg" asChild>
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
