"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Menu, X, Headset } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE, BRANCHES } from "@/lib/constants";
import { useScrollHeader } from "@/hooks/use-scroll-header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  dark?: boolean;
}

export function Header({ dark = false }: HeaderProps) {
  const scrolled = useScrollHeader();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      {/* ── DESKTOP TOP ANNOUNCEMENT BAR (PC: md+) ── */}
      <div className={cn(
        "fixed inset-x-0 top-0 z-[90] hidden md:flex h-11 items-center justify-between px-8 text-[0.82rem] border-b transition-colors",
        dark
          ? "bg-[#090d16] text-slate-200 border-slate-800/80"
          : "bg-[#111827] text-white border-transparent"
      )}>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 text-[0.8rem] font-bold text-white">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Selva Central del Perú
          </span>
          <span className={cn("text-[0.8rem] font-medium", dark ? "text-slate-400" : "text-zinc-300")}>
            | &nbsp; Entregas rápidas, seguras y sin que te muevas.
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#contacto"
            className={cn(
              "flex items-center gap-2 transition-colors font-medium text-[0.8rem]",
              dark ? "text-slate-300 hover:text-emerald-400" : "text-zinc-300 hover:text-white"
            )}
          >
            <Headset className="h-4 w-4 text-emerald-400" />
            <span>Soporte en línea</span>
          </a>

          <a
            href={`https://wa.me/${SITE.whatsapp.replace(/[^\d]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-2 transition-colors font-semibold text-[0.8rem]",
              dark ? "text-slate-300 hover:text-emerald-400" : "text-zinc-300 hover:text-emerald-400"
            )}
          >
            <svg className="h-4 w-4 fill-[#25D366]" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>WhatsApp</span>
          </a>

          <Button
            size="sm"
            className="h-7.5 rounded-full bg-[#16a34a] px-4 text-[0.78rem] font-bold text-white transition-colors hover:bg-[#15803d]"
            onClick={() => {
              document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Solicitar entrega
          </Button>
        </div>
      </div>

      {/* ── DESKTOP MAIN NAVBAR (PC: md+) ── */}
      <header
        className={cn(
          "fixed inset-x-0 top-11 z-[80] hidden md:block transition-all duration-300",
          dark
            ? (scrolled
                ? "border-b border-emerald-500/30 bg-[#070a11]/95 shadow-2xl backdrop-blur-2xl"
                : "border-b border-slate-800/80 bg-[#070a11]/80 backdrop-blur-xl")
            : (scrolled
                ? "border-b border-green-mid/90 bg-white/95 shadow-xl shadow-black/5 backdrop-blur-2xl"
                : "border-b border-transparent bg-white/70 backdrop-blur-lg")
        )}
      >
        <div className="mx-auto flex h-20 items-center justify-between px-8">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label={SITE.name}
            className="flex h-[78px] w-[78px] flex-shrink-0 items-center justify-center transition-transform hover:-translate-y-0.5 cursor-pointer"
          >
            <img
              src="/assets/logo-myg.png"
              alt={SITE.name}
              className="h-full w-full object-contain"
            />
          </a>

          <nav className="flex items-center">
            <ul className="flex gap-8">
              {NAV_LINKS.map((link) =>
                link.href === "/#sedes" ? (
                  <li key={link.href} className="group relative">
                    <a
                      href={link.href}
                      className={cn(
                        "relative pb-0.5 text-sm font-semibold transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 hover:after:w-full",
                        dark
                          ? "text-slate-200 hover:text-emerald-400 after:bg-emerald-400"
                          : "text-[#333] hover:text-green after:bg-green"
                      )}
                    >
                      {link.label}
                    </a>
                    <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      <div className="w-max whitespace-nowrap pt-2 text-center">
                        {BRANCHES.map((branch) => (
                          <a
                            key={branch.slug}
                            href={`/sedes/${branch.slug}`}
                            className={cn(
                              "block px-1 py-1.5 text-sm font-medium transition-colors",
                              dark
                                ? "text-slate-300 hover:text-emerald-300"
                                : "text-slate-600 hover:text-[#0E8F45]"
                            )}
                          >
                            {branch.name.replace(/^Sede (Principal|)+/, "").trim()}
                          </a>
                        ))}
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={cn(
                        "relative pb-0.5 text-sm font-semibold transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 hover:after:w-full",
                        dark
                          ? "text-slate-200 hover:text-emerald-400 after:bg-emerald-400"
                          : "text-[#333] hover:text-green after:bg-green"
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>

          <Button
            asChild
            variant={dark ? "default" : "dark"}
            size="sm"
            className={cn(dark && "bg-[#2db84b] hover:bg-[#22c55e] text-white font-extrabold")}
          >
            <a href={SITE.appUrl}>Ingresar</a>
          </Button>
        </div>
      </header>

      {/* ── MOBILE HEADER (Exclusivo para Celular: < md) ── */}
      <header className="fixed inset-x-0 top-0 z-[90] flex md:hidden flex-col bg-white shadow-xs">
        {/* Fila 1: Logo + Enlaces Directos (Inicio y Sedes) + Menú Hamburguesa */}
        <div className="flex h-13 items-center justify-between px-3 border-b border-slate-100 bg-white">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label={SITE.name}
            className="flex h-9.5 w-9.5 flex-shrink-0 items-center justify-center cursor-pointer"
          >
            <img
              src="/assets/logo-myg.png"
              alt={SITE.name}
              className="h-full w-full object-contain"
            />
          </a>

          {/* Enlaces Limpios con Interacción, Tamaño Mayor y Sombra Suave en Header Celular */}
          <div className="flex items-center gap-4 sm:gap-5">
            <Link
              href="/#hero"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="text-[0.92rem] font-black text-slate-900 hover:text-[#0E8F45] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer drop-shadow-[0_2px_4px_rgba(0,0,0,0.12)] hover:drop-shadow-[0_4px_8px_rgba(14,143,69,0.25)] tracking-tight"
            >
              Inicio
            </Link>

            <Link
              href="/#sedes"
              className="text-[0.92rem] font-black text-slate-900 hover:text-[#0E8F45] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer drop-shadow-[0_2px_4px_rgba(0,0,0,0.12)] hover:drop-shadow-[0_4px_8px_rgba(14,143,69,0.25)] tracking-tight"
            >
              Sedes
            </Link>
          </div>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-900 bg-slate-100/80 border border-slate-200/60 active:scale-95 transition-all"
            onClick={toggleMobile}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5 text-slate-900 stroke-[2.2]" />
            ) : (
              <Menu className="h-5 w-5 text-slate-900 stroke-[2.2]" />
            )}
          </button>
        </div>

        {/* Fila 2: Barra Oscura con Soporte, WhatsApp y Solicitar Entrega */}
        <div className="flex h-9.5 items-center justify-between bg-[#090d16] px-3.5 text-[0.72rem] font-medium text-white">
          <a
            href="#contacto"
            className="flex items-center gap-1.5 text-white hover:text-emerald-400 transition-colors"
          >
            <Headset className="h-3.5 w-3.5 text-[#2db84b]" />
            <span>Soporte en línea</span>
          </a>

          <a
            href={`https://wa.me/${SITE.whatsapp.replace(/[^\d]/g, "")}?text=Hola%2C%20quisiera%20informaci%C3%B3n`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white hover:text-emerald-400 transition-colors font-semibold"
          >
            <svg className="h-3.5 w-3.5 fill-[#25D366]" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>WhatsApp</span>
          </a>

          <button
            onClick={() => {
              document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="rounded-full bg-[#0E8F45] px-3.5 py-0.5 text-[0.72rem] font-extrabold text-white transition-colors hover:bg-[#097336]"
          >
            Solicitar entrega
          </button>
        </div>

        {/* Menú Desplegable Móvil (Las 3 Rayitas) */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-slate-200 bg-white px-5 pb-6 pt-4 shadow-2xl md:hidden text-slate-900"
            >
              <ul className="flex flex-col gap-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={closeMobile}
                      className="block py-2 text-base font-extrabold text-slate-800 transition-colors hover:text-[#0E8F45] border-b border-slate-100"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}

                {/* Botón Ingresar ocultado de arriba y ubicado dentro de las 3 rayitas */}
                <li className="pt-2">
                  <a
                    href={SITE.appUrl}
                    onClick={closeMobile}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#090d16] py-3 text-sm font-extrabold text-white shadow-md active:scale-98"
                  >
                    <span>Ingresar</span>
                  </a>
                </li>

                <li className="pt-1">
                  <a
                    href={`https://wa.me/${SITE.whatsapp.replace(/[^\d]/g, "")}?text=Hola%2C%20quisiera%20informaci%C3%B3n`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobile}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-extrabold text-white shadow-sm active:scale-98"
                  >
                    <span>Escribir por WhatsApp</span>
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

