"use client";

import { useReducedMotion, motion } from "framer-motion";
import { Clipboard, Bell, Truck, CheckCircle } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { PROCESS_STEPS } from "@/lib/constants";
import { useReveal } from "@/hooks/use-reveal";

const iconMap = {
  clipboard: Clipboard,
  bell: Bell,
  truck: Truck,
  checkCircle: CheckCircle,
};

const EASE = [0.22, 1, 0.36, 1] as const;

function setSpotlight(e: React.MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

export function ProcessSection() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  const reduce = useReducedMotion();

  return (
    <section id="proceso" className="scroll-mt-20 bg-white px-4 sm:px-6 py-14 md:py-24 md:px-10">
      <div className="max-w-5xl mx-auto">
        {/* ── 1. VISTA MÓVIL EXCLUSIVA (< md: Línea de Proceso Conectada Nítida) ── */}
        <div className="block md:hidden space-y-6">
          {/* Header Móvil de Impacto */}
          <div className="text-center">
            <span className="inline-block text-[0.72rem] font-black text-[#2db84b] uppercase tracking-[0.15em]">
              SIMPLE Y RÁPIDO
            </span>

            <h2 className="mt-2.5 font-sans text-[2.2rem] font-black leading-[1.02] tracking-tight text-slate-950">
              ¿Cómo <span className="text-[#2db84b]">Funciona?</span>
            </h2>

            <p className="mt-2 text-xs text-slate-600 leading-relaxed font-medium max-w-xs mx-auto">
              Recibir tu compra online con MyG Express es muy sencillo. Solo sigue estos pasos.
            </p>
          </div>

          {/* Timeline Vertical Conectada en Celular */}
          <div className="relative pt-2 pl-3 pr-1 space-y-4">
            {/* Línea vertical continua que une los 4 pasos */}
            <div className="absolute left-[1.65rem] top-7 bottom-8 w-0.5 bg-gradient-to-b from-[#2db84b] via-emerald-400 to-slate-200 -z-0" />

            {PROCESS_STEPS.map((step, idx) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap] ?? Clipboard;
              return (
                <div key={step.icon} className="relative z-10 flex items-start gap-3.5">
                  {/* Nodo Numerado con Ícono */}
                  <div className="relative shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#2db84b] text-white shadow-md shadow-emerald-500/20 font-black text-xs">
                    <Icon className="h-5 w-5 stroke-[2.2]" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-950 text-[0.58rem] font-black text-emerald-400 ring-2 ring-white">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Tarjeta de Contenido del Paso */}
                  <div className="flex-1 bg-slate-50 border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
                    <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                      {step.label}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 font-medium leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 2. VISTA DESKTOP (md+: Original PC Intacto) ── */}
        <div className="hidden md:block">
          <SectionHeading
            tag="Simple y Rápido"
            title="¿Cómo"
            highlight="Funciona?"
            description="Recibir tu compra online con MyG Express es muy sencillo. Solo sigue estos pasos."
            center
          />

          <div ref={ref} className="relative mx-auto mt-14 max-w-5xl">
            {/* Línea conectora desktop */}
            <div
              className="absolute left-[12%] right-[12%] top-[37px] hidden md:block"
              aria-hidden="true"
            >
              <div className="relative h-0.5 w-full rounded-full bg-[repeating-linear-gradient(90deg,#e2e8e2_0,#e2e8e2_10px,transparent_10px,transparent_20px)]" />
              <motion.div
                className="absolute inset-0 h-0.5 rounded-full bg-[repeating-linear-gradient(90deg,#2db84b_0,#2db84b_10px,transparent_10px,transparent_20px)]"
                initial={false}
                animate={{ scaleX: isVisible ? 1 : 0 }}
                transition={{ duration: 1.1, ease: EASE }}
                style={{ transformOrigin: "left" }}
              />
              <motion.div
                className="absolute -top-[3px] h-2 w-2 rounded-full bg-green shadow-[0_0_10px_2px_rgba(45,184,75,0.5)]"
                initial={{ left: "0%" }}
                animate={
                  isVisible && !reduce ? { left: ["0%", "100%"] } : { opacity: 0 }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: 1.2,
                }}
                style={{ translateX: "-50%" }}
              />
            </div>

            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
              }}
              className="grid gap-0 md:grid-cols-4"
            >
              {PROCESS_STEPS.map((step) => {
                const Icon = iconMap[step.icon as keyof typeof iconMap] ?? Clipboard;
                return (
                  <motion.div
                    key={step.icon}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                    }}
                    className="group relative z-10 flex flex-col items-center px-3.5 text-center"
                  >
                    {/* Halo de luz sutil */}
                    <div
                      onMouseMove={setSpotlight}
                      className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(220px circle at var(--mx,50%) var(--my,0%), rgba(45,184,75,0.08), transparent 70%)",
                      }}
                      aria-hidden="true"
                    />

                    <div className="relative z-10 mb-5 flex h-[74px] w-[74px] items-center justify-center rounded-full border-3 border-border bg-white transition-all duration-300 hover:border-green hover:shadow-[0_0_0_7px_rgba(45,184,75,0.1)] group-hover:-translate-y-1.5">
                      <span
                        className="absolute inset-0 rounded-full bg-green/25 opacity-0 group-hover:opacity-100"
                        aria-hidden="true"
                      >
                        <span className="absolute inset-0 animate-ping rounded-full bg-green/20" />
                      </span>
                      <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-gradient-to-br from-[#6fcf6f] to-green-dark transition-all duration-300 group-hover:from-green group-hover:to-green-deep group-hover:shadow-[0_8px_18px_-6px_rgba(45,184,75,0.6)]">
                        <Icon
                          className="h-5.5 w-5.5 text-white transition-transform duration-300 group-hover:scale-110"
                          strokeWidth={2.1}
                        />
                      </div>
                    </div>

                    <p className="relative mb-1.5 text-[0.93rem] font-extrabold text-foreground transition-colors duration-300 group-hover:text-green-deep">
                      {step.label}
                    </p>
                    <p className="relative text-[0.8rem] leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>

                    <div className="pointer-events-none relative mt-4 h-px w-10 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-green to-green-dark transition-transform duration-500 ease-out group-hover:scale-x-100" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
