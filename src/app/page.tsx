"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PackageCheck } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionTransition } from "@/components/sections/section-transition";
import { BranchesSection } from "@/components/sections/branches-section";
import { ServicesSection } from "@/components/sections/services-section";
import { WhyUsSection } from "@/components/sections/why-us-section";
import { ProcessSection } from "@/components/sections/process-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/layout/footer";
import { useTracking } from "@/features/tracking/hooks";

import { ScrollExperience } from "@/components/shared/scroll-experience";

export default function HomePage() {
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const [searchCount, setSearchCount] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const { data, isFetching, error, refetch } = useTracking(submittedCode);
  const lastHandledSearch = useRef<number>(0);

  const shipment = data?.shipment ?? null;
  const isSearching = isFetching && !shipment;
  const searchError = !shipment && error ? error : null;

  // Al ingresar/cargar la página, siempre iniciar en la parte superior (inicio)
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  const handleSearchSubmitted = (code: string) => {
    if (submittedCode === code) {
      refetch();
    } else {
      setSubmittedCode(code);
    }
    setSearchCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (shipment && searchCount > lastHandledSearch.current) {
      lastHandledSearch.current = searchCount;
      setTransitioning(true);

      const scrollTimer = setTimeout(() => {
        const el = document.getElementById("resultado-busqueda");
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetY = scrollTop + rect.top - 100;
        window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
      }, 450);

      const hideTimer = setTimeout(() => setTransitioning(false), 1450);

      return () => {
        clearTimeout(scrollTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [shipment, searchCount]);

  return (
    <>
      {/* ── Experiencia Única de Scroll Interactivo (Barra Superior + Rastreador de Sección Flotante) ── */}
      <ScrollExperience />

      {/* ── Lienzo unificado: HeroSection ── */}
      <div className="relative bg-[#f8fafc]">
        <HeroSection
          onSearchSubmitted={handleSearchSubmitted}
          isFetching={isFetching}
          isSearching={isSearching}
          searchError={searchError}
          submittedCode={submittedCode}
          shipment={shipment}
        />
      </div>
      {/* ── Transición e Interacción al desplazar (Scroll Reveal) entre secciones ── */}
      <SectionTransition />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="deferred-section"
      >
        <BranchesSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="deferred-section"
      >
        <ServicesSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="deferred-section"
      >
        <WhyUsSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="deferred-section"
      >
        <ProcessSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="deferred-section"
      >
        <TestimonialsSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="deferred-section"
      >
        <ContactSection />
      </motion.div>

      <Footer />

      <AnimatePresence>
        {transitioning && (
          <motion.div
            key="transition-veil"
            className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-[#0f172a]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="relative flex h-20 w-20 items-center justify-center"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span
                className="absolute inset-0 rounded-full bg-[#22c55e]/40"
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ duration: 1.3, repeat: Infinity, ease: "easeOut" }}
                aria-hidden="true"
              />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#16a34a] text-white shadow-[0_0_40px_rgba(34,197,94,0.6)]">
                <PackageCheck className="h-8 w-8" strokeWidth={2.2} />
              </div>
            </motion.div>

            <motion.p
              className="mt-6 text-lg font-extrabold tracking-tight text-white"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              ¡Envío encontrado!
            </motion.p>
            <motion.p
              className="mt-1 font-mono text-sm font-semibold text-[#22c55e]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {shipment?.code ?? submittedCode}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
