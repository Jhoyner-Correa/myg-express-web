"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ShieldCheck,
  BadgeCheck,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { TESTIMONIALS } from "@/lib/constants";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const avatarColors = [
  "bg-gradient-to-br from-[#6fcf6f] to-green-dark",
  "bg-gradient-to-br from-[#334155] to-[#0f172a]",
  "bg-gradient-to-br from-emerald-400 to-emerald-700",
];

function Persona({ variant = 0 }: { variant?: number }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-full w-full" aria-hidden="true">
      {variant === 1 ? (
        <path
          d="M2 47c.5-5.5 4-11 10-14 4-2 8-3 13-3s9 1 13 3c6 3 9.5 8.5 10 14Z"
          fill="white"
          opacity="0.95"
        />
      ) : (
        <path
          d="M3 48c1-6 7-12.5 21-12.5S44 42 45 48Z"
          fill="white"
          opacity="0.95"
        />
      )}
      <path
        d="M14.5 17.5C14.5 12 18.5 8 24 8s9.5 4 9.5 9.5a4 4 0 0 1-2.5 3.7c-2 .9-4.5 1.3-7 1.3s-5-.4-7-1.3a4 4 0 0 1-2.5-3.7Z"
        fill="#1f2937"
        fillOpacity="0.22"
      />
      <circle cx="24" cy="18" r="9.5" fill="white" opacity="0.95" />
    </svg>
  );
}

function setSpotlight(e: React.MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

export function TestimonialsSection() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  const [mobileIdx, setMobileIdx] = useState<number>(0);

  const activeMobileTestimonial = TESTIMONIALS[mobileIdx] ?? TESTIMONIALS[0];

  const nextMobile = () => {
    setMobileIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevMobile = () => {
    setMobileIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonios" className="bg-[#f5f7f5] px-4 sm:px-6 py-14 md:py-24 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* ── 1. VISTA MÓVIL EXCLUSIVA (< md: Carrusel Táctil Elegante & Corporativo) ── */}
        <div className="block md:hidden space-y-6">
          {/* Header Móvil de Impacto */}
          <div className="text-center">
            <span className="inline-block text-[0.72rem] font-black text-[#2db84b] uppercase tracking-[0.15em]">
              CLIENTES FELICES
            </span>

            <h2 className="mt-2.5 font-sans text-[2.2rem] font-black leading-[1.02] tracking-tight text-slate-950">
              Lo que Dicen <span className="text-[#2db84b]">de Nosotros</span>
            </h2>

            {/* Badge de Calificación y Confianza */}
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 shadow-2xs">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-[#2db84b] text-[#2db84b]" />
                ))}
              </div>
              <span className="text-xs font-black text-slate-900">4.9/5</span>
              <span className="h-3 w-px bg-slate-200" />
              <span className="text-[0.7rem] font-semibold text-slate-500">
                +250 clientes felices
              </span>
            </div>
          </div>

          {/* Tarjeta Animada de Testimonio en Celular */}
          <div className="relative pt-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMobileTestimonial.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-xl relative overflow-hidden space-y-4"
              >
                {/* Comillas decorativas */}
                <span
                  className="pointer-events-none absolute -top-2 right-4 select-none font-display text-[4.5rem] leading-none text-[#2db84b]/15"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                {/* Cabecera de la tarjeta: Estrellas + Compra Verificada */}
                <div className="flex items-center justify-between relative z-10 border-b border-slate-100 pb-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-[#2db84b] text-[#2db84b]" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[0.65rem] font-extrabold uppercase tracking-wide text-[#0E8F45]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Compra verificada
                  </span>
                </div>

                {/* Texto del testimonio */}
                <p className="text-xs leading-relaxed text-slate-700 font-medium relative z-10">
                  &ldquo;{activeMobileTestimonial.text}&rdquo;
                </p>

                {/* Autor y Fecha */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-3 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center overflow-hidden rounded-full shadow-xs",
                          avatarColors[mobileIdx % avatarColors.length],
                        )}
                      >
                        <Persona variant={mobileIdx % 2} />
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#0E8F45] ring-2 ring-white">
                        <BadgeCheck className="h-3 w-3 text-white" />
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-black text-slate-900 leading-tight">
                        {activeMobileTestimonial.name}
                      </p>
                      <p className="text-[0.68rem] text-slate-500 font-medium mt-0.5">
                        {activeMobileTestimonial.city}
                      </p>
                    </div>
                  </div>

                  <span className="flex items-center gap-1 text-[0.68rem] font-semibold text-slate-400">
                    <Clock className="h-3 w-3" />
                    {activeMobileTestimonial.time}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Puntos e Indicadores de Navegación Móvil */}
            <div className="mt-4 flex items-center justify-between px-2">
              {/* Indicadores de Puntos */}
              <div className="flex items-center gap-1.5">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMobileIdx(idx)}
                    aria-label={`Ver testimonio ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      mobileIdx === idx ? "w-6 bg-[#2db84b]" : "w-2 bg-slate-300"
                    }`}
                  />
                ))}
              </div>

              {/* Botones Flecha Anterior/Siguiente */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevMobile}
                  aria-label="Testimonio anterior"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs active:scale-90"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  onClick={nextMobile}
                  aria-label="Testimonio siguiente"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2db84b] text-white shadow-xs active:scale-90"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. VISTA DESKTOP (md+: Original PC Intacto) ── */}
        <div className="hidden md:block">
          <SectionHeading
            tag="Clientes Felices"
            title="Lo que Dicen"
            highlight="de Nosotros"
            center
          />

          {/* Tira de confianza: prueba social */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-6 flex w-fit items-center gap-2.5 rounded-full border border-border bg-white px-5 py-2.5 shadow-sm"
          >
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star
                  key={s}
                  className="h-3.5 w-3.5 fill-green text-green"
                />
              ))}
            </div>
            <span className="text-sm font-extrabold text-foreground">4,9/5</span>
            <span className="h-3.5 w-px bg-border" />
            <span className="text-sm font-medium text-muted-foreground">
              +250 clientes felices y satisfechos
            </span>
          </motion.div>

          <motion.div
            ref={ref}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-3"
          >
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.article
                key={testimonial.name}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                onMouseMove={setSpotlight}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white p-7 shadow-[0_10px_30px_-16px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-200 hover:shadow-[0_20px_44px_-20px_rgba(15,23,42,0.2)]"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(260px circle at var(--mx,50%) var(--my,0%), rgba(15,23,42,0.09), transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                <span
                  className="pointer-events-none absolute -top-3 right-4 select-none font-display text-[5rem] leading-none text-green/15"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                <div className="relative mb-3.5 flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className="h-4 w-4 fill-green text-green transition-transform duration-200 group-hover:scale-110"
                        style={{ transitionDelay: `${s * 40}ms` }}
                      />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full px-1 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-green-deep">
                    <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                    Compra verificada
                  </span>
                </div>

                <p className="relative flex-1 text-[0.86rem] leading-relaxed text-muted-foreground">
                  {testimonial.text}
                </p>

                <div className="relative mt-4 flex items-center gap-3 border-t border-border/60 pt-4">
                  <div className="relative flex-shrink-0">
                    <div
                      className={cn(
                        "flex h-[42px] w-[42px] items-center justify-center overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105",
                        avatarColors[i],
                      )}
                    >
                      <Persona variant={i} />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-green-deep ring-2 ring-white">
                      <BadgeCheck className="h-3 w-3 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-extrabold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {testimonial.city}
                    </p>
                  </div>
                  <span className="ml-auto flex flex-shrink-0 items-center gap-1 text-[0.7rem] font-semibold text-muted-foreground">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {testimonial.time}
                  </span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
