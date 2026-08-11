"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  ArrowUpRight,
  Building2,
  PackageCheck,
  MessageSquare,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { BRANCHES } from "@/lib/constants";
import { useReveal } from "@/hooks/use-reveal";

function MobileBranchesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % BRANCHES.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + BRANCHES.length) % BRANCHES.length);

  return (
    <div className="block md:hidden w-full">
      {/* ── MOBILE SECTION HEADING (EXACT MATCH TO USER REFERENCE MOCKUP) ── */}
      <div className="flex flex-col items-center text-center px-4 mb-2">
        <span className="text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-[#2db84b] mb-1">
          PRESENCIA REGIONAL
        </span>
        <h2
          style={{ fontFamily: "'Impact', 'Anton', 'Bebas Neue', sans-serif" }}
          className="text-[2.6rem] font-black leading-[0.88] uppercase tracking-[-0.01em] text-slate-950 mb-2"
        >
          NUESTRAS<br />
          <span className="text-[#2db84b]">3 SEDES</span>
        </h2>
        <p className="text-[0.82rem] font-normal leading-relaxed text-slate-500 max-w-[320px]">
          Estratégicamente ubicadas en la Selva Central del Perú para garantizar entregas rápidas y seguras en toda la región.
        </p>
      </div>

      {/* ── 3D PLAYING CARD CAROUSEL STACK WITH FULL TOUCH SWIPE GESTURES (RAISED UP) ── */}
      <div className="-mt-3 relative w-full h-[495px] flex items-center justify-center overflow-hidden py-0 px-2 touch-pan-y">
        {BRANCHES.map((branch, i) => {
          const isCurrent = i === activeIndex;
          const isPrev = i === (activeIndex - 1 + BRANCHES.length) % BRANCHES.length;
          const isNext = i === (activeIndex + 1) % BRANCHES.length;

          if (!isCurrent && !isPrev && !isNext) return null;

          let transformClass = "";
          let zIndex = 10;
          let opacity = 0.65;

          if (isCurrent) {
            transformClass = "scale-100 translate-x-0 z-20 shadow-[0_20px_45px_rgba(0,0,0,0.12)] border-slate-200/80";
            zIndex = 30;
            opacity = 1;
          } else if (isPrev) {
            transformClass = "scale-[0.88] -translate-x-[26%] -rotate-6 z-10 opacity-70 shadow-md";
            zIndex = 10;
          } else if (isNext) {
            transformClass = "scale-[0.88] translate-x-[26%] rotate-6 z-10 opacity-70 shadow-md";
            zIndex = 10;
          }

          return (
            <motion.div
              key={branch.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                const swipeThreshold = 35;
                if (info.offset.x < -swipeThreshold) {
                  handleNext();
                } else if (info.offset.x > swipeThreshold) {
                  handlePrev();
                }
              }}
              onClick={() => setActiveIndex(i)}
              className={`absolute w-[84vw] max-w-[330px] rounded-[28px] bg-white border border-slate-100 p-4 transition-all duration-500 ease-out cursor-grab active:cursor-grabbing ${transformClass}`}
              style={{ zIndex, opacity }}
            >
              {/* Top Row: Number */}
              <div className="flex items-center justify-between mb-2.5 px-1">
                <div className="flex flex-col items-start">
                  <span className="text-sm font-extrabold text-[#2db84b] leading-none">
                    {String(branch.id).padStart(2, "0")}
                  </span>
                  <span className="h-[2px] w-4 bg-[#2db84b] mt-0.5 rounded-full" />
                </div>
              </div>

              {/* Photo inside card */}
              <div className="relative h-[175px] w-full overflow-hidden rounded-2xl mb-3 bg-slate-100">
                <img
                  src={branch.image}
                  alt={branch.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Region Tag */}
              <p className="flex items-center gap-1 text-[0.68rem] font-black uppercase tracking-wider text-[#2db84b] mb-1">
                <MapPin className="h-3 w-3 text-[#2db84b]" />
                <span>{branch.region}</span>
              </p>

              {/* Sede Title */}
              <h3
                style={{ fontFamily: "'Impact', 'Anton', 'Bebas Neue', sans-serif" }}
                className="text-[1.45rem] font-black leading-[1.05] text-slate-950 uppercase mb-2.5"
              >
                {branch.name}
              </h3>

              {/* Details */}
              <div className="flex flex-col gap-1.5 text-[0.76rem] text-slate-600 mb-3.5">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{branch.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{branch.phone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-0.5 text-[0.72rem]">
                    <span>{branch.hoursWeekdays}</span>
                    <span>{branch.hoursSaturday}</span>
                  </div>
                </div>
              </div>

              {/* Button */}
              <Link
                href={`/sedes/${branch.slug}`}
                className="flex w-full items-center justify-center gap-1.5 rounded-full border border-slate-300 bg-white py-2.5 px-4 text-[0.78rem] font-extrabold text-slate-900 transition-all hover:border-[#2db84b] hover:text-[#2db84b] active:scale-98 shadow-xs"
              >
                <span>Ver más información</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-700" />
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* ── DOTS INDICATOR ── */}
      <div className="flex items-center justify-center gap-2 mt-2 mb-8">
        {BRANCHES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-6 bg-[#2db84b]" : "w-2.5 bg-slate-300"
            }`}
            aria-label={`Ir a sede ${i + 1}`}
          />
        ))}
      </div>

      {/* Feature Icons (Sin fondo, limpio e integrado igual que en PC) */}
      <div className="mx-auto mt-6 flex flex-col items-center justify-center gap-3 text-xs font-semibold text-slate-600 px-4">
        <div className="flex items-center gap-2.5">
          <Building2 className="h-4 w-4 text-[#0E8F45] flex-shrink-0" />
          <span>3 Sedes Principales & Red de Puntos</span>
        </div>
        <div className="flex items-center gap-2.5">
          <PackageCheck className="h-4 w-4 text-amber-500 flex-shrink-0" />
          <span>Envíos Diarios & Entregas Seguras</span>
        </div>
        <div className="flex items-center gap-2.5">
          <MessageSquare className="h-4 w-4 text-emerald-600 flex-shrink-0" />
          <span>Atención por WhatsApp</span>
        </div>
      </div>
    </div>
  );
}

function BranchCard({ branch, index }: { branch: (typeof BRANCHES)[number]; index: number }) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group relative overflow-hidden rounded-3xl bg-[#141414] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/25 transform-gpu [will-change:transform]"
    >
      <div className="relative h-[420px] sm:h-[480px] lg:h-[520px] w-full overflow-hidden transform-gpu">
        {/* Subtle background dot pattern */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(45,184,75,.08) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* Branch Image with GPU acceleration */}
        <img
          src={branch.image}
          alt={branch.name}
          loading="lazy"
          className="h-full w-full object-cover object-[center_25%] transition-transform duration-500 ease-out group-hover:scale-105 transform-gpu [will-change:transform]"
        />

        {/* Dark Gradient Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/85 z-[2] pointer-events-none" />

        {/* Badge Number Top-Left */}
        <span className="absolute left-4 top-4 z-[3] rounded-full border border-white/25 bg-black/40 px-3.5 py-1 text-[0.75rem] font-extrabold tracking-wide text-white shadow-sm">
          {String(branch.id).padStart(2, "0")}
        </span>

        {/* Card Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-[3] p-6 pb-5">
          {/* Region Tag with Black Text Shadow */}
          <p
            className="mb-1.5 flex items-center gap-1.5 text-xs sm:text-[0.85rem] font-black uppercase tracking-widest text-[#2db84b]"
            style={{
              textShadow: "0px 2px 5px rgba(0,0,0,0.95), 0px 1px 3px rgba(0,0,0,1)",
            }}
          >
            <MapPin
              className="h-3.5 w-3.5 text-[#2db84b] flex-shrink-0"
              style={{ filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.95))" }}
            />
            <span>{branch.region}</span>
          </p>

          {/* Sede Name with Black Text Shadow */}
          <h3
            className="font-display text-[1.9rem] sm:text-[2rem] font-normal text-white mb-2 leading-none"
            style={{
              textShadow: "0px 2px 6px rgba(0, 0, 0, 0.95), 0px 1px 3px rgba(0,0,0,1)",
            }}
          >
            {branch.name}
          </h3>

          {/* Address, Phone, Hours with original text-white/70 color and identical strong black text-shadow */}
          <div className="mb-4 flex flex-col gap-2">
            <div
              className="flex items-center gap-2.5 text-sm text-white/70"
              style={{
                textShadow: "0px 2px 5px rgba(0,0,0,0.95), 0px 1px 3px rgba(0,0,0,1)",
              }}
            >
              <MapPin
                className="h-3.5 w-3.5 flex-shrink-0 fill-white/55 text-white/55"
                style={{ filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.95))" }}
              />
              <span>{branch.address}</span>
            </div>

            <div
              className="flex items-center gap-2.5 text-sm text-white/70"
              style={{
                textShadow: "0px 2px 5px rgba(0,0,0,0.95), 0px 1px 3px rgba(0,0,0,1)",
              }}
            >
              <Phone
                className="h-3.5 w-3.5 flex-shrink-0 fill-white/55 text-white/55"
                style={{ filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.95))" }}
              />
              <span>{branch.phone}</span>
            </div>

            <div
              className="flex items-start gap-2.5 text-xs sm:text-[0.82rem] text-white/70"
              style={{
                textShadow: "0px 2px 5px rgba(0,0,0,0.95), 0px 1px 3px rgba(0,0,0,1)",
              }}
            >
              <Clock
                className="h-3.5 w-3.5 flex-shrink-0 fill-white/55 text-white/55 mt-0.5"
                style={{ filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.95))" }}
              />
              <div className="flex flex-col gap-0.5">
                <span>{branch.hoursWeekdays}</span>
                <span>{branch.hoursSaturday}</span>
              </div>
            </div>
          </div>

          {/* Next.js Link to Sede Detail Page */}
          <Link
            href={`/sedes/${branch.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-5 py-2.5 text-[0.8rem] font-extrabold text-white transition-all duration-200 hover:bg-white/25 hover:border-white/50 active:scale-95 shadow-md transform-gpu"
            style={{ textShadow: "none" }}
          >
            <span style={{ textShadow: "none" }}>Consultar sede</span>
            <ArrowUpRight className="h-4 w-4 text-white" style={{ filter: "none" }} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function BranchesSection() {
  return (
    <section id="sedes" className="relative scroll-mt-20 bg-white px-4 md:px-8 lg:px-10 pb-28 pt-10 z-10 overflow-hidden">
      {/* ── MOBILE VIEW (EXACT MATCH TO USER REFERENCE MOCKUP) ── */}
      <MobileBranchesCarousel />

      {/* ── DESKTOP / PC VIEW (100% INTACT & UNTOUCHED) ── */}
      <div className="hidden md:block w-full">
        <SectionHeading
          tag="Presencia Regional"
          title="Nuestras"
          highlight="3 Sedes"
          description="Estratégicamente ubicadas en la Selva Central del Perú para garantizar entregas rápidas y seguras en toda la región."
          center
        />
        <div className="mx-auto grid max-w-[1760px] gap-6 md:grid-cols-3 md:gap-6 lg:gap-8 px-2 sm:px-4">
          {BRANCHES.map((branch, i) => (
            <BranchCard key={branch.id} branch={branch} index={i} />
          ))}
        </div>

        {/* Feature Icons (Sin fondo, limpio e integrado) */}
        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-600 px-4">
          <div className="flex items-center gap-2.5">
            <Building2 className="h-4.5 w-4.5 text-[#0E8F45] flex-shrink-0" />
            <span>3 Sedes Principales & Red de Puntos</span>
          </div>
          <span className="h-4 w-px bg-slate-200 hidden sm:inline" />
          <div className="flex items-center gap-2.5">
            <PackageCheck className="h-4.5 w-4.5 text-amber-500 flex-shrink-0" />
            <span>Envíos Diarios & Entregas Seguras</span>
          </div>
          <span className="h-4 w-px bg-slate-200 hidden sm:inline" />
          <div className="flex items-center gap-2.5">
            <MessageSquare className="h-4.5 w-4.5 text-emerald-600 flex-shrink-0" />
            <span>Atención por WhatsApp</span>
          </div>
        </div>
      </div>

      {/* ── TRANSICIÓN DE SECCIÓN CURVA CON SOMBRA EXTERIOR FUERTE ── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative block w-full h-[65px] sm:h-[95px] lg:h-[130px]"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Sombra fuerte e intensa proyectada hacia afuera/arriba */}
            <filter id="strong-outer-shadow" x="-10%" y="-50%" width="120%" height="200%">
              <feDropShadow dx="0" dy="-10" stdDeviation="14" floodColor="#0f172a" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Onda fluida principal con relleno #f8fafc y sombra fuerte proyectada hacia afuera */}
          <path
            d="M0 55 C 380 130, 740 20, 1100 90 C 1280 130, 1380 50, 1440 65 L 1440 140 L 0 140 Z"
            fill="#f8fafc"
            filter="url(#strong-outer-shadow)"
          />
        </svg>
      </div>
    </section>
  );
}
