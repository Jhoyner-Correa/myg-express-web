"use client";

import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { SectionTag } from "./section-tag";

interface SectionHeadingProps {
  tag?: string;
  title: string;
  highlight?: string;
  description?: string;
  center?: boolean;
  className?: string;
  dark?: boolean;
}

export function SectionHeading({
  tag,
  title,
  highlight,
  description,
  center = false,
  className,
  dark = false,
}: SectionHeadingProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        center && "mx-auto max-w-2xl text-center",
        "mb-12",
        className,
      )}
    >
      {tag && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <SectionTag>{tag}</SectionTag>
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={cn(
          "font-display text-4xl leading-tight md:text-5xl lg:text-6xl",
          dark ? "text-white" : "text-foreground",
        )}
      >
        {title}{" "}
        {highlight && <span className="text-green">{highlight}</span>}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={cn(
            "mt-3 max-w-lg text-base leading-relaxed",
            center && "mx-auto",
            dark ? "text-white/55" : "text-muted-foreground",
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
