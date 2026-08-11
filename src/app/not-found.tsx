import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] px-4 pt-20">
      <div className="flex items-baseline gap-0">
        <span className="font-display text-6xl text-foreground">My</span>
        <span className="font-display text-6xl text-green">G</span>
      </div>
      <h1 className="mt-6 font-display text-8xl font-black text-foreground">
        404
      </h1>
      <p className="mt-2 max-w-md text-center text-base text-muted-foreground">
        La página que buscas no existe. Puede que haya sido movida o eliminada.
      </p>
      <Button asChild size="lg" className="mt-8">
        <Link href="/">Volver al inicio</Link>
      </Button>
    </div>
  );
}
