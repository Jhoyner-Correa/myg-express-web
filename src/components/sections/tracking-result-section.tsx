"use client";

import { motion } from "framer-motion";
import { TrackingResult } from "@/components/tracking/tracking-result";
import type { Shipment } from "@/types/tracking";

interface TrackingResultSectionProps {
  submittedCode: string | null;
  shipment: Shipment | null;
  isFetching: boolean;
  error: Error | null;
}

export function TrackingResultSection({
  submittedCode,
  shipment,
  isFetching,
  error,
}: TrackingResultSectionProps) {
  if (!submittedCode && !isFetching && !shipment && !error) {
    return null;
  }

  return (
    <section
      id="resultado-busqueda"
      className="scroll-mt-28 md:scroll-mt-32 relative z-10 w-full pt-4 pb-6 md:pb-10 mb-6 md:mb-8 border-b border-slate-200/80 text-slate-900 overflow-hidden"
    >
      {/* Ambient Route & Pin Side Graphics (Positioned on Far Outer Screen Edges) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* Left Side Route Graphic */}
        <div className="absolute left-0 top-0 bottom-0 w-[220px] md:w-[320px] lg:w-[420px] opacity-40 md:opacity-55">
          <svg className="h-full w-full" viewBox="0 0 420 700" fill="none" preserveAspectRatio="xMinYMid slice">
            <defs>
              <pattern id="secDotGridLeft" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="1.2" fill="#2db84b" opacity="0.25" />
              </pattern>
              <linearGradient id="secRouteGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2db84b" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#2db84b" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#2db84b" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#secDotGridLeft)" opacity="0.45" />
            <path
              d="M -50,40 Q 120,160 160,320 T 60,540 T 240,680"
              stroke="url(#secRouteGradLeft)"
              strokeWidth="2.4"
              strokeDasharray="7 7"
              fill="none"
            />
            <g transform="translate(160, 320)">
              <circle r="15" fill="#2db84b" opacity="0.15" />
              <path
                d="M0 -12 C-5 -12 -8 -9 -8 -3 C-8 3 0 12 0 12 C0 12 8 3 8 -3 C8 -9 5 -12 0 -12 Z"
                fill="#2db84b"
              />
              <circle cx="0" cy="-3" r="3" fill="#ffffff" />
            </g>
          </svg>
        </div>

        {/* Right Side Route Graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-[220px] md:w-[320px] lg:w-[420px] opacity-40 md:opacity-55">
          <svg className="h-full w-full" viewBox="0 0 420 700" fill="none" preserveAspectRatio="xMaxYMid slice">
            <defs>
              <pattern id="secDotGridRight" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="21" cy="21" r="1.2" fill="#2db84b" opacity="0.25" />
              </pattern>
              <linearGradient id="secRouteGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2db84b" stopOpacity="0.15" />
                <stop offset="60%" stopColor="#2db84b" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#2db84b" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#secDotGridRight)" opacity="0.45" />
            <path
              d="M 470,40 Q 300,180 260,340 T 360,520 T 180,680"
              stroke="url(#secRouteGradRight)"
              strokeWidth="2.4"
              strokeDasharray="7 7"
              fill="none"
            />
            <g transform="translate(260, 340)">
              <circle r="15" fill="#2db84b" opacity="0.15" />
              <path
                d="M0 -12 C-5 -12 -8 -9 -8 -3 C-8 3 0 12 0 12 C0 12 8 3 8 -3 C8 -9 5 -12 0 -12 Z"
                fill="#2db84b"
              />
              <circle cx="0" cy="-3" r="3" fill="#ffffff" />
            </g>
          </svg>
        </div>
      </div>
      <div className="container relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <TrackingResult
            submittedCode={submittedCode}
            shipment={shipment}
            isFetching={isFetching}
            error={error}
          />
        </motion.div>
      </div>
    </section>
  );
}
