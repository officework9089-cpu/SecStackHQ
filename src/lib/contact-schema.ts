import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Enter a valid email address").max(255, "Email is too long"),
  subject: z.string().trim().min(3, "Add a short subject").max(150, "Subject must be under 150 characters"),
  service: z.string().trim().min(1, "Choose a service"),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a bit more (at least 10 characters)")
    .max(2000, "Message must be under 2000 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function buildMailto(to: string, data: ContactInput) {
  const body = `Name: ${data.name}\nEmail: ${data.email}\nService: ${data.service}\n\n${data.message}`;
  return `mailto:${to}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
}

export function buildWhatsApp(number: string, data: ContactInput) {
  const text = `Hi SecStackHQ, I'm ${data.name} (${data.email}). I'm interested in ${data.service}.\n\n${data.subject}\n${data.message}`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
