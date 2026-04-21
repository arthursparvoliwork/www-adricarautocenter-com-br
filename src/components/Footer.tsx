import logo from "@/assets/adricar-logo.png";
import { Instagram, Phone, MapPin, Globe, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="relative bg-carbon border-t border-border pt-16 pb-8">
      <div className="divider-tread absolute top-0 inset-x-0" />

      <div className="container-x">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Adricar" className="w-14 h-14 rounded-full" />
              <div>
                <div className="font-display text-2xl tracking-wider">ADRICAR</div>
                <div className="text-xs uppercase tracking-[0.25em] text-secondary">Centro Automotivo</div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Há mais de 30 anos cuidando do seu veículo com excelência.
              Especialistas em mecânica geral, injeção eletrônica e rodas/pneus
              para nacionais e importados.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://instagram.com/adricarautocenter"
                target="_blank"
                rel="noopener"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5511985370952"
                target="_blank"
                rel="noopener"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-secondary hover:text-secondary transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="https://adricarautocenter.com.br"
                target="_blank"
                rel="noopener"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-secondary hover:text-secondary transition-colors"
                aria-label="Site"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-foreground mb-4 uppercase tracking-wider">Serviços</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/servicos/freios" className="text-muted-foreground hover:text-secondary transition-colors">Freios</a></li>
              <li><a href="/servicos/injecao-eletronica" className="text-muted-foreground hover:text-secondary transition-colors">Injeção Eletrônica</a></li>
              <li><a href="/servicos/suspensao" className="text-muted-foreground hover:text-secondary transition-colors">Suspensão</a></li>
              <li><a href="/servicos/alinhamento-balanceamento" className="text-muted-foreground hover:text-secondary transition-colors">Alinhamento</a></li>
              <li><a href="/#servicos" className="text-muted-foreground hover:text-secondary transition-colors">Ver todos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-foreground mb-4 uppercase tracking-wider">Contato</h4>
            <ul className="space-y-3 text-sm text-muted-foreground mb-5">
              <li className="flex gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                Av. Dona Belmira Marin, 1670/1674 — Grajaú, SP
              </li>
              <li className="flex gap-2">
                <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                (11) 98537-0952
              </li>
            </ul>
            <Button variant="whatsapp" size="sm" asChild className="w-full">
              <a
                href="https://wa.me/5511985370952?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20na%20Adricar."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4" />
                Orçamento Grátis
              </a>
            </Button>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Adricar Centro Automotivo. Todos os direitos reservados.</div>
          <div className="flex items-center gap-2">
            <span>Aceitamos:</span>
            <span className="px-2 py-1 rounded bg-card border border-border">VISA</span>
            <span className="px-2 py-1 rounded bg-card border border-border">MASTER</span>
            <span className="px-2 py-1 rounded bg-card border border-border">ELO</span>
            <span className="px-2 py-1 rounded bg-card border border-border">PIX</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
