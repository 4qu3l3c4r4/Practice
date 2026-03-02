import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures';

const { Given, When, Then } = createBdd(test);

Given('que estou na página de alerts do DemoQA', async ({ alertsPage }) => {
  await alertsPage.open();
});

When('eu abro e aceito um alert simples', async ({ alertsPage }) => {
  await alertsPage.triggerSimpleAlertAndAccept();
});

Then('a página deve continuar utilizável', async ({ page }) => {
  // Asserção simples: ainda conseguimos interagir com algum elemento da página.
  await expect(page.locator('body')).toBeVisible();
});

When('eu abro um confirm e clico em cancelar', async ({ alertsPage }) => {
  await alertsPage.triggerConfirmAndDismiss();
});

Then('devo ver um resultado indicando {string}', async ({ alertsPage }, text: string) => {
  await alertsPage.expectConfirmResultContains(text);
});

When('eu abro um prompt e informo {string}', async ({ alertsPage }, value: string) => {
  await alertsPage.triggerPromptAndAccept(value);
});

Then('devo ver um resultado contendo {string}', async ({ alertsPage }, text: string) => {
  await alertsPage.expectPromptResultContains(text);
});

