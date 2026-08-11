"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollExperience() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1.5 pointer-events-none overflow-hidden bg-slate-900/10">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-[#0E8F45] via-[#2db84b] to-[#22c55e] shadow-[0_0_14px_rgba(34,197,94,0.8)]"
        style={{ scaleX }}
      />
    </div>
  );
}
