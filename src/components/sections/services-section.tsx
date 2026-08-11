"use client";

import { useState, useEffect, type ReactNode } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Smile,
  Clock,
  Loader2,
} from "lucide-react";
import { ServiceIcon } from "@/components/sections/service-icons";
import { SITE } from "@/lib/constants";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  waMessage: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "envio-paquetes",
    title: "Envío de Paquetes",
    description: "Envíos locales y nacionales con máxima seguridad y puntualidad.",
    waMessage: "Hola, quisiera información sobre el servicio de Envío de Paquetes.",
  },
  {
    id: "recojo-domicilio",
    title: "Recojo a Domicilio",
    description: "Programa tu recojo fácil y rápido donde te encuentres.",
    waMessage: "Hola, quisiera programar un Recojo a Domicilio.",
  },
  {
    id: "rastreo-tiempo-real",
    title: "Rastreo en Tiempo Real",
    description: "Monitorea la ubicación de tu paquete desde el inicio a la entrega.",
    waMessage: "Hola, necesito ayuda con el Rastreo de mi envío en tiempo real.",
  },
  {
    id: "atencion-empresas",
    title: "Atención para Empresas",
    description: "Soluciones logísticas a medida, tarifas corporativas y envíos masivos.",
    waMessage: "Hola, me interesa solicitar información sobre Atención para Empresas y tarifas corporativas.",
  },
  {
    id: "entregas-express",
    title: "Entregas Express",
    description: "Servicio prioritario urgente con máxima rapidez y eficiencia.",
    waMessage: "Hola, necesito contratar el servicio prioritario de Entregas Express.",
  },
  {
    id: "atencion-personalizada",
    title: "Atención Personalizada",
    description: "Soporte dedicado directo por WhatsApp y teléfono en todo momento.",
    waMessage: "Hola, quisiera contactar con Atención Personalizada.",
  },
];

function CircularStat({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-12 w-12 flex-shrink-0 rounded-full bg-gradient-to-b from-[#2db84b] via-[#0E8F45] to-[#0A6F35] p-[1.5px] shadow-[0_8px_16px_-8px_rgba(14,143,69,0.25)] transition-all duration-300 group-hover:from-slate-900 group-hover:via-slate-800 group-hover:to-slate-900 group-hover:shadow-[0_10px_20px_-8px_rgba(15,23,42,0.3)]">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white transition-colors duration-300 group-hover:bg-slate-900">
        {children}
      </div>
    </div>
  );
}

export function ServicesSection() {
  const waNumber = SITE.whatsapp.replace(/[^\d]/g, "");
  const [currentPage, setCurrentPage] = useState(0);
  const [navLoading, setNavLoading] = useState<"prev" | "next" | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 1 card per page on mobile (< 640px), 3 cards per page on desktop
  const cardsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(SERVICES.length / cardsPerPage);
  const currentServices = SERVICES.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage);

  const navigate = (dir: "prev" | "next") => {
    if (navLoading) return;
    setNavLoading(dir);
    window.setTimeout(() => {
      setCurrentPage((prev) =>
        dir === "next"
          ? (prev + 1) % totalPages
          : (prev - 1 + totalPages) % totalPages
      );
      setNavLoading(null);
    }, 380);
  };

  return (
    <section
      id="servicios"
      className="relative z-10 scroll-mt-28 sm:scroll-mt-32 overflow-x-clip bg-[#f8fafc] px-4 sm:px-6 md:px-8 lg:px-8 xl:px-8 pt-10 sm:pt-14 md:pt-16 pb-16 sm:pb-24 md:pb-28"
    >
      {/* ── Fondo con degradado ambiental y trama sutil ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Curva vectorial suave en la esquina izquierda */}
        <div className="absolute -left-20 top-0 h-[480px] w-[480px] rounded-full bg-gradient-to-br from-emerald-100/40 via-emerald-50/20 to-transparent blur-3xl" />
        <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-l from-slate-100/60 to-transparent blur-2xl" />
      </div>

      <div className="relative z-20 mx-auto w-full max-w-[1650px]">
        {/* ── CABECERA MÓVIL EXCLUSIVA DE SERVICIOS (< lg) ── */}
        <div className="block lg:hidden w-full pb-4">
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="h-[3px] w-7 flex-shrink-0 rounded-full bg-[#0E8F45]" />
            <span className="text-[0.7rem] font-black uppercase tracking-[0.2em] text-[#0E8F45]">
              NUESTROS SERVICIOS
            </span>
          </div>

          <div className="grid grid-cols-[1.15fr_0.85fr] items-end gap-1">
            <div className="flex flex-col gap-1.5 pt-1">
              <h2 className="font-sans text-[2.2rem] sm:text-[2.6rem] font-black leading-[1.02] tracking-tight text-slate-950">
                Soluciones<br />
                logísticas<br />
                <span className="text-[#0E8F45] block">que impulsan</span>
                <span className="text-[#0E8F45] block">tu negocio</span>
              </h2>

              <p className="mt-2 text-[0.78rem] sm:text-[0.85rem] font-normal leading-relaxed text-slate-500 max-w-[240px]">
                Ofrecemos servicios integrales y personalizados para que tus envíos lleguen a su destino de forma segura, rápida y eficiente.
              </p>
            </div>

            {/* Persona Agrandada al Costado de las Letras (Sin Fondo de Camión en Celular) */}
            <div className="relative flex justify-end items-end h-full">
              <Image
                src="/assets/servicios-personal-v2.png"
                alt="Personal MyG Express"
                width={1024}
                height={1536}
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 38vw, 1px"
                quality={85}
                className="h-auto w-full max-h-[380px] object-contain object-bottom scale-[1.35] translate-y-2 -translate-x-1"
                style={{
                  maskImage: "linear-gradient(to bottom, black 84%, rgba(0,0,0,0.5) 94%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 84%, rgba(0,0,0,0.5) 94%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* ── CABECERA CORPORATIVA DE DOS COLUMNAS DE PC (lg+: ORIGINAL INTACTA) ── */}
        <div className="hidden lg:grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          
          {/* ── COLUMNA IZQUIERDA: TEXTO MÁS GRANDE Y EXTENDIDO A LA IZQUIERDA ── */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start justify-start text-left w-full pl-0 ml-0">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="flex items-center gap-3 text-left justify-start"
            >
              <span className="h-[3.5px] w-8 flex-shrink-0 rounded-full bg-[#0E8F45]" />
              <span className="text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-[#0E8F45]">
                NUESTROS SERVICIOS
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-left font-sans text-4xl sm:text-5xl lg:text-[56px] xl:text-[66px] font-black tracking-tight text-slate-950 leading-[1.08] lg:leading-[1.05]"
            >
              Soluciones logísticas{" "}
              <br className="hidden sm:block" />
              <span className="text-[#0E8F45]">que impulsan tu negocio</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-left max-w-2xl text-base sm:text-lg lg:text-xl font-medium leading-relaxed text-slate-500"
            >
              Ofrecemos servicios integrales y personalizados para que tus envíos lleguen a su destino de forma segura, rápida y eficiente.
            </motion.p>
          </div>

          {/* ── COLUMNA DERECHA: CAMIÓN MYG EXPRESS (AMPLIADO EXCLUSIVAMENTE ÉL HACIA ABAJO) + PERSONA INTACTA ── */}
          <div className="relative lg:col-span-6 xl:col-span-6 flex items-center justify-end pr-0 mr-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-[800px] xl:max-w-[920px] 2xl:max-w-[1020px] flex justify-end pr-0 mr-0 translate-x-8 sm:translate-x-14 lg:translate-x-20 xl:translate-x-[120px] 2xl:translate-x-[145px]"
            >
              {/* Imagen del camión de fondo ampliada y desplazada un poco más arriba */}
              <div className="relative w-full overflow-visible flex justify-end scale-[1.08] sm:scale-[1.12] lg:scale-[1.16] xl:scale-[1.20] origin-top-right -mt-4 sm:-mt-6 lg:-mt-8 xl:-mt-12 -translate-y-2 sm:-translate-y-4 lg:-translate-y-6">
                <img
                  src="/assets/servicios-camion.jpg"
                  alt="Camión MyG Express"
                  className="h-auto w-full object-contain pointer-events-none select-none ml-auto"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, black 0%, black 65%, rgba(0,0,0,0.4) 85%, transparent 98%), linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 8%, rgba(0,0,0,0.88) 20%, rgba(0,0,0,1) 32%, rgba(0,0,0,1) 90%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 0%, black 65%, rgba(0,0,0,0.4) 85%, transparent 98%), linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 8%, rgba(0,0,0,0.88) 20%, rgba(0,0,0,1) 32%, rgba(0,0,0,1) 90%, transparent 100%)",
                    maskComposite: "intersect",
                    WebkitMaskComposite: "intersect",
                  }}
                />

                {/* Capas de desvanecimiento sutil y suave únicamente en el borde inferior bajo */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/45 to-transparent z-10" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f8fafc] via-[#f8fafc]/70 to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-28 sm:w-36 md:w-44 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/55 to-transparent z-10 opacity-80" />
              </div>

              {/* ── IMAGEN DE LA PERSONA / PERSONAL MYG EXPRESS (OCULTA EN PC COMO SE SOLICITÓ) ── */}
              {/* Se ha quitado la persona únicamente para PC / Desktop */}
            </motion.div>
          </div>
        </div>


        {/* ── CONTENEDOR DE CARROUSEL DE SERVICIOS (COMPACTO EN CELULAR | ELEVADO & CORPORATIVO EN PC) ── */}
        <div className="relative mt-1 sm:-mt-6 md:-mt-10 lg:-mt-12 z-30 mx-auto max-w-6xl">
          {/* Botón Flecha Izquierda Dinámico Corporativo (Visible en Celular y PC) */}
          <button
            onClick={() => navigate("prev")}
            disabled={navLoading !== null}
            aria-label="Servicios anteriores"
            className={`group absolute -left-2.5 sm:-left-6 top-1/2 z-30 flex -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition-all duration-300 active:scale-95 ${
              navLoading !== null
                ? "cursor-wait opacity-80"
                : "hover:border-slate-900 hover:bg-slate-900 hover:text-white hover:shadow-[0_12px_25px_rgba(15,23,42,0.25)] hover:scale-105"
            }`}
          >
            {navLoading === "prev" ? (
              <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin text-[#0E8F45]" strokeWidth={2.4} />
            ) : (
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:-translate-x-0.5" strokeWidth={2.2} />
            )}
          </button>

          {/* Botón Flecha Derecha Dinámico Corporativo (Visible en Celular y PC) */}
          <button
            onClick={() => navigate("next")}
            disabled={navLoading !== null}
            aria-label="Siguientes servicios"
            className={`group absolute -right-2.5 sm:-right-6 top-1/2 z-30 flex -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition-all duration-300 active:scale-95 ${
              navLoading !== null
                ? "pointer-events-none opacity-80"
                : "hover:border-slate-900 hover:bg-slate-900 hover:text-white hover:shadow-[0_12px_25px_rgba(15,23,42,0.25)] hover:scale-105"
            }`}
          >
            {navLoading === "next" ? (
              <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin text-[#0E8F45]" strokeWidth={2.4} />
            ) : (
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.2} />
            )}
          </button>

          {/* Barra de progreso de carga al navegar entre páginas */}
          <div className="pointer-events-none absolute inset-x-0 -top-2 z-20 h-1 overflow-hidden rounded-full">
            <AnimatePresence>
              {navLoading && (
                <motion.div
                  key="nav-progress"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.38, ease: "easeInOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-[#0E8F45] via-[#2db84b] to-[#0E8F45] shadow-[0_0_12px_rgba(45,184,75,0.5)]"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Grid de Tarjetas (Compacto Celular | Corporativo PC) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              drag={isMobile ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (isMobile) {
                  if (info.offset.x < -35) navigate("next");
                  else if (info.offset.x > 35) navigate("prev");
                }
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className={`relative z-20 grid gap-4 sm:gap-6 ${
                isMobile ? "grid-cols-1 max-w-[290px] mx-auto cursor-grab active:cursor-grabbing" : "sm:grid-cols-2 lg:grid-cols-3"
              } px-1 sm:px-2 transition-opacity duration-300 ${
                navLoading ? "opacity-60" : ""
              }`}
            >
              {currentServices.map((service, index) => {
                return (
                  <motion.article
                    key={service.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group relative flex flex-col justify-between rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-7 min-h-0 sm:min-h-[250px] shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300"
                  >
                    <div>
                      {/* Cabecera: Icono + Título */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex h-8.5 w-8.5 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-lg sm:rounded-2xl bg-emerald-50 border border-emerald-500/20 text-[#0E8F45] transition-all duration-300 group-hover:bg-[#0E8F45] group-hover:text-white group-hover:border-[#0E8F45] group-hover:scale-105 shadow-xs">
                          <ServiceIcon
                            name={service.id}
                            className="h-4 w-4 sm:h-6 sm:w-6"
                            strokeWidth={2.2}
                          />
                        </div>

                        <h3 className="font-sans text-xs sm:text-lg font-black sm:font-bold tracking-tight text-slate-900 sm:text-slate-950 leading-tight sm:leading-snug">
                          {service.title}
                        </h3>
                      </div>

                      {/* Descripción */}
                      <p className="mt-2 sm:mt-4 text-[0.74rem] sm:text-sm font-medium sm:font-normal leading-relaxed text-slate-500 sm:text-slate-600">
                        {service.description}
                      </p>
                    </div>

                    {/* Footer: Enlace "Saber más" */}
                    <div className="mt-2.5 sm:mt-6 flex items-center justify-between border-t border-slate-100/90 sm:border-slate-100 pt-2 sm:pt-4">
                      <a
                        href={`https://wa.me/${waNumber}?text=${encodeURIComponent(service.waMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-1.5 text-[0.74rem] sm:text-sm font-bold text-[#0E8F45] hover:text-[#0A6F35] transition-colors duration-200"
                      >
                        <span>Saber más</span>
                        <ArrowRight
                          className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-200 group-hover/link:translate-x-1"
                          strokeWidth={2.2}
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Indicadores de Puntos de Carrousel (Pagination Dots) */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                aria-label={`Ir a la página de servicios ${idx + 1}`}
                className={`h-2.5 transition-all duration-300 rounded-full ${
                  currentPage === idx
                    ? "w-8 bg-[#0E8F45]"
                    : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── BANNER INFERIOR DE ESTADÍSTICAS CORPORATIVAS (ANCHO HORIZONTAL COMPACTO) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 sm:mt-14 max-w-6xl mx-auto rounded-[28px] sm:rounded-[32px] border border-slate-100 bg-white p-6 sm:p-7 shadow-[0_12px_36px_-15px_rgba(0,0,0,0.05)]"
        >
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {/* Stat 1: Envíos realizados */}
            <div className="group flex items-center gap-3.5">
              <CircularStat>
                <Package className="h-[22px] w-[22px] text-[#0E8F45] transition-colors duration-300 group-hover:text-white" strokeWidth={2.2} />
              </CircularStat>
              <div>
                <p className="font-sans text-2xl sm:text-3xl font-black text-slate-900">+120K</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">Envíos realizados</p>
              </div>
            </div>

            {/* Stat 2: Clientes satisfechos */}
            <div className="group flex items-center gap-3.5">
              <CircularStat>
                <Smile className="h-[22px] w-[22px] text-[#0E8F45] transition-colors duration-300 group-hover:text-white" strokeWidth={2.2} />
              </CircularStat>
              <div>
                <p className="font-sans text-2xl sm:text-3xl font-black text-slate-900">+98%</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">Clientes satisfechos</p>
              </div>
            </div>

            {/* Stat 3: Cobertura nacional */}
            <div className="group flex items-center gap-3.5">
              <CircularStat>
                <MapPin className="h-[22px] w-[22px] text-[#0E8F45] transition-colors duration-300 group-hover:text-white" strokeWidth={2.2} />
              </CircularStat>
              <div>
                <p className="font-sans text-2xl sm:text-3xl font-black text-slate-900">+150</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">Cobertura nacional</p>
              </div>
            </div>

            {/* Stat 4: Atención al cliente */}
            <div className="group flex items-center gap-3.5">
              <CircularStat>
                <Clock className="h-[22px] w-[22px] text-[#0E8F45] transition-colors duration-300 group-hover:text-white" strokeWidth={2.2} />
              </CircularStat>
              <div>
                <p className="font-sans text-2xl sm:text-3xl font-black text-slate-900">24/7</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">Atención al cliente</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
