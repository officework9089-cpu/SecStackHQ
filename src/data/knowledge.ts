import { services, plans, processSteps } from "./platform";
export const knowledge = {
  brand: "SecStackHQ — DEVELOP • SECURE • GROW. Technology and security platform with a service arm.",
  services: services.map(({ title, description, points }) => ({ title, description, points })),
  pricing: { disclaimer: "Illustrative USD pricing only, not an approved quote or purchasable subscription.", plans },
  process: processSteps.map(({ title, text }) => ({ title, text })),
  ethics: "Security scanner is a fixed simulation: it never contacts the target and is not evidence of vulnerabilities. Pentesting requires written authorization.",
  proof: "Projects, metrics, testimonials and team illustrations are sample content, not verified client evidence.",
};