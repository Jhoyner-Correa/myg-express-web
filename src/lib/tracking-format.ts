import { AlertTriangle, MapPin, Package, PackageCheck, Truck, type LucideIcon } from "lucide-react";
import type { Shipment, TrackingStep } from "@/types/tracking";

export type StatusKey =
  | "received"
  | "transit"
  | "arrived"
  | "outForDelivery"
  | "failed"
  | "delivered"
  | "processing";

export interface Milestone {
  key: StatusKey;
  label: string;
  icon: LucideIcon;
  date?: string;
  time?: string;
  done: boolean;
  isCurrent: boolean;
}

const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

const AGENCY_CITY: Record<string, string> = {
  LIM: "Lima",
  STP: "Satipo",
  MER: "La Merced",
  OXA: "Oxapampa",
  CHA: "Chanchamayo",
  PCH: "Pichanaki",
  MZM: "Mazamari",
  PNG: "Pangoa",
  PER: "Perené",
  VRC: "Villa Rica",
  SMR: "San Ramón",
  PRA: "Pucallpa",
  HUAN: "Huancayo",
  JAU: "Jauja",
};

const SPECIAL_DISTRICT_NAMES: Record<string, string> = {
  "SAN MARTIN DE PANGOA": "San Martín de Pangoa",
  "SAN MARTIN PANGOA": "San Martín de Pangoa",
  PANGOA: "Pangoa",
  MAZAMARI: "Mazamari",
  PICHANAKI: "Pichanaki",
  PICHANAQUI: "Pichanaqui",
  PERENE: "Perené",
  "RIO NEGRO": "Río Negro",
  "SAN RAMON": "San Ramón",
  "LA MERCED": "La Merced",
  "VILLA RICA": "Villa Rica",
  OXAPAMPA: "Oxapampa",
  CHANCHAMAYO: "Chanchamayo",
  SATIPO: "Satipo",
  "PUERTO BERMUDEZ": "Puerto Bermúdez",
  COVIRIALI: "Coviriali",
  LLAYLLA: "Llaylla",
  "RIO TAMBO": "Río Tambo",
  "PAMPA SILVA": "Pampa Silva",
};

export function toTitleCase(str: string): string {
  const lowercaseWords = new Set(["de", "del", "la", "el", "en", "y", "o"]);
  return str
    .toLowerCase()
    .split(/\s+/)
    .map((word, idx) => {
      if (!word) return "";
      if (idx > 0 && lowercaseWords.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function cityName(destination: string): string {
  let d = (destination ?? "").trim();
  if (!d) return "tu ciudad";

  const codeKey = d.toUpperCase();
  if (AGENCY_CITY[codeKey]) return AGENCY_CITY[codeKey];

  d = d.replace(/^agencia\s+/i, "");
  d = (d.split(/[-/(]/)[0] ?? "").trim();

  const upper = d.toUpperCase();
  if (SPECIAL_DISTRICT_NAMES[upper]) return SPECIAL_DISTRICT_NAMES[upper];
  if (AGENCY_CITY[upper]) return AGENCY_CITY[upper];

  return toTitleCase(d);
}

export function fmtDate(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m?.[1] || !m[2] || !m[3]) return iso;
  return `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]}`;
}

export function parseStepDateTime(description: string): { date?: string; time?: string; datetime?: string } {
  const s = description ?? "";
  const isoFull = s.match(/(\d{4}-\d{2}-\d{2})[ T](\d{1,2}:\d{2})/);
  if (isoFull?.[1] && isoFull[2]) {
    const iso = isoFull[1];
    const time = isoFull[2];
    return { date: fmtDate(iso), time, datetime: `${iso} ${time}` };
  }
  const isoDate = s.match(/(\d{4}-\d{2}-\d{2})/);
  if (isoDate?.[1]) return { date: fmtDate(isoDate[1]), datetime: isoDate[1] };
  const ampm = s.match(/\b(\d{1,2}:\d{2}\s*(?:a\.?\s*m\.?|p\.?\s*m\.?))\b/i);
  if (ampm?.[1]) return { time: ampm[1] };
  return {};
}

export function fmtUpdatedAt(raw: string): string {
  const m = (raw ?? "").match(/(\d{4}-\d{2}-\d{2})/);
  if (m?.[1]) return fmtDate(m[1]);
  const t = (raw ?? "").trim();
  return t || "recientemente";
}

export function relativeTime(datetime?: string): string | null {
  if (!datetime) return null;
  const d = new Date(datetime.replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return null;
  const diff = Date.now() - d.getTime();
  if (diff < 0) return null;
  const min = Math.floor(diff / 60_000);
  if (min < 1) return "hace un momento";
  if (min < 60) return `hace ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return h === 1 ? "hace 1 hora" : `hace ${h} horas`;
  const days = Math.floor(h / 24);
  if (days === 1) return "hace 1 día";
  if (days < 7) return `hace ${days} días`;
  return null;
}

export function statusKeyOf(status: string, shipment?: Shipment): StatusKey {
  const s = (status ?? "").toUpperCase();
  const summary = (shipment?.summary ?? "").toUpperCase();
  const obsTitle = (shipment?.obsTitle ?? "").toUpperCase();

  if (
    shipment?.isObserved ||
    /VISITADO|NO SE ENTREGO|INTENTAMOS|NO PUDIMOS|FALLIDO|NO ENTREGADO|DEVUELTO|CANCELADO|SIN ENTREGA|OBSERVAD/.test(s) ||
    /VISITADO|NO SE ENTREGO|INTENTAMOS|NO PUDIMOS/.test(summary) ||
    /NO PUDIMOS|NO SE PUDO|SIN ENTREGA/.test(obsTitle)
  ) {
    return "failed";
  }

  if (/ENTREGAD|ENTREGAMOS|ENTREGA A/.test(s)) return "delivered";
  if (/ENTREGARSE|REPARTO|SALIO/.test(s)) return "outForDelivery";
  if (/LLEGO|ARRIBO|SEDE|CIUDAD DESTINO/.test(s)) return "arrived";
  if (/TRANSIT|TRASLAD|RUTA|CAMINO|DESPACH/.test(s)) return "transit";
  if (/RECIBIMOS|RECIBIDO|PEDIDO|CREADO/.test(s)) return "received";
  return "processing";
}

export interface StatusPresentation {
  key: StatusKey;
  name: string;
  headline: string;
  subline: string;
  description: string;
  icon: LucideIcon;
  updatedAtLabel: string;
}

const PRESENTATIONS: Record<StatusKey, { name: string; icon: LucideIcon }> = {
  delivered: { name: "Entregado", icon: PackageCheck },
  failed: { name: "No se pudo entregar (Visita realizada)", icon: AlertTriangle },
  outForDelivery: { name: "En reparto", icon: Truck },
  arrived: { name: "Llegó a la ciudad destino", icon: MapPin },
  transit: { name: "En camino", icon: Truck },
  received: { name: "Pedido recibido", icon: Package },
  processing: { name: "En proceso", icon: Package },
};

function headlinesFor(key: StatusKey, city: string, shipment?: Shipment): { headline: string; subline: string } {
  switch (key) {
    case "failed":
      return {
        headline: shipment?.obsTitle || `No pudimos realizar la entrega en ${city}`,
        subline: "Por favor, comunícate con MyG Express para poder coordinar la entrega de tu paquete de nuevo.",
      };
    case "delivered":
      return {
        headline: `¡Tu paquete fue entregado en ${city}!`,
        subline: "Gracias por confiar en nosotros.",
      };
    case "outForDelivery":
      return {
        headline: `¡Tu paquete ya se encuentra en ${city}!`,
        subline: "Nuestro repartidor realizará la entrega durante las próximas horas.",
      };
    case "arrived":
      return {
        headline: `¡Tu paquete llegó a ${city}!`,
        subline: "Estamos coordinando la entrega a tu dirección.",
      };
    case "transit":
      return {
        headline: `¡Tu paquete está viajando hacia ${city}!`,
        subline: "Llegará en breve a su destino.",
      };
    case "received":
      return {
        headline: "¡Pedido recibido en origen!",
        subline: "Tu envío está en preparación para la salida.",
      };
    default:
      return {
        headline: "¡Tu paquete está en proceso logístico!",
        subline: "Estamos actualizando los detalles de seguimiento.",
      };
  }
}

function descriptionFor(key: StatusKey, city: string): string {
  switch (key) {
    case "failed":
      return `No se logró entregar el paquete en ${city}. Por favor, comunícate con MyG Express para coordinar tu entrega de nuevo.`;
    case "delivered":
      return `Tu paquete fue entregado en ${city}. ¡Gracias por confiar en nosotros!`;
    case "outForDelivery":
      return `Tu paquete ya se encuentra en ${city}. Nuestro repartidor realizará la entrega durante las próximas horas.`;
    case "arrived":
      return `Tu paquete llegó a ${city}. Estamos coordinando la entrega a tu dirección.`;
    case "transit":
      return `Tu paquete está viajando hacia ${city}. Llegará en breve.`;
    case "received":
      return "Tu pedido fue registrado y está en preparación para el envío.";
    default:
      return "Tu paquete se encuentra en proceso logístico.";
  }
}

export function statusPresentation(shipment: Shipment): StatusPresentation {
  const key = statusKeyOf(shipment.status, shipment);
  const base = PRESENTATIONS[key];
  const city = cityName(shipment.destination);

  const curStep = shipment.steps.find((s) => s.isCurrent);
  const dt = curStep ? parseStepDateTime(curStep.description).datetime : undefined;
  const rel = relativeTime(dt);

  const { headline, subline } = headlinesFor(key, city, shipment);

  return {
    key,
    name: base.name,
    headline,
    subline,
    description: descriptionFor(key, city),
    icon: base.icon,
    updatedAtLabel: rel ?? `Actualizado ${fmtUpdatedAt(shipment.updatedAt)}`,
  };
}

const MILESTONE_DEFS: { key: StatusKey; label: string; match: RegExp; icon: LucideIcon }[] = [
  { key: "received", label: "Pedido recibido", match: /RECIBIMOS|RECIBIDO|PEDIDO CREADO/, icon: Package },
  { key: "transit", label: "En camino", match: /DESPACH|CAMINO|TRANSITO|TRASLAD|RUTA/, icon: Truck },
  { key: "arrived", label: "Llegó a la ciudad destino", match: /LLEGO|ARRIBO|CIUDAD DESTINO|SEDE/, icon: MapPin },
  { key: "outForDelivery", label: "Salió a reparto", match: /ENTREGARSE|REPARTO|SALIO/, icon: Truck },
  { key: "failed", label: "Visita realizada (No entregado)", match: /VISITADO|NO SE ENTREGO|INTENTAMOS|NO PUDIMOS/, icon: AlertTriangle },
  { key: "delivered", label: "Entregado", match: /ENTREGAD|ENTREGAMOS|ENTREGA A/, icon: PackageCheck },
];

export function buildMilestones(steps: TrackingStep[], destination: string, shipment?: Shipment): Milestone[] {
  const city = cityName(destination);
  const current = steps.find((s) => s.isCurrent);
  const currentKey = shipment ? statusKeyOf(shipment.status, shipment) : (current ? statusKeyOf(current.title) : null);

  const defs = [...MILESTONE_DEFS];
  if (currentKey !== "failed") {
    const hasFailedStep = steps.some((s) => /VISITADO|NO SE ENTREGO|INTENTAMOS|NO PUDIMOS/.test((s.title ?? "").toUpperCase()));
    if (!hasFailedStep) {
      const idx = defs.findIndex((d) => d.key === "failed");
      if (idx !== -1) defs.splice(idx, 1);
    }
  }

  return defs.map((def) => {
    const step = steps.find((s) => def.match.test((s.title ?? "").toUpperCase()));
    const parsed = step ? parseStepDateTime(step.description) : {};
    return {
      key: def.key,
      label: def.key === "arrived" ? `Llegó a ${city}` : def.label,
      icon: def.icon,
      date: parsed.date,
      time: parsed.time,
      done: Boolean(step && step.done),
      isCurrent: currentKey === def.key,
    };
  });
}

export function friendlyStepTitle(title: string): string {
  const t = (title ?? "").toUpperCase();
  if (/ENTREGAMOS|ENTREGA A/.test(t)) return "Entregado";
  if (/ENTREGARSE|REPARTO|SALIO/.test(t)) return "En reparto";
  if (/LLEGO|ARRIBO|CIUDAD DESTINO/.test(t)) return "Llegó a la ciudad destino";
  if (/EN SEDE|SEDE/.test(t)) return "En sede";
  if (/PRE-EMBARQUE|PRE EMBARQUE/.test(t)) return "Preparando envío";
  if (/DESPACHAMOS|CAMINO|TRANSITO|TRASLAD|RUTA/.test(t)) return "En camino";
  if (/RECIBIMOS|RECIBIDO/.test(t)) return "Recibido en origen";
  if (/PEDIDO CREADO|CREADO/.test(t)) return "Pedido creado";
  const c = (title ?? "").trim();
  return c ? c.charAt(0).toUpperCase() + c.slice(1).toLowerCase() : "Evento";
}
