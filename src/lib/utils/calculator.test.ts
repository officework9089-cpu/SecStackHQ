import { test } from 'vitest';
import assert from 'node:assert/strict';
import { validateContactForm, calculateProjectEstimate, filterProjects } from '@/lib/utils/calculator';
import { ProjectItem } from '@/types';

test('validateContactForm passes valid inputs', () => {
  const validData = {
    fullName: 'Jane Doe',
    workEmail: 'jane@enterprise.com',
    company: 'FinTech Secure Labs',
    service: 'cyber',
    budgetRange: '$15k-$30k',
    timeline: '1-2 months',
    message: 'We require a comprehensive penetration test and web application architecture review.',
  };

  const result = validateContactForm(validData);
  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('validateContactForm flags missing or invalid fields', () => {
  const invalidData = {
    fullName: 'A',
    workEmail: 'invalid-email',
    company: '',
    service: '',
    budgetRange: '',
    timeline: '',
    message: 'short',
  };

  const result = validateContactForm(invalidData);
  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.workEmail);
  assert.ok(result.errors.company);
  assert.ok(result.errors.service);
  assert.ok(result.errors.message);
});

test('calculateProjectEstimate computes pricing and multi-discipline discount', () => {
  const single = calculateProjectEstimate(['web'], 'growth', 'standard');
  assert.equal(single.baseCost, 6500);
  assert.equal(single.timelineWeeks, 4);

  const bundled = calculateProjectEstimate(['web', 'cyber'], 'growth', 'standard');
  // (6500 + 8500) = 15000 - 10% (1500) = 13500
  assert.equal(bundled.baseCost, 13500);
  assert.ok(bundled.breakdown.some(b => b.item.includes('Synergy Discount')));
});

test('filterProjects handles category filtering', () => {
  const mockProjects: ProjectItem[] = [
    {
      id: '1',
      title: 'Web App',
      client: 'Alpha',
      category: 'web',
      categoryLabel: 'Web Dev',
      summary: 'Summary',
      challenge: 'Challenge',
      solution: 'Solution',
      impactMetrics: [],
      tags: ['React'],
      imageUrl: '/img1.jpg',
    },
    {
      id: '2',
      title: 'Pen Test',
      client: 'Beta',
      category: 'cyber',
      categoryLabel: 'Cybersecurity',
      summary: 'Summary',
      challenge: 'Challenge',
      solution: 'Solution',
      impactMetrics: [],
      tags: ['SOC2'],
      imageUrl: '/img2.jpg',
    },
  ];

  assert.equal(filterProjects(mockProjects, 'all').length, 2);
  assert.equal(filterProjects(mockProjects, 'web').length, 1);
//   assert.equal(filterProjects(mockProjects, 'web')[0].id, '1');
  assert.equal(filterProjects(mockProjects, 'cyber').length, 1);
  assert.equal(filterProjects(mockProjects, 'design').length, 0);
});
