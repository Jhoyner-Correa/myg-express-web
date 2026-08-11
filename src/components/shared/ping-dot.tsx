import { cn } from "@/lib/utils";

interface PingDotProps {
  className?: string;
}

export function PingDot({ className }: PingDotProps) {
  return (
    <span className={cn("relative inline-flex h-2 w-2", className)}>
      <span className="absolute inset-0 animate-[ping_1.4s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-green opacity-75" />
      <span className="relative h-2 w-2 rounded-full bg-green" />
    </span>
  );
}
