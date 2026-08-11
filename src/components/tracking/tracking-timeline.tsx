"use client";

import type { TrackingStep } from "@/types/tracking";
import { motion } from "framer-motion";

interface TrackingTimelineProps {
  steps: TrackingStep[];
}

function StepIndicator({ done, isLast }: { done: boolean; isLast: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className={`h-4 w-4 flex-shrink-0 rounded-full ${
          done
            ? "bg-green shadow-[0_0_0_4px_rgba(34,197,94,0.2)]"
            : "bg-zinc-300"
        }`}
      />
      {!isLast && (
        <div
          className={`mt-1 w-0.5 flex-1 ${
            done ? "bg-green/30" : "bg-zinc-200"
          }`}
          style={{ height: 36 }}
        />
      )}
    </div>
  );
}

export function TrackingTimeline({ steps }: TrackingTimelineProps) {
  if (!steps?.length) return null;

  return (
    <div className="flex flex-col gap-4">
      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className={`flex gap-4 ${!step.done ? "opacity-50" : ""}`}
        >
          <StepIndicator done={step.done} isLast={i === steps.length - 1} />
          <div className="flex-1" style={{ marginTop: -2 }}>
            <p className="text-sm font-bold text-foreground">{step.title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {step.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
