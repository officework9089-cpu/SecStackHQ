export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  features: string[];
  deliverables: string[];
  tools: string[];
  gradient: string;
  badge: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: 'web' | 'cyber' | 'design' | 'growth';
  categoryLabel: string;
  summary: string;
  challenge: string;
  solution: string;
  impactMetrics: { label: string; value: string }[];
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface ProcessStep {
  step: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
  icon: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: string;
  metricLabel: string;
}

export interface ContactFormData {
  fullName: string;
  workEmail: string;
  company: string;
  service: string;
  budgetRange: string;
  timeline: string;
  message: string;
}

export interface FormValidationErrors {
  fullName?: string;
  workEmail?: string;
  company?: string;
  service?: string;
  message?: string;
}

export interface EstimateResult {
  baseCost: number;
  timelineWeeks: number;
  breakdown: { item: string; cost: number }[];
}
