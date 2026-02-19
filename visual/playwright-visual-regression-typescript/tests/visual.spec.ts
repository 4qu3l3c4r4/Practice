import { test, expect } from '@playwright/test';

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

test('homepage visual snapshot', async ({ page }) => {
  await page.goto(baseUrl);
  await expect(page).toHaveScreenshot('homepage.png');
});

test('login page visual snapshot', async ({ page }) => {
  await page.goto(`${baseUrl}/login`);
  await expect(page).toHaveScreenshot('login.png');
});

test('specific component snapshot', async ({ page }) => {
  await page.goto(baseUrl);
  const header = page.locator('header');
  await expect(header).toHaveScreenshot('header.png');
});
