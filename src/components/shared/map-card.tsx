"use client";

import { MAP_CITIES } from "@/lib/constants";
import { motion } from "framer-motion";
import { Package } from "lucide-react";

const ROUTE_PATH =
  "M 45 75 Q 75 15 110 35 T 180 65 T 245 30 T 295 75 T 360 45";

function CityNode({ name, x, y, delay, main }: {
  name: string;
  x: number;
  y: number;
  delay: number;
  main?: boolean;
}) {
  return (
    <motion.g
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay, ease: "backOut" }}
    >
      {main ? (
        <>
          {/* Main Central Hub Node (Chanchamayo) with Package Icon Badge */}
          <circle cx={x} cy={y} r={17} fill="#2db84b" opacity={0.3}>
            <animate
              attributeName="r"
              values="17;22;17"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx={x} cy={y} r={13} fill="#2db84b" />
          <foreignObject x={x - 8} y={y - 8} width={16} height={16}>
            <div className="flex h-full w-full items-center justify-center text-white">
              <Package className="h-3.5 w-3.5 stroke-[2.5] text-white" />
            </div>
          </foreignObject>
          <text
            x={x}
            y={y + 27}
            textAnchor="middle"
            fill="#0f172a"
            fontSize="10.5"
            fontWeight="900"
            fontFamily="var(--font-hero), var(--font-display), sans-serif"
          >
            {name}
          </text>
        </>
      ) : (
        <>
          {/* Regular City Node */}
          <circle cx={x} cy={y} r={10} fill="#2db84b" opacity={0.25} />
          <circle cx={x} cy={y} r={4} fill="#15803d" />
          <text
            x={x}
            y={name === "Perene" ? y - 10 : y + 20}
            textAnchor="middle"
            fill="#334155"
            fontSize="8.5"
            fontWeight="700"
            fontFamily="var(--font-hero), var(--font-display), sans-serif"
          >
            {name}
          </text>
        </>
      )}
    </motion.g>
  );
}

export function MapCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      className="w-full max-w-[460px] overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 p-3.5 sm:p-5 backdrop-blur-xl transition-all duration-300 hover:border-green/40 shadow-sm"
    >
        {/* Header: Title + "En línea" Status */}
        <div className="mb-2 flex items-center justify-between px-1">
          <h3 className="text-xs sm:text-base font-extrabold text-slate-900 tracking-tight">
            Red logística Selva Central
          </h3>
          <div className="flex items-center gap-1.5 text-[0.7rem] sm:text-xs font-semibold text-slate-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#2db84b] opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-[#2db84b]" />
            </span>
            <span>En línea</span>
          </div>
        </div>

        {/* Map Graphic Canvas */}
        <svg viewBox="-10 0 420 120" className="h-[110px] sm:h-[125px] w-full overflow-hidden">
          {/* Subtle Topo Contour Curves */}
          <path d="M -10 25 Q 100 5 200 30 T 410 20" fill="none" stroke="#cbd5e1" strokeWidth="0.8" opacity="0.4" />
          <path d="M -10 45 Q 100 65 200 40 T 410 60" fill="none" stroke="#cbd5e1" strokeWidth="0.8" opacity="0.4" />
          <path d="M -10 65 Q 100 35 200 75 T 410 45" fill="none" stroke="#cbd5e1" strokeWidth="0.8" opacity="0.4" />
          <path d="M -10 85 Q 100 105 200 80 T 410 90" fill="none" stroke="#cbd5e1" strokeWidth="0.8" opacity="0.4" />

          {/* Animated Dashed Green Route Line */}
          <motion.path
            id="hero-map-route"
            d={ROUTE_PATH}
            fill="none"
            stroke="#2db84b"
            strokeWidth="2.2"
            strokeDasharray="5 5"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -100 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          {/* Courier traveling the route */}
          <g className="pointer-events-none">
            <circle r={10} fill="#2db84b" opacity={0.25}>
              <animate
                attributeName="opacity"
                values="0.45;0"
                dur="2.2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r={10} fill="none" stroke="#2db84b" strokeWidth={0.75} opacity={0.7}>
              <animate
                attributeName="r"
                values="8;14"
                dur="2.2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r={4.5} fill="#15803d" stroke="#ffffff" strokeWidth={1.5} />
            <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">
              <mpath href="#hero-map-route" />
            </animateMotion>
          </g>

          {/* Cities Nodes */}
          {MAP_CITIES.map((city) => (
            <CityNode key={city.name} {...city} />
          ))}
        </svg>
    </motion.div>
  );
}
