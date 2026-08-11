import { describe, expect, it } from "vitest";
import { renderContactEmail } from "../src/services/contact-email";

describe("renderContactEmail", () => {
  it("renders the branded contact details and actions", () => {
    const result = renderContactEmail({
      name: "Rosa Pérez",
      phone: "+51 999 123 456",
      branch: "Satipo",
      message: "Quiero consultar por un envío.",
    });

    expect(result.html).toContain("MyG <span");
    expect(result.html).toContain("Rosa Pérez");
    expect(result.html).toContain("Responder por WhatsApp");
    expect(result.html).toContain("https://wa.me/51999123456");
    expect(result.text).toContain("Quiero consultar por un envío.");
  });

  it("escapes user content before placing it in HTML", () => {
    const result = renderContactEmail({
      name: "<script>alert(1)</script>",
      phone: "+51 999 123 456",
      branch: "La Merced",
      message: "<img src=x onerror=alert(1)>",
    });

    expect(result.html).not.toContain("<script>alert(1)</script>");
    expect(result.html).not.toContain("<img src=x");
    expect(result.html).toContain("&lt;script&gt;");
    expect(result.html).toContain("&lt;img src=x onerror=alert(1)&gt;");
  });
});
