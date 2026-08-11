import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const checks = {
    tracking: Boolean(
      process.env.URBANO_PUBLIC_TRACKING_URL ||
      process.env.URBANO_COOKIE ||
      process.env.URBANO_PHPSESSID ||
      (process.env.URBANO_LOGIN_URL && process.env.URBANO_USERNAME && process.env.URBANO_PASSWORD),
    ),
    contact: Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL && process.env.CONTACT_FROM),
    antiBot: Boolean(process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY),
  };
  const ready = process.env.NODE_ENV !== "production" || Object.values(checks).every(Boolean);

  return NextResponse.json(
    {
      ok: ready,
      service: "myg-express-tracking",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      checks,
    },
    { status: ready ? 200 : 503, headers: { "Cache-Control": "no-store" } },
  );
}
