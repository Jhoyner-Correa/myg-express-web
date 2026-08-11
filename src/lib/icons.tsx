import type { LucideIcon } from "lucide-react";
import {
  Truck,
  Package,
  Gift,
  MessageSquare,
  Star,
  Shield,
  MapPin,
  Clipboard,
  Bell,
  CheckCircle,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Map,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  truck: Truck,
  package: Package,
  gift: Gift,
  messageSquare: MessageSquare,
  star: Star,
  shield: Shield,
  mapPin: MapPin,
  clipboard: Clipboard,
  bell: Bell,
  checkCircle: CheckCircle,
  phone: Phone,
  mail: Mail,
  clock: Clock,
  facebook: Facebook,
  instagram: Instagram,
  map: Map,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Package;
}
