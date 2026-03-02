import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures';

const { Given, When, Then } = createBdd(test);

Given('I am on the DemoQA alerts page', async ({ alertsPage }) => {
  await alertsPage.open();
});

When('I open and accept a simple alert', async ({ alertsPage }) => {
  await alertsPage.triggerSimpleAlertAndAccept();
});

Then('the page should remain usable', async ({ page }) => {
  // Simple assertion: we can still interact with the page.
  await expect(page.locator('body')).toBeVisible();
});

When('I open a confirm and click cancel', async ({ alertsPage }) => {
  await alertsPage.triggerConfirmAndDismiss();
});

Then('I should see a result containing {string}', async ({ alertsPage }, text: string) => {
  await alertsPage.expectConfirmResultContains(text);
});

When('I open a prompt and enter {string}', async ({ alertsPage }, value: string) => {
  await alertsPage.triggerPromptAndAccept(value);
});

Then('I should see a result containing {string}', async ({ alertsPage }, text: string) => {
  await alertsPage.expectPromptResultContains(text);
});

