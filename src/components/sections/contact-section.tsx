"use client";

import { Phone, Mail, Clock, MapPin, ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/features/contact/form";
import { SITE } from "@/lib/constants";

const CARDS = [
  {
    icon: Phone,
    title: "WhatsApp / Teléfono",
    value: SITE.phone,
    highlightValue: true,
    subtitle: "Atención rápida por chat o llamada.",
    href: `https://wa.me/${SITE.whatsapp}?text=Hola%2C%20quisiera%20informaci%C3%B3n`,
  },
  {
    icon: Mail,
    title: "Correo electrónico",
    value: SITE.email,
    highlightValue: true,
    subtitle: "Te responderemos a la brevedad.",
    href: `mailto:${SITE.email}`,
  },
  {
    icon: Clock,
    title: "Atención",
    titleSuffix: "24/7",
    subtitle: "Siempre disponibles para ayudarte.",
    href: null,
  },
  {
    icon: MapPin,
    title: "Sedes a nivel nacional",
    subtitle: "Cobertura en las principales ciudades del Perú.",
    href: "/#sedes",
  },
];

export function ContactSection() {
  return (
    <section id="contacto" className="relative scroll-mt-24 bg-[#f8fafc] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1380px]">
        {/* ── 1. VISTA MÓVIL EXCLUSIVA (< md: Grid 2x2 Limpia & Formulario Pulido) ── */}
        <div className="block md:hidden space-y-6">
          {/* Header Móvil */}
          <div className="text-center">
            <span className="inline-block text-[0.72rem] font-black text-[#0E8F45] uppercase tracking-[0.15em]">
              ESTAMOS AQUÍ PARA TI
            </span>

            <h2 className="mt-2 font-sans text-[2.2rem] font-black leading-[1.02] tracking-tight text-slate-950">
              Hablemos <span className="text-[#0E8F45]">ahora</span>
            </h2>

            <p className="mt-2 text-xs text-slate-600 leading-relaxed font-medium max-w-xs mx-auto">
              ¿Tienes dudas sobre cobertura, ubicación o cómo funciona el servicio? Contáctanos por cualquier canal.
            </p>
          </div>

          {/* Grid 2x2 de Tarjetas de Contacto en Celular */}
          <div className="grid grid-cols-2 gap-2.5">
            {CARDS.map((card, idx) => {
              const Icon = card.icon;
              const CardInner = (
                <div className="h-full rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-2xs flex flex-col justify-between active:scale-98 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#e8f8ec] text-[#0E8F45]">
                      <Icon className="h-4 w-4" strokeWidth={2.2} />
                    </div>
                    {card.href && (
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
                    )}
                  </div>

                  <div>
                    <span className="text-[0.62rem] font-extrabold uppercase tracking-wider text-slate-400 block truncate">
                      {card.title} {card.titleSuffix && <span className="text-[#0E8F45]">{card.titleSuffix}</span>}
                    </span>
                    {card.value && (
                      <strong className="block text-xs font-black text-[#0E8F45] truncate mt-0.5">
                        {card.value}
                      </strong>
                    )}
                    <p className="text-[0.65rem] font-medium text-slate-500 truncate mt-0.5">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              );

              return card.href ? (
                <a key={idx} href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  {CardInner}
                </a>
              ) : (
                <div key={idx}>{CardInner}</div>
              );
            })}
          </div>

          {/* Formulario Móvil */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm">
            <div className="border-b border-slate-100 pb-3 mb-4 text-center sm:text-left">
              <h3 className="font-sans text-xl font-black text-slate-900">
                Envíanos un Mensaje
              </h3>
              <p className="mt-0.5 text-xs font-medium text-slate-500">
                Te respondemos en menos de 2 horas en horario de atención.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>

        {/* ── 2. VISTA DESKTOP (md+: Original PC Intacto) ── */}
        <div className="hidden md:grid gap-10 lg:grid-cols-[1.2fr_0.95fr] lg:gap-12 xl:gap-14 items-start">
          
          {/* COLUMNA IZQUIERDA DESKTOP */}
          <div className="space-y-7">
            <div>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#0E8F45]">
                ESTAMOS AQUÍ PARA TI
              </span>
              
              <h2 className="mt-2 font-sans text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Hablemos{" "}
                <span className="relative inline-block text-[#0E8F45]">
                  ahora
                  <svg
                    className="absolute -bottom-1.5 left-0 h-2.5 w-full text-[#0E8F45]"
                    viewBox="0 0 160 14"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 2 10 Q 80 2 158 8"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>

              <p className="mt-3.5 max-w-xl text-sm sm:text-base font-medium leading-relaxed text-slate-600">
                ¿Tienes dudas sobre cobertura, ubicación o cómo funciona el servicio? Contáctanos por cualquier canal.
              </p>
            </div>

            {/* Grid 2x2 Desktop */}
            <div className="grid gap-4 sm:grid-cols-2">
              {CARDS.map((card, idx) => {
                const Icon = card.icon;
                const Content = (
                  <div className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-colors duration-200 hover:border-[#0E8F45]/60 hover:shadow-md">
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#e8f8ec] text-[#0E8F45]">
                        <Icon className="h-6 w-6" strokeWidth={2} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-sans text-sm sm:text-base font-black text-slate-900">
                          {card.title}{" "}
                          {card.titleSuffix && (
                            <span className="text-[#0E8F45]">{card.titleSuffix}</span>
                          )}
                        </h3>

                        {card.value && (
                          <p className={`mt-0.5 truncate text-sm sm:text-base font-extrabold ${card.highlightValue ? "text-[#0E8F45]" : "text-slate-800"}`}>
                            {card.value}
                          </p>
                        )}

                        <p className="mt-1 text-xs font-medium text-slate-500">
                          {card.subtitle}
                        </p>
                      </div>

                      {card.href && (
                        <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-slate-400 transition-colors group-hover:text-[#0E8F45]" />
                      )}
                    </div>
                  </div>
                );

                return card.href ? (
                  <a key={idx} href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    {Content}
                  </a>
                ) : (
                  <div key={idx}>{Content}</div>
                );
              })}
            </div>
          </div>

          {/* COLUMNA DERECHA DESKTOP */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 md:p-9 shadow-xs">
            <div className="border-b border-slate-100 pb-4 mb-5">
              <h3 className="font-sans text-xl sm:text-2xl font-black text-slate-900">
                Envíanos un Mensaje
              </h3>
              <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500">
                Te respondemos en menos de 2 horas en horario de atención.
              </p>
            </div>

            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
}
