import {
  PackageCheck,
  Truck,
  Navigation,
  Building2,
  Zap,
  Headphones,
  ShieldCheck,
  type LucideProps,
} from "lucide-react";

interface ServiceIconProps extends LucideProps {
  name: string;
}

export function ServiceIcon({ name, className, strokeWidth = 2, ...props }: ServiceIconProps) {
  switch (name) {
    case "envio-paquetes":
      return <PackageCheck className={className} strokeWidth={strokeWidth} {...props} />;
    case "recojo-domicilio":
      return <Truck className={className} strokeWidth={strokeWidth} {...props} />;
    case "rastreo-tiempo-real":
      return <Navigation className={className} strokeWidth={strokeWidth} {...props} />;
    case "atencion-empresas":
      return <Building2 className={className} strokeWidth={strokeWidth} {...props} />;
    case "entregas-express":
      return <Zap className={className} strokeWidth={strokeWidth} {...props} />;
    case "atencion-personalizada":
      return <Headphones className={className} strokeWidth={strokeWidth} {...props} />;
    default:
      return <ShieldCheck className={className} strokeWidth={strokeWidth} {...props} />;
  }
}