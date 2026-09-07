"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Compass,
  Rocket,
  ShieldCheck,
  MapPin,
  Zap,
  Building2,
  TrendingUp,
  CheckCircle2,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SectionTag } from "@/components/shared/section-tag";
import { useReveal } from "@/hooks/use-reveal";

const TIMELINE = [
  {
    year: "2018",
    title: "Fundación y Orígenes",
    metric: "Selva Central",
    event: "Nace MyG Express con el propósito claro de romper el aislamiento logístico y conectar la Selva Central con el comercio nacional.",
    icon: Rocket,
  },
  {
    year: "2019",
    title: "Primera Sede Principal",
    metric: "La Merced",
    event: "Inauguración de nuestra primera sede logística en La Merced, ofreciendo atención directa y personalizada para compradores online.",
    icon: Building2,
  },
  {
    year: "2021",
    title: "Expansión Regional",
    metric: "3 Sedes Estratégicas",
    event: "Apertura de agencias clave en Satipo y Oxapampa, logrando una red de cobertura integral en toda la provincia.",
    icon: MapPin,
  },
  {
    year: "2024",
    title: "Consolidación y Liderazgo",
    metric: "+500 Envíos / Mes",
    event: "Superamos los 500 envíos mensuales, formando alianzas estratégicas con las tiendas e-commerce más destacadas del Perú.",
    icon: TrendingUp,
  },
];

function CustomCheck({
  className = "h-5 w-5",
  colorClass = "text-emerald-500",
}: {
  className?: string;
  colorClass?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.18 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="shrink-0 mt-0.5 flex items-center justify-center"
    >
      <CheckCheck className={`${className} ${colorClass} stroke-[2.5]`} />
    </motion.div>
  );
}

export function AboutSection() {
  const { ref: headerRef, isVisible: headerVisible } = useReveal();
  const { ref: mvRef, isVisible: mvVisible } = useReveal();
  const { ref: timelineRef, isVisible: timelineVisible } = useReveal();
  
  const [activeYear, setActiveYear] = useState<string>("2024");
  const [mobileYearIndex, setMobileYearIndex] = useState<number>(3); // 2024 default

  const activeMobileTimeline = (TIMELINE[mobileYearIndex] || TIMELINE[0])!;
  const ActiveTimelineIcon = activeMobileTimeline.icon;

  const nextMobileYear = () => {
    setMobileYearIndex((prev) => (prev + 1) % TIMELINE.length);
  };

  const prevMobileYear = () => {
    setMobileYearIndex((prev) => (prev - 1 + TIMELINE.length) % TIMELINE.length);
  };

  return (
    <section id="nosotros" className="relative overflow-hidden scroll-mt-20 bg-slate-50/60 px-4 sm:px-6 md:px-10 py-12 md:py-24">
      {/* ── Luces y Blobs Flotantes de Fondo ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 top-1/4 h-72 sm:h-96 w-72 sm:w-96 rounded-full bg-emerald-300/20 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -right-20 top-2/4 h-80 sm:h-[420px] w-80 sm:w-[420px] rounded-full bg-green/15 blur-3xl"
        />

        {/* Patrones de puntos decorativos a los lados */}
        <div className="absolute left-4 top-40 hidden h-64 w-24 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px] opacity-25 lg:block" />
        <div className="absolute right-4 top-1/3 hidden h-64 w-24 bg-[radial-gradient(#16a34a_1px,transparent_1px)] [background-size:16px_16px] opacity-25 lg:block" />
      </div>

      {/* ── Badges Flotantes Interactivos en Desktop ── */}
      <div className="pointer-events-none absolute inset-x-0 top-32 mx-auto hidden max-w-7xl justify-between px-6 lg:flex">
        {/* Lado Izquierdo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="pointer-events-auto flex flex-col gap-4 pt-12"
        >
          <motion.div
            whileHover={{ scale: 1.08, rotate: -2 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            className="flex items-center gap-2.5 px-2 py-1"
          >
            <div className="flex items-center justify-center text-emerald-600">
              <Zap className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold text-slate-700">Envíos Express</span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.08, rotate: 2 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 } }}
            className="ml-6 flex items-center gap-2.5 px-2 py-1"
          >
            <div className="flex items-center justify-center text-emerald-600">
              <MapPin className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold text-slate-700">Selva Central 100%</span>
          </motion.div>
        </motion.div>

        {/* Lado Derecho */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="pointer-events-auto flex flex-col items-end gap-4 pt-20"
        >
          <motion.div
            whileHover={{ scale: 1.08, rotate: 2 }}
            animate={{ y: [0, -9, 0] }}
            transition={{ y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 } }}
            className="flex items-center gap-2.5 px-2 py-1"
          >
            <div className="flex items-center justify-center text-emerald-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold text-slate-700">Entregas Seguras</span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.08, rotate: -2 }}
            animate={{ y: [0, -11, 0] }}
            transition={{ y: { duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 } }}
            className="mr-6 flex items-center gap-2.5 px-2 py-1"
          >
            <div className="flex items-center justify-center text-emerald-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold text-slate-700">Innovación Digital</span>
          </motion.div>
        </motion.div>
      </div>

      {/* ── HEADER DE SECCIÓN ── */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={headerVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <SectionTag>Sobre Nosotros</SectionTag>

        {/* Móvil Layout (< md) */}
        <h2 className="block md:hidden mt-3 font-black text-[2.4rem] leading-[0.9] tracking-[-0.01em] text-slate-950 uppercase">
          MÁS QUE UNA EMPRESA<br />
          DE <span className="text-[#2db84b] inline-block">LOGÍSTICA</span>
        </h2>

        {/* Desktop Layout (md+) */}
        <h2 className="hidden md:block mt-4 font-display text-5xl leading-tight text-foreground md:text-6xl lg:text-7xl">
          Más que una empresa<br />
          de <span className="relative inline-block text-green">
            logística
            <motion.span
              initial={{ scaleX: 0 }}
              animate={headerVisible ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -bottom-1 left-0 h-1.5 w-full origin-left rounded-full bg-green/30"
            />
          </span>
        </h2>

        <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-xs sm:text-base leading-relaxed text-slate-600 font-medium">
          MyG Express nació con el propósito de ofrecer soluciones logísticas ágiles, seguras y cercanas en la Selva Central.
          Hoy conectamos a personas y negocios con destinos de todo el Perú, brindando atención confiable en La Merced, Satipo y Oxapampa.
        </p>
      </motion.div>

      {/* ── MISIÓN & VISIÓN ── */}
      {/* 1. VISTA MÓVIL EXCLUSIVA (< md: Tarjetas Glassmorphism Compactas & Elegantes) */}
      <div className="block md:hidden relative z-10 mt-8 space-y-4">
        {/* Tarjeta Misión */}
        <div className="rounded-2xl border border-emerald-500/20 bg-slate-900 p-5 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
          
          <div className="flex items-center gap-2.5 mb-3.5 border-b border-slate-800 pb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2db84b] text-white shadow-md">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[0.65rem] font-extrabold uppercase tracking-widest text-emerald-400">PROPÓSITO</span>
              <h3 className="text-lg font-black text-white leading-none">Nuestra Misión</h3>
            </div>
          </div>

          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <div className="flex items-start gap-2.5">
              <CustomCheck className="h-4.5 w-4.5" colorClass="text-emerald-400" />
              <p>
                Ser el Courier preferido en Selva Central y Nacional por nuestra <strong className="text-white">innovación, confiabilidad y excelencia</strong>.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <CustomCheck className="h-4.5 w-4.5" colorClass="text-emerald-400" />
              <p>
                Conectar ciudades y potenciar negocios con envíos express seguros, puntuales y transparentes.
              </p>
            </div>
          </div>
        </div>

        {/* Tarjeta Visión */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 text-slate-900 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-2.5 mb-3.5 border-b border-slate-100 pb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-emerald-400 shadow-md">
              <Rocket className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[0.65rem] font-extrabold uppercase tracking-widest text-[#2db84b]">META 2030</span>
              <h3 className="text-lg font-black text-slate-900 leading-none">Nuestra Visión</h3>
            </div>
          </div>

          <div className="space-y-3 text-xs leading-relaxed text-slate-600">
            <div className="flex items-start gap-2.5">
              <CustomCheck className="h-4.5 w-4.5" colorClass="text-[#2db84b]" />
              <p>
                Soluciones de transporte en Selva Central y a nivel nacional con altos estándares de <strong className="text-slate-900">seguridad y puntualidad</strong>.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <CustomCheck className="h-4.5 w-4.5" colorClass="text-[#2db84b]" />
              <p>
                Ser el operador courier líder del Perú en <strong className="text-[#2db84b]">2030</strong>, reconocido por velocidad en última milla e innovación constante.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. VISTA DESKTOP (md+: Original PC Intacto) */}
      <motion.div
        ref={mvRef}
        initial="hidden"
        animate={mvVisible ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        className="hidden md:grid relative z-10 mx-auto mt-16 max-w-4xl gap-12 md:gap-14"
      >
        {/* Misión PC */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 35 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } } }}
          className="group relative"
        >
          <div className="mb-6 flex items-center justify-center gap-3 text-center">
            <div className="flex items-center justify-center text-emerald-600 transition-transform duration-300 group-hover:scale-110">
              <Compass className="h-6 w-6" />
            </div>
            <h3 className="font-display text-3xl text-foreground md:text-4xl">
              Nuestra <span className="text-green">Misión</span>
            </h3>
          </div>

          <div className="space-y-5 md:px-6">
            <div className="flex items-start gap-3.5 transition-transform duration-200 hover:translate-x-1">
              <CustomCheck className="h-5 w-5" colorClass="text-emerald-600 group-hover:text-emerald-500" />
              <p className="text-base leading-relaxed text-muted-foreground">
                Ser la empresa de Courier preferida a nivel Selva Central y Nacional por nuestra{" "}
                <strong className="text-foreground">innovación, confiabilidad y excelencia</strong> en el servicio,
                expandiendo nuestra red para conectar cada rincón con eficiencia y sostenibilidad.
              </p>
            </div>

            <div className="flex items-start gap-3.5 transition-transform duration-200 hover:translate-x-1">
              <CustomCheck className="h-5 w-5" colorClass="text-emerald-600 group-hover:text-emerald-500" />
              <p className="text-base leading-relaxed text-muted-foreground">
                Conectar ciudades y potenciar negocios mediante envíos locales express y soluciones logísticas a nivel nacional.
                Nos comprometemos a entregar cada paquete con{" "}
                <strong className="text-foreground">total seguridad, puntualidad y transparencia</strong>,
                simplificando la vida de las personas y el comercio.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Visión PC */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 35 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } } }}
          className="group relative"
        >
          <div className="mb-6 flex items-center justify-center gap-3 text-center">
            <div className="flex items-center justify-center text-emerald-600 transition-transform duration-300 group-hover:scale-110">
              <Rocket className="h-6 w-6" />
            </div>
            <h3 className="font-display text-3xl text-foreground md:text-4xl">
              Nuestra <span className="text-green">Visión</span>
            </h3>
          </div>

          <div className="space-y-5 md:px-6">
            <div className="flex items-start gap-3.5 transition-transform duration-200 hover:translate-x-1">
              <CustomCheck className="h-5 w-5" colorClass="text-emerald-600 group-hover:text-emerald-500" />
              <p className="text-base leading-relaxed text-muted-foreground">
                Brindar soluciones de transporte y envíos en la Selva Central y a nivel nacional con altos estándares de{" "}
                <strong className="text-foreground">seguridad y puntualidad</strong>,
                garantizando que cada paquete llegue a su destino de forma óptima y convirtiéndonos en aliados estratégicos
                para el crecimiento de nuestros clientes.
              </p>
            </div>

            <div className="flex items-start gap-3.5 transition-transform duration-200 hover:translate-x-1">
              <CustomCheck className="h-5 w-5" colorClass="text-emerald-600 group-hover:text-emerald-500" />
              <p className="text-base leading-relaxed text-muted-foreground">
                Ser el operador de courier líder del país en <strong className="text-green">2030</strong>,
                reconocidos por la máxima velocidad en la última milla urbana y una red nacional impecable.
                Aspiramos a ser el aliado logístico más confiable de la era digital a través de la{" "}
                <strong className="text-foreground">innovación tecnológica constante</strong>.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── NUESTRA HISTORIA / LÍNEA DE TIEMPO ── */}
      
      {/* 1. VISTA MÓVIL EXCLUSIVA: Carrusel Táctil Deslizable (< md) */}
      <div className="block md:hidden relative z-10 mt-12">
        <div className="mb-6 text-center">
          <SectionTag>Trayectoria</SectionTag>
          <h3 className="mt-2 font-black text-3xl text-slate-950 uppercase">
            Nuestra <span className="text-[#2db84b]">Historia</span>
          </h3>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            Desliza para explorar los hitos clave de nuestra red logística.
          </p>
        </div>

        {/* Pestañas de Años */}
        <div className="flex items-center justify-between gap-1.5 bg-slate-200/70 p-1 rounded-2xl mb-4">
          {TIMELINE.map((item, idx) => (
            <button
              key={item.year}
              onClick={() => setMobileYearIndex(idx)}
              className={`flex-1 py-1.5 text-xs font-black rounded-xl transition-all ${
                mobileYearIndex === idx
                  ? "bg-[#2db84b] text-white shadow-md scale-102"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              {item.year}
            </button>
          ))}
        </div>

        {/* Tarjeta Animada de Año Seleccionado */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMobileTimeline.year}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl bg-slate-900 p-6 text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-500/25 blur-2xl" />

              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl font-black text-emerald-400 tracking-tight">
                  {activeMobileTimeline.year}
                </span>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 shadow-md">
                  <ActiveTimelineIcon className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-4">
                <span className="inline-block text-[0.62rem] font-extrabold uppercase tracking-wider text-emerald-400">
                  {activeMobileTimeline.metric}
                </span>
                <h4 className="mt-1 text-lg font-black text-white leading-snug">
                  {activeMobileTimeline.title}
                </h4>
              </div>

              <p className="mt-2.5 text-xs leading-relaxed text-slate-300 font-medium">
                {activeMobileTimeline.event}
              </p>

              {/* Botones de navegación en la tarjeta */}
              <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-3">
                <span className="font-mono text-[0.7rem] font-bold text-emerald-400">
                  Fase 0{mobileYearIndex + 1} / 04
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prevMobileYear}
                    aria-label="Año anterior"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-white active:scale-90"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <button
                    onClick={nextMobileYear}
                    aria-label="Año siguiente"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2db84b] text-white active:scale-90"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 2. VISTA DESKTOP (md+: Corporativo, Tarjetas Más Grandes & Tipografía Ultra Nítida) */}
      <motion.div
        ref={timelineRef}
        initial={{ opacity: 0, y: 35 }}
        animate={timelineVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="hidden md:block relative z-10 mx-auto mt-28 max-w-6xl antialiased"
      >
        <div className="mb-14 text-center">
          <SectionTag>Trayectoria</SectionTag>
          <h3 className="mt-3 font-sans text-4xl text-slate-950 md:text-5xl font-black tracking-tight">
            Nuestra <span className="text-[#2db84b]">Historia</span>
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600 font-medium">
            El camino recorrido construyendo la red logística de mayor confianza en la Selva Central del Perú.
          </p>
        </div>

        {/* Grid Interactivo de Hitos PC (Tarjetas Espaciosas & Ultra Nítidas) */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {TIMELINE.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeYear === item.year;

            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                animate={timelineVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * index }}
                onMouseEnter={() => setActiveYear(item.year)}
                className={`group relative flex flex-col justify-between rounded-3xl p-7 min-h-[310px] transition-colors duration-300 cursor-pointer border-2 ${
                  isActive
                    ? "bg-slate-950 text-white border-emerald-500 shadow-2xl shadow-slate-950/30"
                    : "bg-white text-slate-900 border-slate-200/90 shadow-md hover:border-emerald-500/60 hover:shadow-xl"
                }`}
              >
                <div>
                  {/* Encabezado: Año y Métrica */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-4xl font-black tracking-tight transition-colors duration-300 ${
                        isActive ? "text-emerald-400" : "text-emerald-600"
                      }`}
                    >
                      {item.year}
                    </span>

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-colors duration-300 ${
                        isActive
                          ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/50"
                          : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Título e Métrica con tipografía sans corporativa nítida */}
                  <div className="mt-6">
                    <span
                      className={`block text-[0.725rem] font-black uppercase tracking-widest transition-colors duration-300 ${
                        isActive ? "text-emerald-400" : "text-emerald-600"
                      }`}
                    >
                      {item.metric}
                    </span>
                    <h4
                      className={`mt-1.5 font-sans text-lg font-extrabold leading-snug tracking-tight transition-colors duration-300 ${
                        isActive ? "text-white" : "text-slate-950"
                      }`}
                    >
                      {item.title}
                    </h4>
                  </div>

                  {/* Descripción nítida y legible */}
                  <p
                    className={`mt-3 text-[0.825rem] leading-relaxed font-normal transition-colors duration-300 ${
                      isActive ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {item.event}
                  </p>
                </div>

                {/* Footer corporativo */}
                <div
                  className={`mt-7 flex items-center justify-between border-t pt-4 transition-colors duration-300 ${
                    isActive ? "border-slate-800" : "border-slate-100"
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                      isActive ? "text-emerald-400" : "text-slate-400"
                    }`}
                  >
                    Fase 0{index + 1}
                  </span>
                  <CheckCircle2
                    className={`h-4.5 w-4.5 transition-colors duration-300 ${
                      isActive ? "text-emerald-400 opacity-100" : "text-slate-300 opacity-50 group-hover:opacity-100"
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
