import { z } from "zod";
import { services } from "@/data/platform";
export const promptSchema = z.string().trim().min(3).max(2000);
export const scanUrlSchema = z.string().trim().max(2048).url().refine((value) => {
  const u = new URL(value);
  return ["https:", "http:"].includes(u.protocol) && !u.username && !u.password;
}, "Enter an HTTP or HTTPS URL without credentials.");
export const scanFindings = [
  { title: "Content Security Policy", severity: "High", text: "Illustrative finding: a restrictive CSP could reduce script injection risk." },
  { title: "Transport security", severity: "Medium", text: "Illustrative finding: enable HSTS and review TLS configuration." },
  { title: "Exposed debug paths", severity: "Critical", text: "Illustrative finding: protect diagnostic endpoints and remove public debug output." },
  { title: "Technology disclosure", severity: "Low", text: "Illustrative finding: remove unnecessary server version headers." },
] as const;
export function simulateScan(url: string) {
  return { target: scanUrlSchema.parse(url), score: 68, findings: scanFindings, simulated: true as const };
}
export function matchService(prompt: string) {
  const p = prompt.toLowerCase();
  const id = /secur|pentest|vulnerab|hack|audit/.test(p) ? "security" : /social|instagram|tiktok/.test(p) ? "social" : /seo|search|organic/.test(p) ? "seo" : /logo|brand|graphic|design/.test(p) ? "design" : /ads|campaign|marketing/.test(p) ? "marketing" : "web";
  return services.find((s) => s.id === id) ?? services[0];
}
export function estimateScope(type: string, features: string[], timeline: string) {
  const base: Record<string, number> = { web: 6500, security: 8500, design: 4500, seo: 3500, marketing: 4000, social: 4000 };
  const cost = (base[type] ?? 6500) + features.length * 750;
  const low = Math.round(cost * (timeline === "Accelerated" ? 1.25 : 1));
  return { low, high: Math.round(low * 1.3), weeks: Math.max(3, 4 + features.length), stack: type === "security" ? "OWASP · Burp Suite · manual verification" : type === "web" ? "React · TypeScript · managed Cloud" : "Figma · analytics · content systems" };
}