"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronRight, History, X } from "lucide-react";
import {
  buildMilestones,
  friendlyStepTitle,
  parseStepDateTime,
  type Milestone,
} from "@/lib/tracking-format";
import type { Shipment } from "@/types/tracking";

interface TrackingHistoryProps {
  shipment: Shipment;
}

export function TrackingHistory({ shipment }: TrackingHistoryProps) {
  const [showFull, setShowFull] = useState(false);
  const milestones = buildMilestones(shipment.steps ?? [], shipment.destination, shipment);
  const fullSteps = shipment.steps ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-[20px] border border-slate-200/60 bg-white/90 shadow-[0_32px_80px_-24px_rgba(15,23,42,0.06),0_8px_24px_-8px_rgba(15,23,42,0.03)] backdrop-blur-xl"
    >
      <div className="p-6 md:p-7">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#16a34a]/10 text-[#16a34a]">
            <History className="h-4 w-4" />
          </div>
          <h4 className="text-base font-extrabold tracking-tight text-[#0f172a]">
            Historial de seguimiento
          </h4>
        </div>

        {/* Simplified milestones */}
        <div className="mt-7">
          {milestones.map((m, i) => (
            <MilestoneRow key={m.key} m={m} isLast={i === milestones.length - 1} />
          ))}
        </div>

        {/* Full timeline in a side panel (drawer from the right) */}
        {fullSteps.length > 0 && (
          <>
            <button
              type="button"
              onClick={() => setShowFull(true)}
              className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#f8fafc] py-2.5 text-xs font-bold text-[#16a34a] transition-colors duration-300 hover:bg-[#16a34a]/5"
            >
              Ver historial completo
              <ChevronRight className="h-4 w-4" />
            </button>

            <AnimatePresence>
              {showFull && (
                <>
                  <motion.div
                    key="overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-[60] bg-[#0f172a]/40 backdrop-blur-sm"
                    onClick={() => setShowFull(false)}
                  />
                  <motion.aside
                    key="drawer"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-y-0 right-0 z-[70] w-full max-w-md overflow-y-auto border-l border-white/60 bg-white/95 shadow-2xl backdrop-blur-xl"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Historial completo de seguimiento"
                  >
                    <div className="sticky top-0 flex items-center justify-between gap-4 border-b border-[#eef2f6] bg-white/90 px-6 py-5 backdrop-blur-xl">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#16a34a]/10 text-[#16a34a]">
                          <History className="h-4 w-4" />
                        </div>
                        <h5 className="text-base font-extrabold tracking-tight text-[#0f172a]">
                          Historial completo
                        </h5>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowFull(false)}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#f8fafc] text-[#64748b] transition-colors duration-300 hover:bg-[#16a34a]/10 hover:text-[#16a34a]"
                        aria-label="Cerrar"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="space-y-0 px-6 py-6">
                      {fullSteps.map((st, idx) => {
                        const parsed = parseStepDateTime(st.description);
                        const isLast = idx === fullSteps.length - 1;
                        return (
                          <div key={idx} className="relative flex gap-3.5">
                            {!isLast && (
                              <div
                                className={`absolute left-[5px] top-5 bottom-0 w-px ${
                                  st.done ? "bg-[#16a34a]/25" : "bg-[#eef2f6]"
                                }`}
                              />
                            )}
                            <div className="relative mt-1.5">
                              <div
                                className={`h-3 w-3 rounded-full border-2 ${
                                  st.done
                                    ? "border-[#16a34a] bg-[#16a34a]"
                                    : "border-[#cbd5e1] bg-white"
                                }`}
                              />
                              {st.isCurrent && (
                                <motion.span
                                  className="absolute -inset-1.5 rounded-full bg-[#22c55e]/40"
                                  animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                                  transition={{ duration: 1.7, repeat: Infinity, ease: "easeOut" }}
                                  aria-hidden="true"
                                />
                              )}
                            </div>
                            <div className="flex-1 pb-6">
                              <p className="text-xs font-bold text-[#0f172a]">
                                {friendlyStepTitle(st.title)}
                              </p>
                              <p className="mt-1 text-[11px] font-medium text-[#94a3b8]">
                                {[parsed.date, parsed.time, st.description]
                                  .filter(Boolean)
                                  .join(" · ")}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.aside>
                </>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </motion.div>
  );
}

function MilestoneRow({ m, isLast }: { m: Milestone; isLast: boolean }) {
  const Icon = m.icon;
  const isFailed = m.key === "failed";
  const active = m.done || m.isCurrent;

  return (
    <motion.div
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group flex gap-4"
    >
      <div className="flex flex-col items-center">
        <div
          className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
            isFailed
              ? "border-[#dc2626] bg-[#dc2626] text-white shadow-sm"
              : m.done
                ? "border-[#16a34a] bg-[#16a34a] text-white"
                : m.isCurrent
                  ? "border-[#22c55e] bg-[#22c55e] text-white"
                  : "border-[#e2e8f0] bg-white text-[#cbd5e1]"
          }`}
        >
          {m.isCurrent && (
            <motion.span
              className={`absolute inset-0 rounded-full ${isFailed ? "bg-[#dc2626]/40" : "bg-[#22c55e]/40"}`}
              animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
              transition={{ duration: 1.7, repeat: Infinity, ease: "easeOut" }}
              aria-hidden="true"
            />
          )}
          {isFailed ? (
            <Icon className="h-4.5 w-4.5 text-white stroke-[2.5]" />
          ) : m.done ? (
            <Check className="h-4 w-4" strokeWidth={3} />
          ) : m.isCurrent ? (
            <Icon className="h-4 w-4" strokeWidth={2.2} />
          ) : (
            <span className="h-2 w-2 rounded-full bg-[#d8e0ea]" />
          )}
        </div>
        {!isLast && (
          <div
            className={`w-px min-h-[2rem] flex-1 ${m.done || isFailed ? "bg-[#16a34a]/25" : "bg-[#eef2f6]"}`}
          />
        )}
      </div>

      <div className="flex-1 pb-7 pt-1.5">
        <div className="flex items-start justify-between gap-3">
          <p
            className={`text-sm font-bold tracking-tight transition-colors duration-300 ${
              isFailed
                ? "text-[#dc2626] font-extrabold"
                : active
                  ? "text-[#0f172a]"
                  : "text-[#94a3b8]"
            }`}
          >
            {m.label}
          </p>
          {m.isCurrent && (
            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${isFailed ? "bg-red-100 text-[#dc2626]" : "bg-[#22c55e]/10 text-[#16a34a]"}`}>
              Actual
            </span>
          )}
        </div>
        {m.date || m.time ? (
          <p className="mt-1 text-xs font-medium text-[#94a3b8]">
            {m.date ?? ""}
            {m.date && m.time ? " · " : ""}
            {m.time ?? ""}
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}
