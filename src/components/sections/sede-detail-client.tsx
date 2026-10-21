"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  MessageCircle,
  Truck,
  Package,
  PackageCheck,
  BadgeCheck,
  Building2,
  CircleCheck,
  Navigation,
  Mountain,
  Leaf,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import type { Branch } from "@/lib/constants";

interface SedeDetailClientProps {
  branch: Branch;
}

const REGION_BADGE: Record<string, string> = {
  'la-merced': "LA MERCED - JUNIN",
  satipo: "SATIPO - JUNIN",
  oxapampa: "OXAPAMPA - PASCO",
};

const SEDE_NAME: Record<string, string> = {
  'la-merced': "LA MERCED",
  satipo: "SATIPO",
  oxapampa: "OXAPAMPA",
  huancayo: "HUANCAYO",
};

const SEDE_TAGLINE: Record<string, string> = {
  'la-merced':
    "Centro principal de recepción, despacho y distribución de paquetes para todo el valle de Chanchamayo y su red de puntos conectados.",
  satipo:
    "Centro principal de recepción, despacho y distribución de paquetes para la provincia de Satipo y distritos aledaños.",
  oxapampa:
    "Centro principal de recepción, despacho y distribución de paquetes para la provincia de Oxapampa y rutas conectadas.",
  huancayo:
    "Centro logístico y agencia principal en Huancayo, facilitando la recepción y entrega de compras online y encomiendas en todo el valle del Mantaro.",
};

const PILLS = [
  { icon: Truck, label: "Entregas rápidas" },
  { icon: Package, label: "Punto autorizado" },
  { icon: BadgeCheck, label: "Atención presencial" },
];

const PICKUP_STEPS = [
  { icon: MessageCircle, title: "Recibe tu aviso", description: "Te notificamos por WhatsApp en cuanto tu paquete llegue o salga a reparto." },
  { icon: BadgeCheck, title: "Presenta tu código", description: "Lleva tu DNI y el código de seguimiento para agilizar el recojo en mostrador." },
  { icon: Truck, title: "Recibe tu paquete", description: "Retira tu paquete en la sede o coordina la entrega directamente en tu domicilio." },
];

function parseRanges(hoursWeekdays: string) {
  return hoursWeekdays
    .split("/")
    .map((s) => s.replace(/^[^0-9]+/, "").replace(/\s+$/, "").trim())
    .filter(Boolean);
}

function WhatsIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

export function SedeDetailClient({ branch }: SedeDetailClientProps) {
  const storePhoto = branch.localImage || branch.image;

  const regionBadge = REGION_BADGE[branch.slug] ?? branch.region;
  const sedeName = SEDE_NAME[branch.slug] ?? branch.name;
  const tagline = SEDE_TAGLINE[branch.slug] ?? branch.description;

  const weekdayRanges = parseRanges(branch.hoursWeekdays);
  const saturdayRange = branch.hoursSaturday
    .replace(/^[^0-9]+/, "")
    .replace(/\s+$/, "")
    .trim();

  const agencies = branch.subBranches;

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-900 font-sans selection:bg-[#2db84b] selection:text-white">
      <Header />

      {/* ═══════════════════════════════════════════════ */}
      {/* VISTA MÓVIL EXCLUSIVA (EXACT MATCH TO REFERENCE MOCKUP) */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="block md:hidden w-full bg-[#0a0f1c] text-white pt-24 pb-12 px-4 relative overflow-hidden">
        {/* Photo on Top Right with Left & Bottom Fade Gradient Mask & Shadows */}
        <div className="pointer-events-none absolute top-12 right-0 z-0 h-[270px] w-[58%] overflow-hidden rounded-bl-[2.5rem]">
          <img
            src={storePhoto}
            alt={`Local Sede ${branch.name}`}
            className="h-full w-full object-cover object-top"
            style={{
              filter: "brightness(1.08) contrast(1.12) saturate(1.2)",
            }}
          />
          {/* Degradado de sombra inferior suave y elegante */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/85 to-transparent z-10" />
          {/* Degradado de sombra lateral izquierda */}
          <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#0a0f1c] via-[#0a0f1c]/75 to-transparent z-10" />
          {/* Degradado de oclusión superior */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0a0f1c]/60 to-transparent z-10" />
        </div>

        <div className="relative z-10 flex flex-col">
          {/* Route Icons Trail Accent */}
          <div className="flex items-center gap-2 mb-3.5 opacity-80">
            <span className="h-px w-5 bg-[#0E8F45]" />
            <Mountain className="h-3.5 w-3.5 text-[#0E8F45]" />
            <span className="h-px w-2.5 bg-white/20" />
            <Leaf className="h-3.5 w-3.5 text-[#2db84b]" />
            <span className="h-px w-2.5 bg-white/20" />
            <Package className="h-3.5 w-3.5 text-white/70" />
            <span className="h-px w-2.5 bg-white/20" />
            <Truck className="h-3.5 w-3.5 text-[#0E8F45]" />
            <span className="h-px w-5 bg-[#0E8F45]" />
          </div>

          {/* Back Button Pill */}
          <Link
            href="/#sedes"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[0.72rem] font-bold text-white mb-6 backdrop-blur-md"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[#2db84b]" />
            <span>Volver al mapa de sedes</span>
          </Link>

          {/* Region Tag */}
          <p className="flex items-center gap-1.5 text-[0.7rem] font-black uppercase tracking-wider text-[#2db84b] mb-1">
            <MapPin className="h-3.5 w-3.5 text-[#2db84b]" />
            <span>{regionBadge}</span>
          </p>

          {/* Sede Name */}
          <h1 className="font-sans text-[2.6rem] font-black uppercase leading-none tracking-tight text-white mb-3 max-w-[55%]">
            {sedeName}
          </h1>

          {/* Sede Principal Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0E8F45] text-white shadow-sm">
              <Building2 className="h-3.5 w-3.5" />
            </span>
            <span className="text-sm font-bold text-white">Sede Principal</span>
          </div>

          {/* Tagline */}
          <p className="text-[0.78rem] font-medium leading-relaxed text-white/80 mb-6 max-w-[270px]">
            {tagline}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mb-6">
            <a
              href={`https://wa.me/${branch.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0E8F45] py-3.5 px-6 text-xs font-extrabold text-white shadow-md active:scale-98"
            >
              <WhatsIcon />
              <span>Escribir por WhatsApp</span>
            </a>
            <a
              href={branch.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3.5 px-6 text-xs font-extrabold text-slate-900 shadow-xs active:scale-98"
            >
              <Navigation className="h-4 w-4 text-slate-900" />
              <span>Cómo llegar</span>
            </a>
          </div>

          {/* Pills Row */}
          <div className="flex items-center justify-between text-[0.68rem] font-semibold text-white/85 px-1 mb-6">
            <div className="flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5 text-[#2db84b]" />
              <span>Entregas rápidas</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BadgeCheck className="h-3.5 w-3.5 text-[#2db84b]" />
              <span>Punto autorizado</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-[#2db84b]" />
              <span>Atención presencial</span>
            </div>
          </div>

          {/* Horario de Atención Glass Card */}
          <div className="w-full rounded-2xl bg-[#0e1626]/95 border border-white/12 p-4 flex flex-col gap-3 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#2db84b] animate-pulse" />
              <span className="text-[0.68rem] font-extrabold uppercase tracking-wider text-white">
                HORARIO DE ATENCIÓN
              </span>
            </div>

            <div className="flex items-start justify-between gap-4 text-xs pt-1">
              <span className="text-[0.62rem] font-black uppercase tracking-wider text-white/60">
                LUNES - VIERNES
              </span>
              <div className="flex flex-col items-end gap-0.5 font-bold text-white">
                {weekdayRanges.map((r) => (
                  <span key={r}>{r}</span>
                ))}
              </div>
            </div>

            <div className="h-px w-full bg-white/10" />

            <div className="flex items-start justify-between gap-4 text-xs">
              <span className="text-[0.62rem] font-black uppercase tracking-wider text-white/60">
                SÁBADO
              </span>
              <span className="font-bold text-white">{saturdayRange}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* HERO EDITORIAL PC (hidden md:flex INTACT)      */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative hidden md:flex min-h-[980px] w-full items-center overflow-hidden bg-[#0a0f1c] pb-32">
        {/* ── AMBIENTE LUMINOSO ── */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-1/4 h-[520px] w-[520px] rounded-full bg-[#0E8F45]/[0.02] blur-[130px]" />
          <div className="absolute right-[38%] top-0 h-[320px] w-[520px] rounded-full bg-[#2db84b]/[0.015] blur-[130px]" />
          <div className="absolute -bottom-24 left-1/3 h-[360px] w-[420px] rounded-full bg-[#0E8F45]/[0.012] blur-[120px]" />
          <div
            className="absolute right-8 top-24 grid grid-cols-6 gap-3 opacity-25"
            style={{ backgroundPosition: "center" }}
          >
            {Array.from({ length: 48 }).map((_, i) => (
              <span key={i} className="h-1 w-1 rounded-full bg-emerald-700" />
            ))}
          </div>
        </div>

        {/* ── LÍNEA DE VIAJE vertical animada (ruta) ── */}
        <div className="pointer-events-none absolute left-6 top-1/2 z-0 h-[430px] -translate-y-1/2">
          <div className="relative flex h-full w-px items-center justify-center">
            <span className="absolute inset-y-0 left-0 border-l border-dashed border-white/15" />
            <motion.span
              animate={{ top: ["0%", "100%", "0%"], opacity: [0, 1, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-[3px] block h-1.5 w-1.5 rounded-full bg-[#2db84b] shadow-[0_0_10px_2px_rgba(45,184,75,0.5)]"
            />
            <span className="absolute left-0 top-1/4 -translate-x-1/2 block h-1 w-1 rounded-full bg-white/30" />
            <span className="absolute left-0 top-1/2 -translate-x-1/2 block h-1.5 w-1.5 rotate-45 bg-[#0E8F45]/70" />
            <span className="absolute left-0 top-3/4 -translate-x-1/2 block h-1 w-1 rounded-full bg-white/30" />
          </div>
        </div>

        {/* ── FOTOGRAFÍA: protagonista, integrada a la derecha ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute top-8 bottom-[40px] right-0 z-0 h-[900px] w-[75%]"
          style={{
            maskImage:
              "linear-gradient(to left, black 60%, rgba(7,12,22,0.5) 80%, rgba(7,12,22,0.15) 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to left, black 60%, rgba(7,12,22,0.5) 80%, rgba(7,12,22,0.15) 92%, transparent 100%)",
          }}
        >
          <img
            src={storePhoto}
            alt={`Local Sede ${branch.name}`}
            className="h-full w-full object-cover object-[center_top]"
            style={{ filter: "brightness(1.07) contrast(1.12) saturate(1.24)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(7,12,22,0.82) 0%, rgba(7,12,22,0.65) 24%, rgba(7,12,22,0.35) 48%, rgba(7,12,22,0.12) 70%, rgba(255,255,255,0) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 44% 40% at 32% 18%, rgba(255,255,255,0.08), transparent 62%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 125% 115% at center, transparent 64%, rgba(7,12,22,0.14) 100%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a0f1c]/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0a0f1c] to-transparent" />
        </motion.div>

        {/* ── CONTENIDO EDITORIAL ── */}
        <div className="relative z-20 flex min-h-[980px] w-full items-center justify-start px-8 lg:px-14 pb-28 pt-32">
          <div className="max-w-[600px]">
            {/* Detalle de diseño superior: ruta selva, viaje, carga */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12 flex items-center gap-2.5"
            >
              <span className="h-px w-10 bg-gradient-to-r from-transparent via-[#0E8F45] to-white/30" />
              <motion.span
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Mountain className="h-5 w-5 text-[#0E8F45]" />
              </motion.span>
              <span className="h-px w-7 border-t border-dashed border-white/30" />
              <motion.span
                animate={{ x: [-4, 4, -4] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="grid h-7 w-7 place-items-center rounded-full border border-white/25 bg-white/[0.05]"
              >
                <Leaf className="h-3 w-3 text-[#2db84b]" />
              </motion.span>
              <span className="h-7 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
              <motion.span
                animate={{ rotate: [0, -6, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Package className="h-4 w-4 text-white/80" />
              </motion.span>
              <span className="h-px w-7 border-t border-dashed border-white/30" />
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Truck className="h-4 w-4 text-[#0E8F45]" />
              </motion.span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent via-white/30 to-[#0E8F45]" />
            </motion.div>

            <Link
              href="/#sedes"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold tracking-wide text-white/85 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/80 hover:bg-white/[0.12] hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-[#0E8F45] transition-transform duration-300 group-hover:-translate-x-0.5" />
              Volver al mapa de sedes
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 flex items-center gap-2.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2db84b] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0E8F45]" />
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#0E8F45]">
                {regionBadge}
              </span>
            </motion.div>

            {/* La palabra clave primero */}
            <motion.h1
              initial={{ opacity: 0, y: 26, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 font-sans font-black uppercase leading-[1.02] tracking-[-0.01em] text-white text-[clamp(2.4rem,6vw,4.25rem)]"
            >
              {sedeName}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 flex items-center gap-3"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0E8F45] text-white shadow-[0_8px_20px_-8px_rgba(14,143,69,0.6)]">
                <Building2 className="h-5 w-5" />
              </span>
              <p className="text-xl font-semibold tracking-tight text-white/95 md:text-2xl">
                Sede Principal
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-md text-base leading-relaxed text-white/75 md:text-lg"
            >
              {tagline}
            </motion.p>

            {/* Botones principales */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href={`https://wa.me/${branch.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#0E8F45] px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0a7438] hover:shadow-[0_18px_40px_-18px_rgba(14,143,69,0.5)] active:scale-[0.98]"
              >
                <WhatsIcon />
                Escribir por WhatsApp
              </a>
              <a
                href={branch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0E8F45] hover:text-[#0E8F45] active:scale-[0.98]"
              >
                <Navigation className="h-5 w-5" />
                Cómo llegar
              </a>
            </motion.div>

            {/* Pills premium */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              {PILLS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="group flex items-center gap-2 px-4 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
                >
                  <Icon className="h-4 w-4 text-[#0E8F45] transition-colors duration-300 group-hover:text-[#2db84b]" />
                  <span className="text-sm font-semibold text-white/85 transition-colors duration-300">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── TARJETA DE HORARIOS: pequeña, glass, sobre la foto ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-[22%] right-[8%] z-30 w-[400px] max-w-[92%]"
        >
          <div
            className="relative overflow-hidden rounded-2xl p-5 transition-all duration-500 will-change-transform hover:-translate-y-1.5 hover:border-[#0E8F45]/40"
            style={{
              background: "rgba(7,12,22,0.3)",
              backdropFilter: "blur(18px) saturate(1.4)",
              WebkitBackdropFilter: "blur(18px) saturate(1.4)",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: "0 24px 60px -24px rgba(2,6,12,0.7)",
            }}
          >
            <div className="pointer-events-none absolute -right-12 -top-14 h-36 w-36 animate-pulse rounded-full bg-[#0E8F45]/40 blur-2xl" />
            <div className="pointer-events-none absolute -left-10 top-1/2 h-28 w-28 animate-pulse rounded-full bg-[#2db84b]/25 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 right-8 h-24 w-24 animate-pulse rounded-full bg-white/15 blur-2xl" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0E8F45] opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#0E8F45]" />
                </span>
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.9)]">
                  Horario de Atención
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2.5">
              <div className="flex items-start justify-between gap-4">
                <span className="w-28 shrink-0 whitespace-nowrap pt-0.5 text-[0.62rem] font-extrabold uppercase tracking-wider text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.9)]">
                  Lunes - Viernes
                </span>
                <div className="flex flex-col items-end gap-1">
                  {weekdayRanges.map((r) => (
                    <span
                      key={r}
                      className="whitespace-nowrap text-sm font-bold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.95)]"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
              <div className="h-px w-full bg-white/10" />
              <div className="flex items-start justify-between gap-4">
                <span className="w-16 shrink-0 pt-0.5 text-[0.62rem] font-extrabold uppercase tracking-wider text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.9)]">
                  Sábado
                </span>
                <span className="whitespace-nowrap text-sm font-bold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.95)]">
                  {saturdayRange}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── TRANSICIÓN DE SECCIÓN CURVA ESTÁTICA Y ELEVADA ── */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 190"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative block w-full h-[110px] sm:h-[150px] lg:h-[190px]"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Sombra de oclusión ambiental limpia */}
              <filter id="clean-soft-shadow" x="-10%" y="-40%" width="120%" height="180%">
                <feDropShadow dx="0" dy="-8" stdDeviation="10" floodColor="#000000" floodOpacity="0.22" />
              </filter>

              {/* Degradado esmeralda sutil de fondo */}
              <linearGradient id="subtle-emerald-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0E8F45" stopOpacity="0.18" />
                <stop offset="50%" stopColor="#2db84b" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#0E8F45" stopOpacity="0.06" />
              </linearGradient>
            </defs>

            {/* Capa 1: Resplandor esmeralda sutil estático de fondo */}
            <path
              d="M0 50 C 380 135, 740 5, 1100 100 C 1280 140, 1380 45, 1440 60 L 1440 190 L 0 190 Z"
              fill="url(#subtle-emerald-grad)"
            />

            {/* Capa 2: Trazo estático principal que une con el fondo blanco #f8fafc */}
            <path
              d="M0 65 C 380 145, 740 15, 1100 115 C 1280 155, 1380 60, 1440 75 L 1440 190 L 0 190 Z"
              fill="#f8fafc"
              filter="url(#clean-soft-shadow)"
            />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* AGENCIAS · RED DE PUNTOS CONECTADOS (MAPA UX/UI) */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#f8fafc] px-4 py-12 sm:px-6 md:py-28 lg:px-8">
        {/* ── FONDO AMBIENTAL: TEXTURA MAPA & RUTA ANIMADA ── */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: "radial-gradient(circle, #0E8F45 1.5px, transparent 1.5px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Resplandores esmeralda en los laterales */}
          <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-[#0E8F45]/[0.06] blur-[100px]" />
          <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-[#0E8F45]/[0.05] blur-[100px]" />

          {/* Línea vectorial de ruta interactiva (Izquierda) */}
          <svg className="absolute -left-10 top-12 hidden h-[600px] w-96 opacity-25 xl:block" viewBox="0 0 400 600" fill="none">
            <path
              d="M 50 50 Q 200 200 100 400 T 300 550"
              stroke="#0E8F45"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
            <circle cx="50" cy="50" r="6" fill="#0E8F45" />
            <circle cx="100" cy="400" r="4" fill="#0E8F45" />
            <circle cx="300" cy="550" r="6" fill="#2db84b" />
          </svg>

          {/* Línea vectorial de ruta interactiva (Derecha) */}
          <svg className="absolute -right-10 bottom-8 hidden h-[600px] w-96 opacity-25 xl:block" viewBox="0 0 400 600" fill="none">
            <path
              d="M 350 50 Q 150 250 250 450 T 100 580"
              stroke="#0E8F45"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
            <circle cx="350" cy="50" r="6" fill="#2db84b" />
            <circle cx="250" cy="450" r="4" fill="#0E8F45" />
            <circle cx="100" cy="580" r="6" fill="#0E8F45" />
          </svg>

          {/* Nodos de radar animados en los laterales */}
          <div className="absolute left-8 top-1/4 hidden flex-col items-center gap-2 lg:flex">
            <span className="relative flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0E8F45]/40 opacity-75" />
              <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-[#0E8F45] shadow-md" />
            </span>
            <span className="h-20 w-px bg-gradient-to-b from-[#0E8F45]/40 via-[#0E8F45]/15 to-transparent" />
          </div>

          <div className="absolute right-8 bottom-1/3 hidden flex-col items-center gap-2 lg:flex">
            <span className="h-20 w-px bg-gradient-to-t from-[#0E8F45]/40 via-[#0E8F45]/15 to-transparent" />
            <span className="relative flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2db84b]/40 opacity-75" />
              <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-[#2db84b] shadow-md" />
            </span>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-8 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-[0.72rem] font-black uppercase tracking-[0.22em] text-[#0E8F45]">
                <MapPin className="h-4 w-4 text-[#0E8F45]" />
                <span>Red de puntos</span>
              </div>
              <h2 className="mt-2 md:mt-4 font-sans text-2.5xl sm:text-3xl font-black tracking-tight text-slate-900 md:text-5xl md:leading-[1.05]">
                Puntos de atención{" "}
                <span className="text-[#0E8F45]">conectados</span>
              </h2>
              <div className="mt-3 md:mt-5 h-1 w-16 md:w-20 rounded-full bg-gradient-to-r from-[#0E8F45] to-[#2db84b]" />
            </div>
            <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-slate-500">
              Extendemos nuestro servicio a más puntos de la provincia para estar más cerca de ti.
            </p>
          </div>

          <div
            className={`grid gap-4 sm:gap-6 ${
              agencies.length === 3
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : agencies.length === 4
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {agencies.map((ag, i) => (
              <motion.article
                key={ag.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex gap-4 sm:gap-5 overflow-hidden rounded-2xl sm:rounded-[26px] border border-slate-200/90 bg-white p-4.5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0E8F45]/40 hover:shadow-[0_20px_45px_-15px_rgba(15,23,42,0.08)] shadow-xs"
              >
                {/* acento superior */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 sm:h-0.5 origin-left bg-gradient-to-r from-[#0E8F45] to-[#2db84b]" />
                {/* marca de agua */}
                <span className="pointer-events-none absolute right-3.5 top-3.5 select-none font-sans text-2xl font-black tracking-tighter text-slate-200/80 transition-colors duration-500 group-hover:text-[#0E8F45]/25 sm:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* rail de red */}
                <div className="relative flex flex-none flex-col items-center">
                  <div className="relative z-10 flex h-11 w-11 sm:h-16 sm:w-16 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <img
                      src="/assets/punto-icon.png"
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span className="mt-2 h-full w-px bg-gradient-to-b from-[#0E8F45]/30 via-[#0E8F45]/10 to-transparent" />
                </div>

                {/* contenido */}
                <div className="min-w-0 flex-1">
                  <span className="inline-flex items-center gap-1.5 text-[0.65rem] sm:text-[0.68rem] font-black uppercase tracking-wider text-[#0E8F45] bg-[#0E8F45]/8 px-2.5 py-0.5 rounded-full">
                    <CircleCheck className="h-3 w-3 text-[#0E8F45]" />
                    Activo
                  </span>
                  <h3 className="mt-1.5 font-sans text-base sm:text-lg font-extrabold tracking-tight text-slate-900">
                    {ag.name.replace(/^Agencia\s+/i, "Punto ")}
                  </h3>
                  <p className="mt-0.5 text-xs sm:text-sm font-semibold text-[#0E8F45]">
                    {ag.type.replace(/^Agencia\s+/i, "Punto ")}
                  </p>

                  <div className="mt-3 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-100 transition-colors duration-300 group-hover:bg-slate-50/80">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-[#0E8F45]" />
                    <span className="text-xs sm:text-sm font-medium text-slate-600 truncate">{ag.address}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* ESTADO DE LA SEDE · GUÍA DE RECOJO + COBERTURA */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f8fafc] via-white to-[#f8fafc] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Encabezado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <div className="flex items-center justify-center gap-2 text-[0.72rem] font-black uppercase tracking-[0.22em] text-[#0E8F45]">
              <span className="h-px w-8 bg-[#0E8F45]/40" />
              <span>Tu paquete en {sedeName}</span>
              <span className="h-px w-8 bg-[#0E8F45]/40" />
            </div>
            <h2 className="mt-4 font-sans text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              Recojo y despacho
              <span className="text-[#0E8F45]"> sin complicaciones</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-500 md:text-base">
              Todo lo que necesitas saber al llegar a nuestra sede: pasos para recoger tu paquete y
              cobertura en tu zona.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-12">
            {/* PANEL · GUÍA DE RECOJO + COBERTURA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col rounded-[32px] border border-slate-200/90 bg-white p-7 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.12)] md:p-9 lg:col-span-12"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#0E8F45]/10 text-[#0E8F45]">
                  <PackageCheck className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight text-slate-900">Guía de recojo</h3>
                  <p className="text-sm font-medium text-slate-400">Tu paquete llegó a la sede. Así lo recibes.</p>
                </div>
              </div>

              <div className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-3">
                {PICKUP_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.title} className="relative flex flex-col items-start rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100 transition-colors duration-300 hover:bg-white hover:shadow-md">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2db84b] text-white shadow-[0_8px_20px_-8px_rgba(45,184,75,0.5)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0E8F45] text-[0.6rem] font-black text-white">0{i + 1}</span>
                        <h4 className="text-sm font-bold tracking-tight text-slate-900">{step.title}</h4>
                      </div>
                      <p className="mt-1.5 text-[0.8rem] leading-relaxed text-slate-500">{step.description}</p>
                    </div>
                  );
                })}
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
