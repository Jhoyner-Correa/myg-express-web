const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
// Official Cloudflare test secret matching the always-pass development site key.
const TURNSTILE_DEV_SECRET_KEY = "1x0000000000000000000000000000000AA";

interface TurnstileResponse {
  success: boolean;
  hostname?: string;
  "error-codes"?: string[];
}

export async function verifyTurnstile(token: string, remoteIp: string): Promise<boolean> {
  const secret = process.env.NODE_ENV === "development"
    ? TURNSTILE_DEV_SECRET_KEY
    : process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("TURNSTILE_SECRET_KEY is not configured");
    }
    return true;
  }

  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp !== "unknown") body.set("remoteip", remoteIp);

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    body,
    signal: AbortSignal.timeout(8_000),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Turnstile responded with ${response.status}`);
  const result = (await response.json()) as TurnstileResponse;
  return result.success === true;
}
