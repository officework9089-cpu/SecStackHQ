import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import { ContactFormData, FormValidationErrors, ProjectItem, EstimateResult } from '@/types';

/**
 * Validates the contact form inputs
 */
export function validateContactForm(data: ContactFormData): { isValid: boolean; errors: FormValidationErrors } {
  const errors: FormValidationErrors = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.workEmail || !emailRegex.test(data.workEmail.trim())) {
    errors.workEmail = 'Please provide a valid work email address.';
  }

  if (!data.company || data.company.trim().length < 2) {
    errors.company = 'Company or organization name is required.';
  }

  if (!data.service || data.service.trim().length === 0) {
    errors.service = 'Please select a primary service area.';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Please provide at least 10 characters describing your project goals.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates dynamic transparent project scope estimation
 */
export function calculateProjectEstimate(
  serviceIds: string[],
  complexity: 'mvp' | 'growth' | 'enterprise' = 'growth',
  urgency: 'standard' | 'accelerated' = 'standard'
): EstimateResult {
  const serviceRates: Record<
  string,
  { base: number; weeks: number; name: string }
> = {
  web: {
    base: 19999,
    weeks: 4,
    name: "Web & App Development",
  },
  cyber: {
    base: 19999,
    weeks: 2,
    name: "Cybersecurity & Pentesting",
  },
  design: {
    base: 7999,
    weeks: 2,
    name: "Branding & UI/UX Design",
  },
  seo: {
    base: 14999,
    weeks: 4,
    name: "SEO & Technical Growth",
  },
  marketing: {
    base: 12999,
    weeks: 4,
    name: "Social & Performance Marketing",
  },
};

  const complexityMultipliers = {
    mvp: 0.8,
    growth: 1.0,
    enterprise: 1.6,
  };

  const urgencyMultipliers = {
    standard: 1.0,
    accelerated: 1.25,
  };

  if (serviceIds.length === 0) {
    serviceIds = ['web'];
  }

  let totalBase = 0;
  let maxWeeks = 0;
  const breakdown: { item: string; cost: number }[] = [];

  for (const id of serviceIds) {
    const info = serviceRates[id] || { base: 5000, weeks: 4, name: id };
    const scaled = Math.round(info.base * complexityMultipliers[complexity] * urgencyMultipliers[urgency]);
    totalBase += scaled;
    if (info.weeks > maxWeeks) maxWeeks = info.weeks;
    breakdown.push({ item: info.name, cost: scaled });
  }

  // Multi-service bundle discount
  if (serviceIds.length >= 2) {
    const discount = Math.round(totalBase * 0.1);
    totalBase -= discount;
    breakdown.push({ item: 'Multi-Discipline Synergy Discount (10%)', cost: -discount });
  }

  const finalWeeks = urgency === 'accelerated' ? Math.max(2, Math.round(maxWeeks * 0.75)) : maxWeeks;

  return {
    baseCost: totalBase,
    timelineWeeks: finalWeeks,
    breakdown,
  };
}

/**
 * Filters projects by category
 */
export function filterProjects(projects: ProjectItem[], category: string): ProjectItem[] {
  if (!category || category === 'all') {
    return projects;
  }
  return projects.filter((p) => p.category === category);
}
