"use client";

import { motion, useReducedMotion } from "framer-motion";

const CURVE_PATH =
  "M0 0 H1440 V100 C 1240 168 1030 70 820 118 C 600 170 420 88 200 132 C 110 150 45 126 0 146 Z";

function PackageIcon() {
  return (
    <div className="relative">
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        style={{ filter: "drop-shadow(0 8px 14px rgba(34,197,94,0.35))" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="pkg-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>
        </defs>
        <path
          d="M12 2 L21 6.5 V17.5 L12 22 L3 17.5 V6.5 Z"
          fill="url(#pkg-grad)"
          stroke="#15803D"
          strokeWidth="0.8"
        />
        <path
          d="M3 6.5 L12 11 L21 6.5"
          stroke="#15803D"
          strokeWidth="0.8"
          fill="none"
          opacity="0.45"
        />
        <path d="M12 11 V22" stroke="#15803D" strokeWidth="0.8" opacity="0.45" />
        <path
          d="M7 4 L17 9"
          stroke="#FFFFFF"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.65"
        />
      </svg>
      <span className="absolute -bottom-1.5 left-1/2 h-1.5 w-6 -translate-x-1/2 rounded-full bg-black/15 blur-[3px]" />
    </div>
  );
}

function LogisticsLine() {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full">
      {/* Dotted green logistics line */}
      <svg
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        className="h-5 w-full"
        aria-hidden="true"
      >
        <line
          x1="0"
          y1="12"
          x2="1200"
          y2="12"
          stroke="#22C55E"
          strokeWidth="7"
          strokeOpacity="0.1"
          strokeDasharray="0.1 18"
          strokeLinecap="round"
        />
        <line
          x1="0"
          y1="12"
          x2="1200"
          y2="12"
          stroke="#22C55E"
          strokeWidth="3"
          strokeOpacity="0.75"
          strokeDasharray="0.1 18"
          strokeLinecap="round"
        />
      </svg>

      {/* Package traveling slowly along the line */}
      <motion.div
        className="absolute -top-6 left-0"
        initial={{ left: "0%" }}
        animate={reduce ? { left: "0%" } : { left: ["0%", "100%"] }}
        transition={
          reduce
            ? { duration: 0 }
            : { duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
        }
        style={{ transform: "translateX(-50%)" }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <PackageIcon />
        </motion.div>
      </motion.div>
    </div>
  );
}

/**
 * Premium transition divider between the Hero (gray #F8FAFC) and the
 * white "Nuestras 3 Sedes" section. Only touches the visual connection —
 * it never modifies the Hero or the Sedes content.
 */
export function SectionTransition() {
  return (
    <div className="relative z-[5] overflow-hidden bg-white -mt-12 md:-mt-20">
      <div className="relative h-[200px] w-full md:h-[240px]">
        {/* Organic curve: hero gray sweeps down into white */}
        <svg
          viewBox="0 0 1440 240"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="trans-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="62%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
            <filter id="trans-blur" x="-10%" y="-30%" width="120%" height="160%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
            <filter id="trans-shadow" x="-10%" y="-30%" width="120%" height="160%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>

          {/* Soft defined 3D silk shadow for high-end depth */}
          <path
            d={CURVE_PATH}
            transform="translate(0 7)"
            fill="rgba(15,23,42,0.08)"
            filter="url(#trans-shadow)"
          />
          <path
            d={CURVE_PATH}
            transform="translate(0 3)"
            fill="rgba(15,23,42,0.04)"
            filter="url(#trans-blur)"
          />
          {/* Main organic curve */}
          <path d={CURVE_PATH} fill="url(#trans-grad)" />
        </svg>

        {/* Logistics line floating in the white area */}
        <div className="absolute inset-x-0 bottom-6 md:bottom-9">
          <div className="mx-auto w-full max-w-5xl px-6">
            <LogisticsLine />
          </div>
        </div>
      </div>
    </div>
  );
}
