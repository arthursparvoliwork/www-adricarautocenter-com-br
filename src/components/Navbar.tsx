import { useEffect, useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import lockup from "@/assets/adricar-lockup-clean.png";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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

      <div className="container-x flex items-center justify-between h-20">
        <a href="#inicio" className="flex items-center gap-3 group">
          <img
            src={lockup}
            alt="Adricar Centro Automotivo"
            className="h-10 w-auto object-contain drop-shadow-[0_4px_18px_rgba(230,57,70,0.45)]"
          />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-lg text-foreground tracking-wide">ADRICAR</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-secondary">Centro Automotivo</span>
          </span>
        </a>


        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-secondary transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+5511985370952" className="flex items-center gap-2 text-secondary font-semibold hover:text-secondary-glow transition-colors">
            <Phone className="w-4 h-4" />
            (11) 98537-0952
          </a>
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
        </div>

        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-primary/30 animate-fade-in">
          <nav className="container-x py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-semibold uppercase tracking-wider text-foreground hover:text-secondary"
              >
                {l.label}
              </a>
            ))}
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
