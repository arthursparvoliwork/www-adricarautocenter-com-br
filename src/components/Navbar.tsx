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

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative px-3.5 py-2 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors",
                  isActive ? "text-secondary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg border border-secondary/40 bg-secondary/10"
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
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-secondary/30 bg-secondary/5 text-sm font-semibold text-secondary transition-all duration-300 hover:bg-secondary/15 hover:border-secondary/60 hover:shadow-[0_0_18px_hsl(50_100%_55%/0.35)]"
          >
            <Phone className="w-4 h-4" />
            (11) 98537-0952
          </a>
          <Button
            variant="whatsapp"
            size="sm"
            className="rounded-lg shadow-[0_6px_20px_hsl(145_70%_35%/0.35)] transition-transform duration-300 hover:-translate-y-0.5"
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

      {/* Divisão inferior: linha fina vermelho→amarelo */}
      <div
        className={cn(
          "absolute bottom-0 inset-x-0 h-px transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-40"
        )}
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(var(--primary)/0.8) 25%, hsl(var(--secondary)/0.8) 75%, transparent)",
        }}
        aria-hidden="true"
      />

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
            <Button variant="whatsapp" className="mt-4 rounded-lg" asChild>
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
