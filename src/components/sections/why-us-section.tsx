"use client";

import { motion } from "framer-motion";
import { Star, Shield, MessageSquare, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { WHY_US } from "@/lib/constants";
import { useReveal } from "@/hooks/use-reveal";

const iconMap = {
  star: Star,
  shield: Shield,
  messageSquare: MessageSquare,
  mapPin: MapPin,
};

export function WhyUsSection() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <section
      id="porque"
      className="relative scroll-mt-20 overflow-hidden bg-[#0a0d14] px-4 sm:px-6 py-14 md:py-24 md:px-10"
    >
      {/* Fondo sutil corporativo */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(14,143,69,0.15), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ── 1. VISTA MÓVIL EXCLUSIVA (< md: Corporativo, Nítido y Elegante) ── */}
        <div className="block md:hidden space-y-6">
          {/* Header Corporativo Móvil */}
          <div className="text-center">
            <span className="inline-block text-[0.72rem] font-black text-[#2db84b] uppercase tracking-[0.15em]">
              ¿POR QUÉ MYG EXPRESS?
            </span>

            <h2 className="mt-3 font-sans text-[2.1rem] font-black leading-[1.02] tracking-tight text-white">
              La Diferencia <span className="text-[#2db84b]">que Sientes</span>
            </h2>

            <p className="mt-2.5 text-xs text-slate-400 leading-relaxed font-normal max-w-xs mx-auto">
              No solo recibimos paquetes. Nos encargamos de que tu compra llegue segura, a tiempo y sin complicaciones.
            </p>
          </div>

          {/* Grid 2x2 de Tarjetas Corporativas */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            {WHY_US.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Star;
              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-[#121620] p-4 flex flex-col justify-between relative overflow-hidden shadow-sm"
                >
                  {/* Línea sutil superior */}
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-emerald-500/80" />

                  <div>
                    {/* Número e Ícono */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-2xl font-black text-[#2db84b] tracking-tight">
                        {item.stat}
                      </span>
                      <div className="flex h-7.5 w-7.5 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Título de Métrica */}
                    <h3 className="text-xs font-bold text-white tracking-tight leading-snug">
                      {item.label}
                    </h3>
                  </div>

                  {/* Descripción nítida */}
                  <p className="mt-2 text-[0.7rem] text-slate-400 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 2. VISTA DESKTOP (md+: Original PC Intacto) ── */}
        <div className="hidden md:block">
          <SectionHeading
            tag="¿Por qué MyG Express?"
            title="La Diferencia"
            highlight="que Sientes"
            description="No solo recibimos paquetes. Nos encargamos de que tu compra llegue segura, a tiempo y sin que muevas un dedo."
            center
            dark
          />

          <motion.div
            ref={ref}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="mx-auto grid max-w-6xl divide-y md:divide-y-0 md:divide-x divide-white/10 overflow-hidden rounded-2xl bg-white/5 md:grid-cols-4"
          >
            {WHY_US.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Star;
              return (
                <motion.div
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                  className="group relative bg-[#141414] p-8 transition-colors hover:bg-green/7"
                >
                  <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 bg-green transition-transform duration-300 group-hover:scale-x-100" />
                  <div className="mb-4 flex h-[50px] w-[50px] items-center justify-center rounded-xl bg-green/12">
                    <Icon className="h-6 w-6 text-green" />
                  </div>
                  <p className="font-display text-[2.6rem] leading-none text-green">
                    {item.stat}
                  </p>
                  <p className="mb-2 text-[0.97rem] font-extrabold text-white">
                    {item.label}
                  </p>
                  <p className="text-sm leading-relaxed text-white/50">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
