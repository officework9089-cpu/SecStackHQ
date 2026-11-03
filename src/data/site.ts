import {
  Code2,
  ShieldCheck,
  Palette,
  TrendingUp,
  Megaphone,
  Lock,
  Cpu,
  Layers,
  Gauge,
  Sparkles,
  MessagesSquare,
  Search,
  ClipboardList,
  PenTool,
  Terminal,
  Bug,
  Rocket,
  type LucideIcon,
} from "lucide-react";

import dashboardImg from "@/assets/project-dashboard.jpg";
import securityImg from "@/assets/project-security.jpg";
import brandingImg from "@/assets/project-branding.jpg";
import ecommerceImg from "@/assets/project-ecommerce.jpg";
import seoImg from "@/assets/project-seo.jpg";
import socialImg from "@/assets/project-social.jpg";

export const brand = {
  name: "SecStackHQ",
  tagline: "DEVELOP • SECURE • GROW",
  email: "hello@secstackhq.com",
  phone: "+92 300 0000000",
  whatsapp: "923000000000",
  location: "Karachi, Pakistan · Serving clients worldwide",
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navLinks)[number]["id"];

export interface Service {
  id: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  points: string[];
}

export const services: Service[] = [
  {
    id: "web",
    title: "Website & Web App Development",
    short: "Web Development",
    description:
      "Fast, scalable websites and web applications built with modern frameworks, clean architecture and pixel-perfect interfaces.",
    icon: Code2,
    points: ["React & TypeScript apps", "Headless CMS & e-commerce", "APIs & cloud deployment"],
  },
  {
    id: "security",
    title: "Cybersecurity & Penetration Testing",
    short: "Cybersecurity",
    description:
      "We think like attackers so you don't have to. Vulnerability assessments, pentests and hardening that keep your business safe.",
    icon: ShieldCheck,
    points: ["Web & API pentesting", "Vulnerability assessments", "Security hardening & audits"],
  },
  {
    id: "design",
    title: "Graphic Design & Branding",
    short: "Branding",
    description:
      "Distinct visual identities, logos and marketing creative that make your brand instantly recognizable and trusted.",
    icon: Palette,
    points: ["Logo & identity systems", "UI/UX design", "Marketing creatives"],
  },
  {
    id: "seo",
    title: "SEO & Digital Marketing",
    short: "SEO & Marketing",
    description:
      "Data-driven SEO and performance marketing that puts you in front of the right customers and turns traffic into revenue.",
    icon: TrendingUp,
    points: ["Technical & on-page SEO", "Content strategy", "Paid ads & analytics"],
  },
  {
    id: "social",
    title: "Social Media Marketing",
    short: "Social Media",
    description:
      "Scroll-stopping content and community growth across every platform your audience lives on.",
    icon: Megaphone,
    points: ["Content calendars", "Campaign management", "Influencer & community growth"],
  },
];

export type ProjectCategory = "Web" | "Security" | "Branding" | "Marketing";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  details: string;
  image: string;
  stack: string[];
  demo: string;
  github: string;
}

export const projects: Project[] = [
  {
    id: "zenith",
    title: "Zenith Analytics Platform",
    category: "Web",
    summary: "Real-time SaaS dashboard for revenue and project insights.",
    details:
      "A multi-tenant analytics dashboard with live charts, role-based access and sub-second data refresh. Built for scale with edge rendering and an optimized API layer.",
    image: dashboardImg,
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    demo: "#",
    github: "#",
  },
  {
    id: "fortress",
    title: "Fortress Pentest Program",
    category: "Security",
    summary: "Full-scope penetration test for a fintech network.",
    details:
      "End-to-end reconnaissance, exploitation and reporting across 40+ assets. Critical findings were patched within 72 hours and the client passed their compliance audit.",
    image: securityImg,
    stack: ["Burp Suite", "Nmap", "Metasploit", "OWASP"],
    demo: "#",
    github: "#",
  },
  {
    id: "nexora",
    title: "Nexora Brand Identity",
    category: "Branding",
    summary: "Complete identity system for a next-gen tech startup.",
    details:
      "Logo, color system, typography and a full stationery suite — designed to feel premium and futuristic across print and digital.",
    image: brandingImg,
    stack: ["Illustrator", "Figma", "Brand Strategy"],
    demo: "#",
    github: "#",
  },
  {
    id: "shoply",
    title: "Shoply Commerce App",
    category: "Web",
    summary: "Mobile-first shopping experience with 2× conversion.",
    details:
      "A blazing-fast storefront with smart search, one-tap checkout and personalized recommendations. Conversion doubled within the first quarter.",
    image: ecommerceImg,
    stack: ["Next.js", "Stripe", "Tailwind", "Headless CMS"],
    demo: "#",
    github: "#",
  },
  {
    id: "rankrise",
    title: "RankRise SEO Growth",
    category: "Marketing",
    summary: "+152% organic traffic in six months.",
    details:
      "Technical SEO overhaul, content strategy and link building that moved 30+ keywords to page one and tripled inbound leads.",
    image: seoImg,
    stack: ["Ahrefs", "Search Console", "GA4", "Content"],
    demo: "#",
    github: "#",
  },
  {
    id: "pulse",
    title: "Pulse Social Campaign",
    category: "Marketing",
    summary: "Multi-platform campaign reaching 248K people.",
    details:
      "A cohesive content system across Instagram, TikTok and LinkedIn with weekly creative sprints and real-time performance tracking.",
    image: socialImg,
    stack: ["Meta Ads", "TikTok", "Canva", "Analytics"],
    demo: "#",
    github: "#",
  },
];

export const projectFilters: Array<"All" | ProjectCategory> = [
  "All",
  "Web",
  "Security",
  "Branding",
  "Marketing",
];

export const stats = [
  { value: 120, suffix: "+", label: "Projects delivered" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
  { value: 500, suffix: "+", label: "Vulnerabilities found" },
  { value: 15, suffix: "+", label: "Countries served" },
];

export const reasons: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Security-first approach", text: "Every line of code is built with threat models and best practices in mind.", icon: Lock },
  { title: "Modern technology", text: "We use proven, cutting-edge stacks that keep you ahead of competitors.", icon: Cpu },
  { title: "Scalable architecture", text: "Systems designed to grow from your first user to your millionth.", icon: Layers },
  { title: "Performance optimization", text: "Lightning-fast load times and smooth experiences on every device.", icon: Gauge },
  { title: "Creative solutions", text: "Design thinking that turns complex problems into elegant products.", icon: Sparkles },
  { title: "Reliable communication", text: "Clear updates, honest timelines and a team that actually answers.", icon: MessagesSquare },
];

export const processSteps: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Discovery", text: "We dig into your goals, users and competitors to define what success looks like.", icon: Search },
  { title: "Planning", text: "Scope, architecture, timeline and milestones — mapped out before a pixel moves.", icon: ClipboardList },
  { title: "Design", text: "Wireframes and high-fidelity interfaces crafted for clarity and conversion.", icon: PenTool },
  { title: "Development", text: "Clean, tested, scalable code shipped in fast, transparent sprints.", icon: Terminal },
  { title: "Testing & Security", text: "QA, performance audits and penetration testing before anything goes live.", icon: Bug },
  { title: "Deployment", text: "Smooth launch, monitoring and ongoing support so you keep growing.", icon: Rocket },
];

export const testimonials = [
  {
    quote:
      "SecStackHQ rebuilt our platform and ran a full security audit. Our site is faster, safer, and sales are up 40%. They feel like part of our team.",
    name: "Sarah Mitchell",
    role: "CEO, Brightline Retail",
  },
  {
    quote:
      "Their penetration test uncovered issues three other vendors missed. The report was clear, actionable and helped us pass our SOC 2 audit.",
    name: "Omar Haddad",
    role: "CTO, FinPay",
  },
  {
    quote:
      "From logo to launch, the branding work was stunning. We finally look like the premium company we are.",
    name: "Elena Rossi",
    role: "Founder, Nexora Labs",
  },
  {
    quote:
      "Organic traffic grew 152% in six months. The SEO team is data-driven, communicative and genuinely invested in our growth.",
    name: "James Carter",
    role: "Marketing Director, RankRise",
  },
];
