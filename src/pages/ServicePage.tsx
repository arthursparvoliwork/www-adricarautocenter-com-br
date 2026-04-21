import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, MessageCircle, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { getServiceBySlug, SERVICES } from "@/data/services";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const WHATS = "5511985370952";

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) return <Navigate to="/404" replace />;

  const url = `https://adricarautocenter.com.br/servicos/${service.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    provider: {
      "@type": "AutoRepair",
      name: "Adricar Centro Automotivo",
      telephone: "+5511985370952",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Dona Belmira Marin, 1670/1674",
        addressLocality: "São Paulo",
        addressRegion: "SP",
        postalCode: "04815-000",
        addressCountry: "BR",
      },
    },
    areaServed: { "@type": "City", name: "São Paulo" },
    url,
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "https://adricarautocenter.com.br" },
      { "@type": "ListItem", position: 2, name: "Serviços", item: "https://adricarautocenter.com.br/#servicos" },
      { "@type": "ListItem", position: 3, name: service.shortTitle, item: url },
    ],
  };

  const whatsLink = `https://wa.me/${WHATS}?text=${encodeURIComponent(service.ctaWhats)}`;

  return (
    <>
      <Helmet>
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={service.metaTitle} />
        <meta property="og:description" content={service.metaDescription} />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Navbar />

      <main className="bg-background text-foreground">
        {/* Hero */}
        <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial-glow opacity-40" />
          <div className="container-x relative z-10">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link to="/" className="hover:text-secondary">Início</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/#servicos" className="hover:text-secondary">Serviços</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">{service.shortTitle}</span>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <div className="inline-block px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 mb-6">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Serviço especializado
                </span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl leading-[1.05] mb-6">
                {service.hero}
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mb-8">
                {service.intro}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="hero" size="lg" asChild>
                  <a href={whatsLink} target="_blank" rel="noopener">
                    <MessageCircle className="w-5 h-5" /> Orçamento no WhatsApp
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={`tel:+${WHATS}`}>
                    <Phone className="w-5 h-5" /> (11) 98537-0952
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 lg:py-24 bg-card/30">
          <div className="container-x">
            <h2 className="font-display text-3xl lg:text-5xl mb-12">Por que escolher a Adricar?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {service.benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-primary/60 transition-all"
                >
                  <CheckCircle2 className="w-8 h-8 text-secondary mb-3" />
                  <h3 className="font-display text-lg mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 lg:py-24">
          <div className="container-x max-w-4xl">
            <h2 className="font-display text-3xl lg:text-5xl mb-12">Como funciona</h2>
            <ol className="space-y-4">
              {service.process.map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex gap-5 items-start bg-card border border-border rounded-xl p-5"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-fire flex items-center justify-center font-display text-xl text-primary-foreground">
                    {i + 1}
                  </div>
                  <p className="text-base lg:text-lg pt-2.5">{step}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 bg-card/30">
          <div className="container-x max-w-3xl">
            <h2 className="font-display text-3xl lg:text-5xl mb-10 text-center">Perguntas frequentes</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {service.faq.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border rounded-xl px-5">
                  <AccordionTrigger className="font-display text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 lg:py-28">
          <div className="container-x">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-secondary p-10 lg:p-16 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(50_100%_55%/0.4),transparent_50%)]" />
              <div className="relative">
                <h2 className="font-display text-3xl lg:text-5xl text-primary-foreground mb-4">
                  Pronto pra resolver?
                </h2>
                <p className="text-primary-foreground/90 text-lg mb-8 max-w-xl mx-auto">
                  Diagnóstico grátis, orçamento sem compromisso. Atendemos no Grajaú, São Paulo.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button variant="secondary" size="lg" asChild>
                    <a href={whatsLink} target="_blank" rel="noopener">
                      <MessageCircle className="w-5 h-5" /> Falar no WhatsApp
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="bg-background/10 border-primary-foreground/30 text-primary-foreground hover:bg-background/20">
                    <Link to="/"><ArrowLeft className="w-4 h-4" /> Voltar pra home</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other services */}
        <section className="pb-20">
          <div className="container-x">
            <h3 className="font-display text-2xl mb-6">Outros serviços</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SERVICES.filter((s) => s.slug !== service.slug).map((s) => (
                <Link
                  key={s.slug}
                  to={`/servicos/${s.slug}`}
                  className="bg-card border border-border rounded-xl p-5 hover:border-secondary/60 transition-all group flex items-center justify-between"
                >
                  <span className="font-display text-lg group-hover:text-secondary transition-colors">
                    {s.shortTitle}
                  </span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
