import { describe, expect, it } from "vitest";
import { consumeRateLimit } from "../src/lib/http";

describe("consumeRateLimit", () => {
  it("blocks requests over the limit and reports remaining quota", () => {
    const key = `test:${crypto.randomUUID()}`;
    const options = { limit: 2, windowMs: 1_000 };

    expect(consumeRateLimit(key, options, 1_000)).toMatchObject({ allowed: true, remaining: 1 });
    expect(consumeRateLimit(key, options, 1_100)).toMatchObject({ allowed: true, remaining: 0 });
    expect(consumeRateLimit(key, options, 1_200)).toMatchObject({ allowed: false, remaining: 0 });
  });

  it("opens a new window after expiration", () => {
    const key = `test:${crypto.randomUUID()}`;
    const options = { limit: 1, windowMs: 1_000 };

    expect(consumeRateLimit(key, options, 1_000).allowed).toBe(true);
    expect(consumeRateLimit(key, options, 2_001)).toMatchObject({ allowed: true, remaining: 0 });
  });
});
