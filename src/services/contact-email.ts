import type { ContactFormValues } from "@/features/contact/schema";
import { SITE } from "@/lib/constants";

const RESEND_API_URL = "https://api.resend.com/emails";

type ContactDetails = Pick<ContactFormValues, "name" | "phone" | "branch" | "message">;

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

function formatSubmittedAt(date = new Date()): string {
  return new Intl.DateTimeFormat("es-PE", {
    timeZone: "America/Lima",
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

export function renderContactEmail(contact: ContactDetails): { html: string; text: string } {
  const branch = contact.branch || "No especificada";
  const name = escapeHtml(contact.name);
  const phone = escapeHtml(contact.phone);
  const safeBranch = escapeHtml(branch);
  const message = escapeHtml(contact.message);
  const submittedAt = formatSubmittedAt();
  const callablePhone = contact.phone.replace(/[^\d+]/g, "");
  const phoneDigits = callablePhone.replace(/\D/g, "");
  const whatsappPhone = phoneDigits.length === 9 ? `51${phoneDigits}` : phoneDigits;
  const whatsappText = encodeURIComponent(`Hola ${contact.name}, recibimos tu consulta enviada desde la web de MyG Express.`);

  const text = [
    "NUEVA CONSULTA WEB — MYG EXPRESS",
    "",
    `Nombre: ${contact.name}`,
    `Teléfono: ${contact.phone}`,
    `Sede: ${branch}`,
    `Recibido: ${submittedAt}`,
    "",
    "MENSAJE",
    contact.message,
    "",
    `Responder por WhatsApp: https://wa.me/${whatsappPhone}?text=${whatsappText}`,
  ].join("\n");

  const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Nueva consulta web</title>
  </head>
  <body style="margin:0;padding:0;background-color:#eef2f1;font-family:Arial,Helvetica,sans-serif;color:#17211c;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">Nueva consulta de ${name} para la sede ${safeBranch}.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background-color:#eef2f1;">
      <tr>
        <td align="center" style="padding:32px 12px;">
          <table role="presentation" width="620" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:620px;background-color:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 12px 30px rgba(16,55,34,0.10);">
            <tr>
              <td style="padding:30px 34px;background-color:#0b6f39;border-bottom:5px solid #35c759;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td>
                      <div style="font-size:28px;line-height:32px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">MyG <span style="color:#76ed8c;">Express</span></div>
                      <div style="margin-top:6px;font-size:13px;line-height:20px;color:#d9f8e1;">Logística y entregas de confianza</div>
                    </td>
                    <td align="right" valign="middle">
                      <span style="display:inline-block;padding:7px 11px;border-radius:999px;background-color:#ffffff;color:#0b6f39;font-size:11px;font-weight:700;letter-spacing:0.5px;">NUEVA CONSULTA</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:34px;">
                <h1 style="margin:0;font-size:24px;line-height:32px;color:#11251a;">Hola, tienes un nuevo contacto</h1>
                <p style="margin:8px 0 26px;font-size:14px;line-height:22px;color:#617067;">Una persona completó el formulario de ${SITE.url.replace("https://", "")}.</p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border:1px solid #dfe8e3;border-radius:12px;background-color:#f8fbf9;">
                  <tr>
                    <td width="50%" valign="top" style="padding:18px;border-bottom:1px solid #dfe8e3;border-right:1px solid #dfe8e3;">
                      <div style="font-size:10px;font-weight:700;letter-spacing:1px;color:#748078;">NOMBRE</div>
                      <div style="margin-top:6px;font-size:16px;font-weight:700;color:#17211c;">${name}</div>
                    </td>
                    <td width="50%" valign="top" style="padding:18px;border-bottom:1px solid #dfe8e3;">
                      <div style="font-size:10px;font-weight:700;letter-spacing:1px;color:#748078;">TELÉFONO</div>
                      <div style="margin-top:6px;font-size:16px;font-weight:700;"><a href="tel:${callablePhone}" style="color:#0b6f39;text-decoration:none;">${phone}</a></div>
                    </td>
                  </tr>
                  <tr>
                    <td width="50%" valign="top" style="padding:18px;border-right:1px solid #dfe8e3;">
                      <div style="font-size:10px;font-weight:700;letter-spacing:1px;color:#748078;">SEDE DE INTERÉS</div>
                      <div style="margin-top:6px;font-size:15px;font-weight:700;color:#17211c;">${safeBranch}</div>
                    </td>
                    <td width="50%" valign="top" style="padding:18px;">
                      <div style="font-size:10px;font-weight:700;letter-spacing:1px;color:#748078;">RECIBIDO</div>
                      <div style="margin-top:6px;font-size:13px;line-height:19px;font-weight:700;color:#17211c;">${escapeHtml(submittedAt)}</div>
                    </td>
                  </tr>
                </table>

                <div style="margin-top:24px;padding:22px;border-left:4px solid #35c759;border-radius:4px 12px 12px 4px;background-color:#f2faf4;">
                  <div style="font-size:10px;font-weight:700;letter-spacing:1px;color:#0b6f39;">MENSAJE</div>
                  <div style="margin-top:10px;font-size:15px;line-height:24px;color:#263a2f;white-space:pre-wrap;">${message}</div>
                </div>

                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;">
                  <tr>
                    <td style="border-radius:10px;background-color:#159447;">
                      <a href="https://wa.me/${whatsappPhone}?text=${whatsappText}" style="display:inline-block;padding:13px 19px;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;">Responder por WhatsApp</a>
                    </td>
                    <td width="10"></td>
                    <td style="border:1px solid #cbd8d0;border-radius:10px;background-color:#ffffff;">
                      <a href="tel:${callablePhone}" style="display:inline-block;padding:12px 19px;color:#263a2f;text-decoration:none;font-size:14px;font-weight:700;">Llamar</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 34px;background-color:#11251a;color:#b8c7be;font-size:11px;line-height:18px;">
                Este correo fue generado automáticamente por el formulario seguro de MyG Express. No respondas directamente a este mensaje; utiliza los datos del cliente.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { html, text };
}

export interface EmailDeliveryResult {
  id: string;
}

export async function sendContactEmail(contact: ContactDetails): Promise<EmailDeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !to || !from) throw new Error("Contact email service is not configured");

  const branch = contact.branch || "No especificada";
  const content = renderContactEmail(contact);
  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Nueva consulta web · ${branch} · ${contact.name}`,
      text: content.text,
      html: content.html,
    }),
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });

  const payload = (await response.json().catch(() => null)) as { id?: string } | null;
  if (!response.ok || !payload?.id) throw new Error(`Email provider rejected the request (${response.status})`);
  return { id: payload.id };
}
