"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Calendar,
  Check,
  Clock,
  Copy,
  MapPin,
  Mail,
  Package,
  Phone,
  Truck,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { TrackingHistory } from "@/components/tracking/tracking-history";
import { cityName, statusPresentation } from "@/lib/tracking-format";
import { SITE } from "@/lib/constants";
import type { Shipment } from "@/types/tracking";

interface TrackingResultProps {
  submittedCode: string | null;
  shipment: Shipment | null;
  isFetching: boolean;
  error: Error | null;
}

function fallbackCopy(text: string): boolean {
  try {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
}

function copyToClipboard(text: string): boolean {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => {
      fallbackCopy(text);
    });
    return true;
  }
  return fallbackCopy(text);
}

export function TrackingResult({
  submittedCode,
  shipment,
  isFetching,
  error,
}: TrackingResultProps) {
  const [copied, setCopied] = useState(false);

  if (!submittedCode) return null;

  const isUrbano =
    submittedCode.startsWith("EN") ||
    submittedCode.startsWith("UR") ||
    submittedCode.startsWith("WYB") ||
    shipment?.source?.toLowerCase().includes("urbano");

  const handleCopyCode = (codeToCopy: string) => {
    const ok = copyToClipboard(codeToCopy);
    setCopied(true);
    if (ok) toast.success("Código copiado al portapapeles");
    else toast.error("No se pudo copiar el código");
    setTimeout(() => setCopied(false), 2000);
  };

  if (isFetching && !shipment) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-12 h-[120px] animate-pulse rounded-[20px] bg-white shadow-sm border border-slate-200" />
        <div className="xl:col-span-7 h-[520px] animate-pulse rounded-[20px] bg-white shadow-sm border border-slate-200" />
        <div className="xl:col-span-5 h-[520px] animate-pulse rounded-[20px] bg-white shadow-sm border border-slate-200" />
      </div>
    );
  }

  if (error && !shipment) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center bg-white rounded-3xl p-10 border border-slate-200 shadow-sm max-w-2xl mx-auto">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-3xl font-black text-rose-500 border border-rose-200">
          !
        </div>
        <p className="text-lg font-extrabold text-slate-800">{error.message}</p>
        <p className="text-sm text-slate-500">
          Verifica el código <span className="font-mono font-bold text-slate-700">{submittedCode}</span>
        </p>
      </div>
    );
  }

  if (!shipment) return null;

  const destinationLabel = shipment.destination
    ? cityName(shipment.destination)
    : "Satipo";

  const operatorLabel = shipment.operator || (isUrbano ? "Urbano Express" : "MyG Express");

  const courierUnit = shipment.vehicle || "No asignada";
  const vehicleTypeLabel = shipment.vehicleType || "Unidad logística";
  const recipientName = shipment.recipient || "Consignado no disponible";
  const recipientPhone = shipment.recipientPhone || "";
  const recipientEmail = shipment.recipientEmail || "";
  const senderLabel = shipment.sender || "MyG Express";

  const pres = statusPresentation(shipment);
  const isFailed = pres.key === "failed";
  const isLive = (pres.key === "outForDelivery" || pres.key === "transit") && !isFailed;

  // Stepper derivado del estado real
  const statusKey = (shipment.status ?? "").toUpperCase();
  const isFailedAttempt = isFailed || /VISITADO|NO SE ENTREGO|INTENTAMOS|NO PUDIMOS/.test(statusKey);

  const activeStep = /ENTREGAD|ENTREGAMOS|ENTREGA A/.test(statusKey)
    ? 4
    : isFailedAttempt || /ENTREGARSE|SALIO|REPARTO|VISITA/.test(statusKey)
      ? 3
      : /SEDE|LLEGO|RECIBID|ADMISI|ARRIBO/.test(statusKey)
        ? 2
        : /TRANSIT|TRASLAD|RUTA|CAMINO|DESPACH/.test(statusKey)
          ? 1
          : 0;

  const stepper5 = [
    { label: "En preparación", done: activeStep > 0, active: false, failed: false, icon: Package },
    { label: "En tránsito", done: activeStep > 1, active: false, failed: false, icon: Truck },
    { label: "En sede", done: activeStep > 2, active: false, failed: false, icon: MapPin },
    {
      label: isFailedAttempt ? "Visitado" : "Salió a entrega",
      done: !isFailedAttempt && activeStep > 3,
      active: activeStep === 3,
      failed: isFailedAttempt,
      icon: isFailedAttempt ? AlertTriangle : Truck,
    },
    { label: "Entregado", done: activeStep >= 4, active: activeStep === 4, failed: false, icon: Check },
  ];

  const stepperProgress = (activeStep / 4) * 100;

  return (
    <>
      {/* ── 1. VISTA MÓVIL EXCLUSIVA (< md: Ultra Nítida con Camión 3D Destacado) ── */}
      <div className="block md:hidden space-y-4">
        {/* Banner Superior Oscuro con Camión 3D y Código */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-5 text-white shadow-2xl border border-slate-800">
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 h-44 w-44 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />

          {/* Fila 1: Operador + Badge de Estado Pulsante */}
          <div className="flex items-center justify-between gap-2 relative z-10">
            <span className="text-[0.65rem] font-extrabold uppercase tracking-widest text-emerald-400">
              {operatorLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[0.78rem] font-black text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{pres.name}</span>
            </span>
          </div>

          {/* Fila 2: Código + Ilustración Camión 3D */}
          <div className="mt-3 flex items-center justify-between gap-3 relative z-10">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono truncate">
                  {shipment.code || submittedCode}
                </h3>
                <button
                  type="button"
                  onClick={() => handleCopyCode(shipment.code || submittedCode)}
                  className="p-1 text-slate-400 hover:text-white active:scale-90 transition-all shrink-0 cursor-pointer"
                  title="Copiar código"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
              <p className="text-[0.7rem] font-medium text-slate-400 mt-0.5">
                Unidad: <span className="text-emerald-400 font-extrabold font-mono">{courierUnit}</span>
              </p>
            </div>

            {/* Camión 3D Flotante Ilustrado */}
            <motion.div
              className="relative shrink-0 h-20 w-28 flex items-center justify-center"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="/assets/tracking-truck.png"
                alt="Unidad de reparto 3D"
                className="h-full w-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
          </div>

          {/* Fila 3: Titular del Estado */}
          <div className="mt-4 border-t border-slate-800/80 pt-3 relative z-10 flex items-start gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-slate-950 font-bold mt-0.5">
              <pres.icon className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white leading-snug">
                {pres.headline}
              </h4>
              <p className="text-[0.7rem] font-medium text-slate-300 mt-0.5 leading-relaxed">
                {pres.subline}
              </p>
              {isFailed && (
                <div className="mt-2.5">
                  <a
                    href={`https://wa.me/${SITE.whatsapp.replace(/[^\d]/g, "")}?text=${encodeURIComponent(`Hola MyG Express, requiero coordinar la entrega de mi paquete código ${shipment.code}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#2db84b] px-3 py-1.5 text-[0.7rem] font-extrabold text-white shadow-md"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>Coordinar entrega por WhatsApp</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stepper Móvil de 5 Pasos Nítido */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-xs font-bold border-b border-slate-100 pb-2">
            <span className="text-[#2db84b] uppercase tracking-wider text-[0.68rem] font-extrabold">PROGRESO DEL ENVÍO</span>
            <span className="font-mono text-slate-900 font-extrabold text-[0.75rem]">Paso {Math.min(activeStep + 1, 5)} de 5</span>
          </div>

          {/* Barra de progreso */}
          <div className="relative h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-[#2db84b] rounded-full transition-all duration-500"
              style={{ width: `${Math.max(15, stepperProgress)}%` }}
            />
          </div>

          {/* Indicadores de 5 pasos */}
          <div className="flex items-center justify-between pt-1">
            {stepper5.map((st, idx) => {
              const isCurrent = idx === activeStep;
              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-[0.68rem] font-black transition-all ${
                      st.failed
                        ? "bg-red-500 text-white shadow-md"
                        : isCurrent
                          ? "bg-[#2db84b] text-white ring-4 ring-emerald-100 scale-110 shadow-md"
                          : st.done
                            ? "bg-emerald-100 text-[#2db84b] font-black"
                            : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {st.failed ? "!" : st.done ? "✓" : idx + 1}
                  </div>
                  <span className={`text-[0.6rem] font-black ${isCurrent ? "text-[#2db84b]" : st.done ? "text-slate-800" : "text-slate-400"}`}>
                    {st.label.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grid 2x2 de Detalles */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-1.5 mb-1 text-[#2db84b]">
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-[0.6rem] font-extrabold uppercase tracking-wider text-slate-400">DESTINO</span>
            </div>
            <strong className="block text-xs font-black text-slate-900 truncate">{destinationLabel}</strong>
            {shipment.address && (
              <span className="block text-[0.65rem] font-medium text-slate-500 truncate mt-0.5">{shipment.address}</span>
            )}
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-1.5 mb-1 text-[#2db84b]">
              <Calendar className="h-3.5 w-3.5" />
              <span className="text-[0.6rem] font-extrabold uppercase tracking-wider text-slate-400">ACTUALIZADO</span>
            </div>
            <strong className="block text-xs font-black text-slate-900 truncate">{shipment.updatedAt || "Sin fecha"}</strong>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-1.5 mb-1 text-slate-600">
              <User className="h-3.5 w-3.5" />
              <span className="text-[0.6rem] font-extrabold uppercase tracking-wider text-slate-400">CONSIGNADO</span>
            </div>
            <strong className="block text-xs font-black text-slate-900 truncate">{recipientName}</strong>
            {recipientEmail && (
              <a href={`mailto:${recipientEmail}`} className="mt-0.5 flex items-center gap-1 truncate text-[0.62rem] font-bold text-[#0E8F45]">
                <Mail className="h-3 w-3 shrink-0" />
                <span className="truncate">{recipientEmail}</span>
              </a>
            )}
            {recipientPhone && (
              <a
                href={`tel:${recipientPhone.replace(/[^\d+]/g, "")}`}
                className="inline-flex items-center gap-1 text-[0.65rem] font-bold text-[#2db84b] mt-0.5"
              >
                <Phone className="h-2.5 w-2.5" />
                <span>{recipientPhone}</span>
              </a>
            )}
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-1.5 mb-1 text-slate-600">
              <Truck className="h-3.5 w-3.5" />
              <span className="text-[0.6rem] font-extrabold uppercase tracking-wider text-slate-400">UNIDAD</span>
            </div>
            <strong className="block text-xs font-black text-[#2db84b] font-mono truncate">{courierUnit}</strong>
            <span className="block text-[0.65rem] font-semibold text-slate-400">{vehicleTypeLabel}</span>
          </div>
        </div>

        {/* Historial de Seguimiento Móvil */}
        <div>
          <TrackingHistory shipment={shipment} />
        </div>
      </div>

      {/* ── 2. VISTA DESKTOP (md+: Original PC Intacto) ── */}
      <div className="hidden md:grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8 items-start">
        {/* ── LEFT CARD: STATUS + CODE + DETAIL PILLS ── */}
        <div className="xl:col-span-7 bg-white rounded-[20px] pt-6 px-6 pb-6 md:pt-8 md:px-8 md:pb-8 border border-slate-200/60 shadow-[0_32px_80px_-24px_rgba(15,23,42,0.06),0_8px_24px_-8px_rgba(15,23,42,0.03)] space-y-6 mt-3 md:mt-5">

          {/* Header: Circle Icon + Code + Unidad de reparto */}
          <div className="flex flex-wrap items-start md:items-center justify-between gap-6 relative">
            <div className="flex items-start gap-3.5 sm:gap-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex h-16 w-16 md:h-20 md:w-20 lg:h-22 lg:w-22 items-center justify-center shrink-0 -mt-4 -ml-2.5 md:-mt-6 md:-ml-3.5 group cursor-pointer"
              >
                {/* Resplandor ambiental elegante detrás de la caja 3D */}
                <motion.div
                  className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#2db84b]/30 via-[#22c55e]/20 to-[#22d3ee]/30 blur-xl -z-0"
                  animate={{ opacity: [0.4, 0.75, 0.4], scale: [0.95, 1.12, 0.95] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                />

                {/* Contenedor flotante 3D de la caja */}
                <motion.img
                  src="/assets/tracking-box-icon.png"
                  alt="Caja MyG Express 3D"
                  className="relative z-10 h-full w-full object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.14)]"
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 1.5, 0, -1.5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{
                    scale: 1.08,
                    rotate: 0,
                    y: -7,
                    transition: { duration: 0.25, ease: "easeOut" },
                  }}
                />
              </motion.div>
              <div className="-mt-2.5 md:-mt-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                    {shipment.code || submittedCode}
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(shipment.code || submittedCode)}
                    className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"
                    title="Copiar código"
                  >
                    {copied ? <Check className="h-5 w-5 text-[#2db84b]" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs md:text-sm font-semibold text-slate-500 mt-0.5">
                  {operatorLabel}
                </p>
              </div>
            </div>

            {/* Unidad de reparto con fondo colorido animado */}
            <motion.div
              initial={{ opacity: 0, x: 24, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative shrink-0 rounded-3xl"
            >
              <motion.div
                className="absolute -inset-6 rounded-full bg-gradient-to-br from-[#2db84b] via-[#22d3ee] to-[#818cf8] opacity-40 blur-2xl"
                aria-hidden="true"
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Líneas de velocidad */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl" aria-hidden="true">
                {[
                  { top: "30%", width: "50%", duration: 2.2, delay: 0 },
                  { top: "48%", width: "35%", duration: 1.8, delay: 0.6 },
                  { top: "66%", width: "60%", duration: 2.8, delay: 1.2 },
                ].map((line, i) => (
                  <motion.div
                    key={i}
                    className="absolute right-0 h-[3px] rounded-full bg-gradient-to-r from-transparent via-white/80 to-transparent"
                    style={{ top: line.top, width: line.width }}
                    animate={{ x: [0, -340], opacity: [0, 0.9, 0.9, 0] }}
                    transition={{ duration: line.duration, repeat: Infinity, ease: "linear", delay: line.delay }}
                  />
                ))}
              </div>

              <motion.img
                src="/assets/tracking-truck.png"
                alt="Unidad de reparto"
                className="relative z-10 h-28 md:h-36 lg:h-40 w-auto object-contain p-3 drop-shadow-xl"
                animate={{ x: [0, 80, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          {/* Indicador de Estado actual */}
          <div className="flex items-center gap-2.5 -mt-10 md:-mt-12 flex-wrap">
            <div className="flex items-center gap-2">
              {isLive ? (
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#16a34a]" />
                </span>
              ) : (
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#16a34a]" />
              )}
              <span className="text-sm md:text-base font-extrabold text-slate-900 tracking-tight">
                Estado actual: <span className="text-[#16a34a] font-black">{pres.name}</span>
              </span>
            </div>
            <span className="text-slate-300 font-bold">•</span>
            <span className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-slate-500">
              <Clock className="h-3.5 w-3.5 text-[#16a34a]" />
              {pres.updatedAtLabel}
            </span>
          </div>

          {/* Mensaje principal del estado */}
          <div className="flex items-start gap-3.5 mt-6 md:mt-8">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-white shadow-xs">
              {pres.key === "delivered" ? (
                <Check className="h-4.5 w-4.5 stroke-[2.5]" />
              ) : (
                <pres.icon className="h-4.5 w-4.5 stroke-[2.2]" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm md:text-base font-bold tracking-tight text-slate-900">
                {pres.headline}
              </h4>
              <p className="text-xs font-medium text-slate-700 mt-1 leading-relaxed">
                {pres.subline}
              </p>
              {isFailed && (
                <div className="mt-3">
                  <a
                    href={`https://wa.me/${SITE.whatsapp.replace(/[^\d]/g, "")}?text=${encodeURIComponent(`Hola MyG Express, requiero coordinar la entrega de mi paquete código ${shipment.code}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#2db84b] px-4 py-2 text-xs font-extrabold text-white shadow-md shadow-[#2db84b]/20 hover:bg-[#239a3e] transition-all"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>Coordinar entrega por WhatsApp con MyG Express</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* 5-Step Horizontal Stepper Line PC */}
          <div className="relative pt-2 pb-2 px-2">
            <div className="absolute top-[1.65rem] left-6 right-6 h-1 bg-slate-100 rounded-full -z-0" />
            <div
              className="absolute top-[1.65rem] left-6 h-1 bg-[#2db84b] rounded-full -z-0"
              style={{ width: `calc(${stepperProgress}% - 1.5rem)` }}
            />

            <div className="relative z-10 flex items-start justify-between">
              {stepper5.map((st) => (
                <div key={st.label} className="flex flex-col items-center gap-2.5 text-center w-20">
                  <motion.div
                    className="relative"
                    animate={
                      st.failed || st.active
                        ? { scale: [1, 1.09, 1, 1.05, 1] }
                        : {}
                    }
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {(st.failed || st.active) && (
                      <motion.span
                        className={`absolute -inset-1 rounded-full blur-xs ${
                          st.failed ? "bg-[#dc2626]/35" : "bg-[#2db84b]/35"
                        }`}
                        animate={{ opacity: [0.35, 0.75, 0.35] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        aria-hidden="true"
                      />
                    )}
                    <div
                      className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full transition-all ${
                        st.failed
                          ? "bg-[#dc2626] text-white ring-4 ring-red-100 shadow-md"
                          : st.active
                            ? "bg-[#2db84b] text-white ring-4 ring-[#e6f7eb] shadow-md"
                            : st.done
                              ? "bg-[#2db84b] text-white shadow-xs"
                              : "bg-slate-100 text-slate-400 border border-slate-200"
                      }`}
                    >
                      <st.icon className="h-5 w-5 stroke-[2.5]" />
                    </div>
                  </motion.div>
                  <span
                    className={`text-[11px] md:text-xs font-bold leading-tight ${
                      st.failed
                        ? "text-[#dc2626] font-extrabold"
                        : st.active
                          ? "text-[#2db84b]"
                          : st.done
                            ? "text-slate-800"
                            : "text-slate-400"
                    }`}
                  >
                    {st.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Bottom Detail Cards Grid PC */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">

            {/* DESTINO */}
            <div className="bg-[#f8fafc] p-4 md:p-5 rounded-2xl border border-slate-200/70 flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#2db84b] shadow-xs border border-slate-100">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  DESTINO
                </span>
                <strong className="block text-xs md:text-sm font-extrabold text-slate-900 truncate">
                  {destinationLabel}
                </strong>
                {shipment.address && (
                  <span className="block truncate text-[11px] font-medium text-slate-500 mt-0.5">
                    {shipment.address}
                  </span>
                )}
              </div>
            </div>

            {/* ACTUALIZADO */}
            <div className="bg-[#f8fafc] p-4 md:p-5 rounded-2xl border border-slate-200/70 flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#2db84b] shadow-xs border border-slate-100">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  ACTUALIZADO
                </span>
                <strong className="block text-xs md:text-sm font-extrabold text-slate-900 truncate">
                  {shipment.updatedAt || "Sin actualización"}
                </strong>
              </div>
            </div>

            {/* CONSIGNADO */}
            <div className="bg-[#f8fafc] p-4 md:p-5 rounded-2xl border border-slate-200/70 flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-slate-600 shadow-xs border border-slate-100">
                <User className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  CONSIGNADO
                </span>
                <strong className="block text-xs md:text-sm font-extrabold text-slate-900 truncate">
                  {recipientName}
                </strong>
                {recipientEmail && (
                  <a
                    href={`mailto:${recipientEmail}`}
                    className="mt-0.5 flex items-center gap-1 truncate text-[11px] font-bold text-[#2db84b] hover:underline"
                  >
                    <Mail className="h-3 w-3 shrink-0" />
                    <span className="truncate">{recipientEmail}</span>
                  </a>
                )}
                {recipientPhone && (
                  <a
                    href={`tel:${recipientPhone.replace(/[^\d+]/g, "")}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2db84b] hover:underline mt-0.5"
                  >
                    <Phone className="h-3 w-3" />
                    <span>{recipientPhone}</span>
                  </a>
                )}
                <span className="block truncate text-[10px] font-medium text-slate-400 mt-0.5">
                  Remite: {senderLabel}
                </span>
              </div>
            </div>

            {/* UNIDAD */}
            <div className="bg-[#f8fafc] p-4 md:p-5 rounded-2xl border border-slate-200/70 flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-slate-600 shadow-xs border border-slate-100">
                <Truck className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  UNIDAD
                </span>
                <strong className="block text-xs md:text-sm font-extrabold text-[#2db84b] font-mono truncate">
                  {courierUnit}
                </strong>
                <span className="block text-[10px] font-semibold text-slate-400">{vehicleTypeLabel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: ILUSTRACIÓN + HISTORIAL PC ── */}
        <div className="xl:col-span-5 space-y-6">
          <div className="w-full overflow-hidden rounded-[20px] border border-white/60 shadow-[0_10px_30px_-14px_rgba(15,23,42,0.15)]">
            <img
              src="/assets/tracking-hero-illustration.png"
              alt="Rastreo MyG Express 3D"
              className="h-40 w-full object-cover object-center md:h-44"
            />
          </div>

          <TrackingHistory shipment={shipment} />
        </div>
      </div>
    </>
  );
}
