import { NextRequest, NextResponse } from "next/server";
import { trackShipment } from "@/services/tracking";
import { normalizeTrackingCode } from "@/lib/utils";
import type { Shipment } from "@/types/tracking";
import { consumeRateLimit, getClientIp, rateLimitHeaders } from "@/lib/http";

function positiveNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

const TRACKING_RATE_LIMIT = {
  limit: positiveNumber(process.env.RATE_LIMIT_MAX, 60),
  windowMs: positiveNumber(process.env.RATE_LIMIT_WINDOW_MS, 60_000),
};

function toPublicShipment(shipment: Shipment): Shipment {
  return {
    code: shipment.code,
    status: shipment.status,
    summary: shipment.summary,
    updatedAt: shipment.updatedAt,
    destination: shipment.destination,
    source: shipment.source,
    steps: shipment.steps,
    operator: shipment.operator,
    estimatedDelivery: shipment.estimatedDelivery,
    recipient: shipment.recipient,
    recipientEmail: shipment.recipientEmail,
    address: shipment.address,
    obsTitle: shipment.obsTitle,
    obsDetail: shipment.obsDetail,
    isObserved: shipment.isObserved,
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) {
  const rateLimit = consumeRateLimit(`tracking:${getClientIp(request)}`, TRACKING_RATE_LIMIT);
  const headers = rateLimitHeaders(rateLimit);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { ok: false, message: "Demasiadas solicitudes. Intenta de nuevo más tarde." },
      { status: 429, headers },
    );
  }

  const { code } = await params;
  const normalized = normalizeTrackingCode(code);

  if (!/^[A-Z0-9-]{6,64}$/.test(normalized)) {
    return NextResponse.json(
      { ok: false, message: "Ingresa un código de seguimiento." },
      { status: 400, headers },
    );
  }

  try {
    const result = await trackShipment(normalized);

    if (!result.ok || !result.shipment) {
      return NextResponse.json(result, { status: 404, headers });
    }

    return NextResponse.json({ ok: true, shipment: toPublicShipment(result.shipment) }, {
      status: 200,
      headers: { ...headers, "Cache-Control": "private, no-store" },
    });
  } catch (error) {
    console.error("Tracking error:", error);
    return NextResponse.json(
      { ok: false, message: "Error interno del servidor." },
      { status: 500, headers },
    );
  }
}
