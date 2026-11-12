import { services, projects, processSteps } from "./site";
export { services, projects, processSteps };

export const pageLinks = [
  { to: "/", label: "Home" }, { to: "/about", label: "About" },
  { to: "/services", label: "Services" }, { to: "/projects", label: "Projects" },
  { to: "/pricing", label: "Pricing" }, { to: "/ai-lab", label: "AI Lab" },
  { to: "/contact", label: "Contact" },
] as const;

export const plans = [
  { id: "starter", title: "Starter", monthly: 499, annualMonthly: 399, description: "A focused foundation for your next chapter.", points: ["One growth discipline", "Monthly strategy review", "Progress reporting", "Email support"] },
  { id: "growth", title: "Growth", monthly: 1499, annualMonthly: 1199, description: "Connected expertise for a growing business.", points: ["Three growth disciplines", "Security-first review", "Biweekly strategy sessions", "Priority support"] },
  { id: "enterprise", title: "Enterprise", monthly: 3999, annualMonthly: 3199, description: "A tailored partnership for complex ambitions.", points: ["Custom scope & delivery", "Dedicated technical lead", "Security & architecture reviews", "Agreed service levels"] },
];
export function planTotal(id: string, annual: boolean) {
  const plan = plans.find((p) => p.id === id);
  return plan ? (annual ? plan.annualMonthly * 12 : plan.monthly) : 0;
}
export const serviceSlugs: Record<string, string> = {
  web: "web-development", security: "cybersecurity", design: "graphic-design", seo: "seo", marketing: "digital-marketing", social: "social-media-marketing",
};
export const getService = (slug: string) => services.find((s) => serviceSlugs[s.id] === slug);
export const tools = ["React", "TypeScript", "Cloud", "OWASP", "Figma", "Search Console"];
export const team = [
  { name: "Engineering", role: "Scalable products. Thoughtful interfaces.", letter: "E" },
  { name: "Security", role: "Threat-aware design. Actionable findings.", letter: "S" },
  { name: "Growth", role: "Creative systems. Measurable experiments.", letter: "G" },
];