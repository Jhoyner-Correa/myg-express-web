import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(80, "El nombre es demasiado largo"),
  phone: z
    .string()
    .min(7, "Ingresa un número válido")
    .max(20, "Número demasiado largo")
    .regex(/^[\d\s+\-()]+$/, "Ingresa un número de teléfono válido"),
  branch: z.enum(["", "La Merced", "Satipo", "Oxapampa", "Huancayo"]).optional(),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(1000, "El mensaje es demasiado largo"),
  website: z.string().max(200).optional(),
  turnstileToken: z.string().max(2048).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
