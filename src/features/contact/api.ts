import type { ContactFormValues } from "./schema";

export async function submitContact(data: ContactFormValues): Promise<void> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ message: "Error al enviar el mensaje" }));
    throw new Error(err.message ?? "Error al enviar el mensaje");
  }
}
