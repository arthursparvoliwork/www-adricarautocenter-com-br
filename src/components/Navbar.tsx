import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/adricar-logo.png";

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
      <div className="container-x flex items-center justify-between h-20">
        <a href="#inicio" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/40 blur-xl group-hover:bg-primary/60 transition-all" />
            <img src={logo} alt="Adricar Centro Automotivo" className="relative w-12 h-12 rounded-full object-cover" />
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="font-display text-xl text-foreground tracking-wider">ADRICAR</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-secondary">Centro Automotivo</div>
          </div>
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
          <a href="tel:+5511985370952" className="flex items-center gap-2 text-secondary font-semibold">
            <Phone className="w-4 h-4" />
            (11) 98537-0952
          </a>
          <Button variant="hero" size="sm" asChild>
            <a href="#contato">Orçamento</a>
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
            <Button variant="hero" asChild>
              <a href="#contato">Solicitar Orçamento</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
