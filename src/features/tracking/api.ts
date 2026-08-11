import { normalizeTrackingCode } from "@/lib/utils";
import type { TrackingResponse } from "@/types/tracking";

export async function fetchTracking(code: string): Promise<TrackingResponse> {
  const normalized = normalizeTrackingCode(code);

  if (!normalized) {
    return { ok: false, message: "Ingresa un código de seguimiento." };
  }

  const response = await fetch(`/api/track/${encodeURIComponent(normalized)}`, {
    signal: AbortSignal.timeout(15_000),
  });

  const data: TrackingResponse = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.message ?? "No se pudo consultar el envío.");
  }

  return data;
}
