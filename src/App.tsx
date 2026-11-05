import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Loader2 } from "lucide-react";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { ScrollProgress } from "@/components/ScrollProgress";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { PageTransition } from "@/components/motion/PageTransition";
import { CardFx } from "@/components/motion/CardFx";
import { BackToTop } from "@/components/BackToTop";
import { DURATION, EASE_BRAND } from "@/lib/motion";
import { ChatBot } from "@/components/ChatBot";
import { captureCampaign } from "@/lib/tracking";

const Auth = lazy(() => import("./pages/Auth.tsx"));
const Admin = lazy(() => import("./pages/Admin.tsx"));
const ServicePage = lazy(() => import("./pages/ServicePage.tsx"));
const Obrigado = lazy(() => import("./pages/Obrigado.tsx"));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <PageTransition key={location.pathname}>
        <Suspense fallback={<PageFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/servicos/:slug" element={<ServicePage />} />
            <Route path="/obrigado" element={<Obrigado />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageTransition>
    </AnimatePresence>
  );
};

const App = () => {
  useEffect(() => {
    captureCampaign();
  }, []);

  return (
  <MotionConfig reducedMotion="user" transition={{ duration: DURATION.enter, ease: EASE_BRAND }}>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ScrollProgress />
      <CardFx />
      
      <BrowserRouter>
        <AnimatedRoutes />
        <BackToTop />
        <ChatBot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </MotionConfig>
  );
};

export default App;
