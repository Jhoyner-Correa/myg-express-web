import { cn } from "@/lib/utils";

interface SectionTagProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionTag({ children, className }: SectionTagProps) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-extrabold uppercase tracking-widest text-green-dark bg-transparent p-0",
        className,
      )}
    >
      {children}
    </span>
  );
}
