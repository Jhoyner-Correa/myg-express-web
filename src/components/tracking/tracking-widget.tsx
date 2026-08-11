"use client";

import { useCallback, useState } from "react";
import { Package, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface TrackingWidgetProps {
  onSearchSubmitted?: (code: string) => void;
  isFetching?: boolean;
  isSearching?: boolean;
  searchError?: Error | null;
}

function summarizeError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("mín.") || lower.includes("válido") || lower.includes("ingresa")) {
    return "Ingresa un código válido";
  }
  if (lower.includes("no encontramos") || lower.includes("no encontrado")) {
    return "Envío no encontrado";
  }
  if (lower.includes("demasiadas")) {
    return "Demasiadas solicitudes";
  }
  if (lower.includes("interno") || lower.includes("servidor")) {
    return "Error temporal del servicio";
  }
  return "No se pudo consultar el envío";
}

function SoundWave() {
  return (
    <div className="flex items-center gap-[2px] h-3">
      <motion.span
        className="w-[2px] bg-[#2db84b] rounded-full"
        animate={{ height: ["4px", "10px", "4px"] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="w-[2px] bg-[#2db84b] rounded-full"
        animate={{ height: ["8px", "13px", "5px", "8px"] }}
        transition={{ duration: 0.75, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
      />
      <motion.span
        className="w-[2px] bg-[#2db84b] rounded-full"
        animate={{ height: ["5px", "11px", "4px"] }}
        transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
    </div>
  );
}

export function TrackingWidget({
  onSearchSubmitted,
  isFetching,
  isSearching,
  searchError,
}: TrackingWidgetProps) {
  const [code, setCode] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSearch = useCallback(() => {
    const target = code.trim().toUpperCase();
    if (!target) return;

    if (target.length < 6 || !/[A-Z0-9]/.test(target)) {
      setLocalError("Ingresa un código de seguimiento válido (mín. 6 caracteres).");
      return;
    }

    setLocalError(null);
    if (onSearchSubmitted) onSearchSubmitted(target);
  }, [code, onSearchSubmitted]);

  const handleChange = (value: string) => {
    setCode(value);
    if (localError) setLocalError(null);
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") handleSearch();
    },
    [handleSearch],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="w-full max-w-2xl lg:max-w-[840px] rounded-2xl md:rounded-3xl border border-white/20 bg-[#0f172a]/95 p-3.5 sm:p-4.5 md:p-6 shadow-2xl backdrop-blur-2xl transition-all"
      style={{
        boxShadow:
          "0 24px 60px -12px rgba(15, 23, 42, 0.45), 0 0 35px -5px rgba(45, 184, 75, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
      }}
    >
      {/* ── TOP HEADER: Icon + Title + Realtime Badge ── */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 mb-3.5 sm:mb-5 md:mb-6">
        <motion.div
          animate={{
            y: [0, -10, 0, -5, 0],
            scaleX: [1, 0.96, 1.06, 0.98, 1],
            scaleY: [1, 1.05, 0.92, 1.02, 1],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-[#2db84b] text-white shadow-md"
        >
          <Package className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white stroke-[2.2]" />
        </motion.div>
        <div className="flex-1">
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <h3 className="text-base sm:text-lg md:text-2xl font-bold text-white tracking-tight">
              Rastrea tu envío
            </h3>
            <div className="inline-flex items-center gap-1.5 translate-y-[1px] sm:translate-y-[2px] md:translate-y-[3px]">
              <SoundWave />
              <span className="text-[9px] sm:text-[9.5px] md:text-[10.5px] font-black uppercase tracking-widest text-[#2db84b]">
                EN TIEMPO REAL
              </span>
              <SoundWave />
            </div>
            <AnimatePresence>
              {!isSearching && (localError || searchError) && (
                <motion.span
                  key="widget-error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  title={(localError ?? searchError?.message) ?? undefined}
                  className="inline-flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-semibold tracking-wide text-rose-300"
                >
                  <span className="h-1 w-1 rounded-full bg-rose-400" />
                  {summarizeError(localError ?? searchError?.message ?? "")}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <p className="text-[0.72rem] sm:text-xs md:text-sm text-slate-300 font-medium mt-0.5">
            Conoce el estado de tu paquete al instante
          </p>
        </div>
      </div>

      {/* ── SEARCH INPUT CONTAINER (Píldora Blanca idéntica a la captura de referencia) ── */}
      <div className="relative flex items-center rounded-full bg-white p-1 sm:p-1.5 pl-3.5 sm:pl-5 shadow-xl transition-all focus-within:ring-4 focus-within:ring-[#0E8F45]/30">
        <Input
          value={code}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="INGRESA TU CÓDIGO DE SEGUIMIENTO..."
          aria-label="Ingresa tu código de seguimiento"
          className="h-9.5 sm:h-11 md:h-12 border-0 bg-transparent px-0 text-[0.7rem] sm:text-xs md:text-sm text-slate-900 placeholder:text-slate-400/80 placeholder:font-extrabold placeholder:text-[0.64rem] xs:placeholder:text-[0.72rem] sm:placeholder:text-xs md:placeholder:text-sm focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 font-extrabold tracking-normal sm:tracking-wider uppercase truncate"
        />
        <button
          type="button"
          onClick={handleSearch}
          disabled={isFetching}
          aria-label="Buscar envío"
          className="h-9.5 sm:h-11 md:h-12 px-3.5 sm:px-6 md:px-7 shrink-0 rounded-full bg-[#0E8F45] hover:bg-[#097336] text-white font-extrabold text-[0.72rem] sm:text-xs md:text-sm tracking-wide transition-colors flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-sm border-0 outline-none disabled:opacity-70"
        >
          {isFetching ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-white" />
              <span className="hidden sm:inline">Buscando...</span>
            </>
          ) : (
            <>
              <span>Buscar envío</span>
              <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.8] text-white" />
            </>
          )}
        </button>
      </div>

      {/* ── STATUS: Searching animation / Error feedback ── */}
      <AnimatePresence mode="wait">
        {isSearching && (
          <motion.div
            key="searching"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-4 flex items-center justify-center gap-2.5"
          >
            <Loader2 className="h-4 w-4 animate-spin text-[#2db84b]" />
            <span className="text-xs font-bold text-slate-300">
              Buscando tu envío
              <span className="inline-flex gap-0.5">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.25 }}
                    className="text-[#2db84b]"
                  >
                    .
                  </motion.span>
                ))}
              </span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
