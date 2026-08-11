import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/features/contact/schema";
import {
  consumeRateLimit,
  getClientIp,
  isSameOrigin,
  rateLimitHeaders,
} from "@/lib/http";
import { sendContactEmail } from "@/services/contact-email";
import { verifyTurnstile } from "@/services/turnstile";

const MAX_BODY_BYTES = 8_192;
const CONTACT_RATE_LIMIT = { limit: 5, windowMs: 10 * 60_000 };

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ ok: false, message: "Solicitud no permitida." }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, message: "Solicitud demasiado grande." }, { status: 413 });
  }

  const ip = getClientIp(request);
  const rateLimit = consumeRateLimit(`contact:${ip}`, CONTACT_RATE_LIMIT);
  const headers = rateLimitHeaders(rateLimit);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { ok: false, message: "Demasiadas solicitudes. Intenta nuevamente en unos minutos." },
      { status: 429, headers },
    );
  }

  try {
    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, message: "Solicitud demasiado grande." }, { status: 413, headers });
    }

    const parsed = contactSchema.safeParse(JSON.parse(rawBody));
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: "Datos inválidos. Revisa los campos." },
        { status: 400, headers },
      );
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true, message: "Mensaje recibido." }, { status: 200, headers });
    }

    const isHuman = await verifyTurnstile(parsed.data.turnstileToken ?? "", ip);
    if (!isHuman) {
      return NextResponse.json(
        { ok: false, message: "No pudimos verificar que seas una persona. Intenta nuevamente." },
        { status: 400, headers },
      );
    }

    const delivery = await sendContactEmail(parsed.data);
    console.info("Contact email accepted", { deliveryId: delivery.id });

    return NextResponse.json(
      { ok: true, message: "Mensaje enviado correctamente." },
      { status: 200, headers },
    );
  } catch (error) {
    const reference = crypto.randomUUID();
    console.error("Contact request failed", {
      reference,
      reason: error instanceof Error ? error.message : "Unknown error",
    });
    return NextResponse.json(
      {
        ok: false,
        message: "No pudimos enviar tu mensaje. Escríbenos por WhatsApp o intenta más tarde.",
        reference,
      },
      { status: 503, headers },
    );
  }
}
