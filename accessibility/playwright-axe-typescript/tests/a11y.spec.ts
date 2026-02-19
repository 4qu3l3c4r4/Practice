import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('wcag-aa: homepage has no a11y violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('wcag-aa: login page has no a11y violations', async ({ page }) => {
  await page.goto('/login');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('wcag-a: homepage meets WCAG 2.0 Level A', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a'])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('wcag-aa: form inputs have labels', async ({ page }) => {
  await page.goto('/login');
  const results = await new AxeBuilder({ page })
    .include('form')
    .withTags(['wcag2aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});
