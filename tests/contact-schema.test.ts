import { describe, expect, it } from "vitest";
import { contactSchema } from "../src/features/contact/schema";

const validContact = {
  name: "María Pérez",
  phone: "+51 999 999 999",
  branch: "Satipo" as const,
  message: "Necesito información sobre mi envío.",
  website: "",
};

describe("contactSchema", () => {
  it("accepts a valid contact request", () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true);
  });

  it("rejects unknown branches", () => {
    expect(contactSchema.safeParse({ ...validContact, branch: "Otra" }).success).toBe(false);
  });

  it("preserves honeypot content so the route can silently discard bots", () => {
    const result = contactSchema.safeParse({ ...validContact, website: "spam.example" });
    expect(result.success && result.data.website).toBe("spam.example");
  });

  it("rejects malformed phone numbers", () => {
    expect(contactSchema.safeParse({ ...validContact, phone: "call-me" }).success).toBe(false);
  });
});
