"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PingDot } from "@/components/shared/ping-dot";
import { MapCard } from "@/components/shared/map-card";
import { TrackingWidget } from "@/components/tracking/tracking-widget";
import { TrackingResult } from "@/components/tracking/tracking-result";
import type { Shipment } from "@/types/tracking";

const titleLines = ["CONFIANZA", "EN CADA", "ENTREGA"];
const subtitle =
  "Recibimos los paquetes de tus compras online y los entregamos directamente en tu casa.";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

interface HeroSectionProps {
  onSearchSubmitted?: (code: string) => void;
  isFetching?: boolean;
  isSearching?: boolean;
  searchError?: Error | null;
  submittedCode?: string | null;
  shipment?: Shipment | null;
}

export function HeroSection({
  onSearchSubmitted,
  isFetching,
  isSearching,
  searchError,
  submittedCode,
  shipment,
}: HeroSectionProps = {}) {
  return (
    <section
      id="hero"
      className="relative z-20 flex flex-col items-center justify-center overflow-x-clip bg-transparent pt-14 md:pt-20 pb-2 md:pb-6"
    >
      {/* ── MOBILE BACKGROUND LAYER (< sm: DEGRADADO PURO - BORDE INFERIOR TOTALMENTE DESVANECIDO) ── */}
      <div className="pointer-events-none absolute top-14 sm:hidden inset-x-0 z-0 h-[640px] w-full overflow-hidden flex items-start justify-end translate-y-4 opacity-100">
        <div className="relative h-full w-full flex items-start justify-end">
          <img
            src="/assets/hero-bg-speed.jpg?v=5"
            alt="Almacén de Logística MyG Express Selva Central 8K Master"
            className="h-full w-full object-contain object-right-top filter brightness-[1.03] contrast-[1.03] translate-x-56 sm:translate-x-0 scale-[1.52] origin-top-right"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 0%, black 10%, rgba(0,0,0,0.05) 30%, transparent 50%), linear-gradient(to right, transparent 0%, transparent 10%, black 45%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 10%, rgba(0,0,0,0.05) 30%, transparent 50%), linear-gradient(to right, transparent 0%, transparent 10%, black 45%, black 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "intersect",
            }}
          />
          {/* Degradado Suave al Lado Izquierdo - Intensificado un poquito más */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/78 via-[40%] to-transparent pointer-events-none z-10" />
          {/* Degradado Tipo Nube Puro en la Parte Inferior - Erradica la raya/borde al 100% */}
          <div className="absolute top-[160px] bottom-0 left-0 right-0 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc] via-[50%] to-transparent pointer-events-none z-10" />
        </div>
      </div>

      {/* ── DESKTOP BACKGROUND LAYER (sm+: CON DEGRADADO NUBE EN EL BORDE INFERIOR PARA ELIMINAR LA RAYA) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute top-0 right-0 z-0 hidden sm:flex h-[680px] md:h-[780px] lg:h-[820px] w-full md:w-[73%] lg:w-[70%] overflow-hidden justify-end translate-y-8 md:translate-y-20 opacity-100"
      >
        <div className="relative h-full w-full flex items-center justify-end">
          <img
            src="/assets/hero-bg-speed.jpg?v=5"
            alt="Almacén de Logística MyG Express Selva Central 8K Master"
            className="h-full w-full object-contain object-right-top filter brightness-[1.03] contrast-[1.03]"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 0%, black 45%, rgba(0,0,0,0.25) 72%, transparent 92%), linear-gradient(112deg, transparent 0%, transparent 4%, black 20%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 45%, rgba(0,0,0,0.25) 72%, transparent 92%), linear-gradient(112deg, transparent 0%, transparent 4%, black 20%, black 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "intersect",
            }}
          />
          {/* Soft Left Text Contour Overlay - Exclusivo PC */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/30 via-[20%] to-transparent pointer-events-none z-10" />
          {/* Soft Bottom Cloud Fade Overlay - Desvanece la raya inferior al 100% de forma sutil y natural */}
          <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/80 via-[45%] to-transparent pointer-events-none z-10" />
        </div>
      </motion.div>

      {/* Top Right Dot Grid Matrix Pattern */}
      <div className="pointer-events-none absolute top-12 right-6 z-0 hidden lg:grid grid-cols-6 gap-2 opacity-30">
        {Array.from({ length: 48 }).map((_, i) => (
          <div key={i} className="h-1 w-1 rounded-full bg-slate-400" />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-10">
        
        {/* ── MOBILE HERO LAYOUT (< md: Detección inteligente adaptativa por altura) ── */}
        <div className="flex md:hidden flex-col gap-4 pt-2 mobile-hero-container">
          {/* Top 2-Column Grid: Left Title & Badge | Right Personnel Photo */}
          <div className="grid grid-cols-[1.25fr_0.75fr] items-end gap-1">
            {/* CÓDIGO PROFESIONAL: Detección dinámica de altura con CSS clamp() y dvh (Ajuste milimétrico final) */}
            <div className="relative z-20 flex flex-col gap-2 pt-[clamp(1.15rem,4.6dvh,2.75rem)]">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200/60 bg-white/80 px-3 py-1 shadow-xs backdrop-blur-md"
              >
                <PingDot />
                <span className="font-mono text-[0.58rem] font-extrabold uppercase tracking-wider text-slate-800">
                  SELVA CENTRAL DEL PERÚ
                </span>
              </motion.div>

              <h1
                style={{
                  fontFamily: "'Impact', 'Anton', 'Bebas Neue', sans-serif",
                  transform: "scaleY(1.22)",
                  transformOrigin: "top left",
                }}
                className="font-black leading-[0.82] tracking-[-0.01em] text-slate-950 text-[3.1rem] uppercase pt-1 mb-3 mobile-hero-title"
              >
                CONFIANZA<br />
                EN CADA<br />
                <span className="text-[#2db84b] block">ENTREGA</span>
              </h1>
            </div>

            {/* Personnel photo standing behind (SIEMPRE VISIBLE AL 100%) */}
            <div className="relative z-0 pointer-events-none flex justify-end items-end h-full">
              <img
                src="/assets/hero-personas.png"
                alt="Equipo de logística MyG Express"
                className="h-auto max-h-[760px] w-full object-contain object-bottom scale-[2.4] -translate-x-16 translate-y-72"
                style={{
                  filter: "drop-shadow(0 12px 20px rgba(0,0,0,.14))",
                  maskImage: "linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
                }}
              />
            </div>
          </div>

          {/* Subtitle (relative z-20: por encima de las personas) */}
          <div className="relative z-20 pt-3 flex flex-col gap-1.5 mobile-hero-subtitle">
            <p className="text-[0.82rem] font-semibold leading-[1.38] text-slate-600">
              Recibimos los paquetes de tus<br />
              compras online<br />
              y los entregamos<br />
              directamente en<br />
              tu casa.
            </p>
            <p className="text-[0.85rem] font-black leading-[1.35] text-slate-950">
              Rápido, seguro<br />
              y sin que<br />
              te muevas.
            </p>
          </div>

          {/* Action Buttons (relative z-20: por encima de las personas - con sombra oscura negra en celular) */}
          <div className="relative z-20 flex flex-col items-start gap-2.5 pt-1">
            <button
              onClick={() => {
                document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#2db84b] px-6 text-xs font-extrabold text-white transition-all hover:bg-[#239a3e] active:scale-98 shadow-[0_10px_25px_rgba(0,0,0,0.38)] mobile-hero-btn"
            >
              <span>Solicitar entrega</span>
            </button>

            <button
              onClick={() => {
                document.getElementById("proceso")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-xs font-extrabold text-slate-900 transition-all hover:bg-slate-50 active:scale-98 shadow-[0_8px_22px_rgba(0,0,0,0.28)] mobile-hero-btn"
            >
              <span>¿Cómo funciona?</span>
            </button>
          </div>

          {/* Tracking Widget (Rastreo arriba) */}
          <div className="w-full pt-2">
            <TrackingWidget
              onSearchSubmitted={onSearchSubmitted}
              isFetching={isFetching}
              isSearching={isSearching}
              searchError={searchError}
            />
          </div>

          {/* MapCard (Red Logística / Red de Oficinas abajo) */}
          <div className="w-full pt-1">
            <MapCard />
          </div>
        </div>

        {/* ── DESKTOP HERO LAYOUT (md+: Original PC Design) ── */}
        <div className="hidden md:flex w-full flex-row items-start pt-8 lg:pt-14 md:px-2 lg:px-4">
          {/* LEFT COLUMN: Copy & Map */}
          <div className="flex flex-[0_0_45%] flex-col gap-5 md:pr-8">
            
            {/* 1. Badge Pill */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex w-fit items-center gap-3 rounded-full border border-slate-200/60 bg-white/70 px-4 py-2 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05),0_2px_6px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md"
            >
              <PingDot />
              <span className="font-mono text-[0.65rem] font-extrabold uppercase tracking-[0.15em] text-foreground">
                SELVA CENTRAL DEL PERÚ
              </span>
            </motion.div>

            {/* 2. Main Title - Restaurado exactamente a como estaba en PC */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ fontFamily: "var(--font-hero), var(--font-display), sans-serif", perspective: 1000 }}
              className="font-black leading-[1.02] tracking-[-0.03em] text-foreground text-[clamp(2.6rem,6.8vw,6.5rem)] uppercase"
            >
              {titleLines.map((line, index) => (
                <span key={index} className="block overflow-hidden py-1">
                  <motion.span variants={itemVariants} className="block">
                    {line === "ENTREGA" ? (
                      <span className="text-[#2db84b] inline-block">{line}</span>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            {/* 3. Subtitle */}
            <motion.p
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl text-base font-semibold leading-relaxed text-slate-700 md:text-lg"
            >
              {subtitle}
              <span className="mt-1 block font-extrabold text-slate-900">
                Rápido, seguro y sin que te muevas.
              </span>
            </motion.p>

            {/* 4. Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Button
                size="lg"
                className="h-13 rounded-full bg-[#2db84b] px-8 text-base font-bold text-white hover:bg-[#239a3e] active:scale-[0.98] transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(45,184,75,0.3)] hover:shadow-[0_14px_30px_-5px_rgba(45,184,75,0.4)]"
                onClick={() => {
                  document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Solicitar entrega
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-13 rounded-full border-slate-300/80 bg-white/90 px-8 text-base font-bold text-slate-800 backdrop-blur-md hover:bg-white hover:border-slate-400 active:scale-[0.98] transition-all duration-300 shadow-[0_2px_10px_-2px_rgba(15,23,42,0.05)] hover:shadow-[0_4px_16px_-4px_rgba(15,23,42,0.1)]"
                onClick={() => {
                  document.getElementById("proceso")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                ¿Cómo funciona?
              </Button>
            </motion.div>

            {/* 5. MapCard */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <MapCard />
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Personnel + Orbit Ring + Tracking Widget */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center self-stretch overflow-visible">
            {/* Green Concentric Orbit Ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none flex items-center justify-center"
            >
              <div className="h-[460px] w-[460px] md:h-[580px] md:w-[580px] rounded-full border border-green/30 relative">
                <div className="absolute top-12 right-12 h-3 w-3 rounded-full bg-green animate-ping" />
                <div className="absolute bottom-16 left-8 h-2.5 w-2.5 rounded-full bg-green" />
              </div>
            </motion.div>

            {/* Personnel Photo */}
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex w-full items-end justify-center -translate-x-8 md:-translate-x-14 lg:translate-x-55 lg:translate-y-7"
            >
              <div className="pointer-events-none absolute bottom-12 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-[#2db84b]/15 blur-3xl transition-opacity duration-500 group-hover:bg-[#2db84b]/25" />

              <motion.img
                src="/assets/hero-personas.png"
                alt="Equipo de logística MyG Express"
                className="relative z-10 h-auto max-h-[780px] w-full max-w-[700px] scale-110 md:scale-115 lg:scale-105 object-contain object-bottom opacity-100"
                style={{
                  filter: "drop-shadow(0 20px 25px rgba(0,0,0,.15))",
                  maskImage:
                    "linear-gradient(to bottom, black 0%, black 68%, transparent 76%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 0%, black 68%, transparent 76%)",
                }}
              />
            </motion.div>

            {/* Tracking Widget */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative -mt-36 md:-mt-48 lg:-mt-56 z-20 w-full flex justify-center md:justify-end px-4 md:px-0"
            >
              <TrackingWidget
                onSearchSubmitted={onSearchSubmitted}
                isFetching={isFetching}
                isSearching={isSearching}
                searchError={searchError}
              />
            </motion.div>
          </div>
        </div>

      </div>

      {/* ── INTEGRATED TRACKING RESULT (PHYSICALLY EMBEDDED WITHIN HERO SECTION) ── */}
      {shipment && (
        <motion.div
          id="resultado-busqueda"
          initial={{ opacity: 0, y: 25, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-30 w-full pt-8 md:pt-12 pb-6 md:pb-10 mb-6 md:mb-8 scroll-mt-28 overflow-hidden"
        >
          {/* Ambient Route & Pin Side Graphics (Positioned on Far Outer Screen Edges) */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            {/* Left Side Route Graphic - Outer Left Edge */}
            <div className="absolute left-0 top-0 bottom-0 w-[220px] md:w-[320px] lg:w-[420px] opacity-40 md:opacity-55">
              <svg className="h-full w-full" viewBox="0 0 420 700" fill="none" preserveAspectRatio="xMinYMid slice">
                <defs>
                  <pattern id="sideDotGridLeft" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="3" cy="3" r="1.2" fill="#2db84b" opacity="0.25" />
                  </pattern>
                  <linearGradient id="routeGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2db84b" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#2db84b" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#2db84b" stopOpacity="0.15" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#sideDotGridLeft)" opacity="0.45" />
                <path
                  d="M -50,40 Q 120,160 160,320 T 60,540 T 240,680"
                  stroke="url(#routeGradLeft)"
                  strokeWidth="2.4"
                  strokeDasharray="7 7"
                  fill="none"
                />
                <g transform="translate(160, 320)">
                  <circle r="15" fill="#2db84b" opacity="0.15" />
                  <path
                    d="M0 -12 C-5 -12 -8 -9 -8 -3 C-8 3 0 12 0 12 C0 12 8 3 8 -3 C8 -9 5 -12 0 -12 Z"
                    fill="#2db84b"
                    filter="drop-shadow(0 3px 5px rgba(0,0,0,0.08))"
                  />
                  <circle cx="0" cy="-3" r="3" fill="#ffffff" />
                </g>
              </svg>
            </div>

            {/* Right Side Route Graphic - Outer Right Edge */}
            <div className="absolute right-0 top-0 bottom-0 w-[220px] md:w-[320px] lg:w-[420px] opacity-40 md:opacity-55">
              <svg className="h-full w-full" viewBox="0 0 420 700" fill="none" preserveAspectRatio="xMaxYMid slice">
                <defs>
                  <pattern id="sideDotGridRight" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="21" cy="21" r="1.2" fill="#2db84b" opacity="0.25" />
                  </pattern>
                  <linearGradient id="routeGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2db84b" stopOpacity="0.15" />
                    <stop offset="60%" stopColor="#2db84b" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#2db84b" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#sideDotGridRight)" opacity="0.45" />
                <path
                  d="M 470,40 Q 300,180 260,340 T 360,520 T 180,680"
                  stroke="url(#routeGradRight)"
                  strokeWidth="2.4"
                  strokeDasharray="7 7"
                  fill="none"
                />
                <g transform="translate(260, 340)">
                  <circle r="15" fill="#2db84b" opacity="0.15" />
                  <path
                    d="M0 -12 C-5 -12 -8 -9 -8 -3 C-8 3 0 12 0 12 C0 12 8 3 8 -3 C8 -9 5 -12 0 -12 Z"
                    fill="#2db84b"
                    filter="drop-shadow(0 3px 5px rgba(0,0,0,0.08))"
                  />
                  <circle cx="0" cy="-3" r="3" fill="#ffffff" />
                </g>
              </svg>
            </div>
          </div>

          {/* Cards Content (Centered max 1400px) */}
          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12">
            <TrackingResult
              submittedCode={submittedCode ?? null}
              shipment={shipment}
              isFetching={Boolean(isFetching)}
              error={searchError ?? null}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
