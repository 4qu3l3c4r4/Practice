import { createBdd } from 'playwright-bdd';
import { test } from '../../utils/fixtures';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

Given('I open the login page', async ({ loginPage }) => {
  await loginPage.navigateToLoginPage();
});

Then('I should see the login form', async ({ page }) => {
  const form = page.locator('input[type="email"], input[name="username"], #username');
  await expect(form.first()).toBeVisible({ timeout: 10000 });
});

When('I log in with valid credentials', async ({ loginPage, uiUsername, uiPassword }) => {
  await loginPage.login(uiUsername, uiPassword);
});

Then('I should be redirected away from the login page', async ({ page }) => {
  await page.waitForURL((url) => !url.pathname.includes('login'), { timeout: 15000 });
  expect(page.url()).not.toContain('/login');
});

Given('I am logged in', async ({ page, uiBaseUrl }) => {
  await page.goto(uiBaseUrl, { waitUntil: 'domcontentloaded' });
});

When('I navigate to the main page', async ({ page, uiBaseUrl }) => {
  await page.goto(uiBaseUrl, { waitUntil: 'domcontentloaded' });
});

Then('I should see the main content area', async ({ page }) => {
  const content = page.locator('main, [role="main"], #app, #root, .app-content');
  await expect(content.first()).toBeVisible({ timeout: 10000 });
});