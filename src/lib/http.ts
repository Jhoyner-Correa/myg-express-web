import type { NextRequest } from "next/server";

const MAX_RATE_LIMIT_ENTRIES = 10_000;

type RateLimitEntry = { count: number; resetAt: number };

const globalRateLimits = globalThis as typeof globalThis & {
  __mygRateLimits?: Map<string, RateLimitEntry>;
};

const rateLimits = globalRateLimits.__mygRateLimits ?? new Map<string, RateLimitEntry>();
globalRateLimits.__mygRateLimits = rateLimits;

function pruneExpiredEntries(now: number): void {
  for (const [key, entry] of rateLimits) {
    if (entry.resetAt <= now) rateLimits.delete(key);
  }

  while (rateLimits.size >= MAX_RATE_LIMIT_ENTRIES) {
    const oldestKey = rateLimits.keys().next().value as string | undefined;
    if (!oldestKey) break;
    rateLimits.delete(oldestKey);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds: number;
  resetAt: number;
}

export function consumeRateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
  now = Date.now(),
): RateLimitResult {
  if (rateLimits.size >= MAX_RATE_LIMIT_ENTRIES) pruneExpiredEntries(now);

  const current = rateLimits.get(key);
  const entry = !current || current.resetAt <= now
    ? { count: 0, resetAt: now + windowMs }
    : current;

  entry.count += 1;
  rateLimits.delete(key);
  rateLimits.set(key, entry);

  return {
    allowed: entry.count <= limit,
    limit,
    remaining: Math.max(0, limit - entry.count),
    retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    resetAt: entry.resetAt,
  };
}

export function getClientIp(request: NextRequest): string {
  // Vercel and Cloudflare overwrite these headers at their trusted edge.
  const candidates = [
    request.headers.get("x-vercel-forwarded-for"),
    request.headers.get("cf-connecting-ip"),
    request.headers.get("x-real-ip"),
    request.headers.get("x-forwarded-for")?.split(",")[0],
  ];

  return candidates.find((value) => value?.trim())?.trim().slice(0, 64) ?? "unknown";
}

export function isSameOrigin(request: NextRequest): boolean {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "same-site") return false;

  const origin = request.headers.get("origin");
  if (!origin) return process.env.NODE_ENV !== "production";

  try {
    const expectedHost = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    return new URL(origin).host === expectedHost;
  } catch {
    return false;
  }
}

export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    "RateLimit-Limit": String(result.limit),
    "RateLimit-Remaining": String(result.remaining),
    "RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
    ...(result.allowed ? {} : { "Retry-After": String(result.retryAfterSeconds) }),
  };
}
