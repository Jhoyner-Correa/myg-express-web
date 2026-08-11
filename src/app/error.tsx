"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  void error;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] px-4 pt-20">
      <div className="flex items-baseline gap-0">
        <span className="font-display text-6xl text-foreground">My</span>
        <span className="font-display text-6xl text-green">G</span>
      </div>
      <h1 className="mt-6 font-display text-6xl font-black text-foreground">
        Algo salió mal
      </h1>
      <p className="mt-2 max-w-md text-center text-base text-muted-foreground">
        Ocurrió un error inesperado. Por favor, intenta de nuevo.
      </p>
      <div className="mt-8 flex gap-4">
        <Button size="lg" onClick={reset}>
          Intentar de nuevo
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </div>
  );
}
