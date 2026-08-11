import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] pt-20">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-baseline gap-0">
          <span className="font-display text-5xl text-foreground">My</span>
          <span className="font-display text-5xl text-green">G</span>
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="mt-4 space-y-3">
          <Skeleton className="h-12 w-[600px] max-w-full" />
          <Skeleton className="h-12 w-[400px] max-w-full" />
          <Skeleton className="h-12 w-[500px] max-w-full" />
        </div>
      </div>
    </div>
  );
}
