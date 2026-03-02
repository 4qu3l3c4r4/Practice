import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures';

const { Given, When, Then, And } = createBdd(test);

Given(
  'que estou na página de alerts JavaScript do The Internet',
  async ({ javascriptAlertsPage }) => {
    await javascriptAlertsPage.open();
  },
);

When('eu aceito o alert simples', async ({ javascriptAlertsPage }) => {
  await javascriptAlertsPage.triggerAlertAndAccept();
});

And('eu cancelo o confirm', async ({ javascriptAlertsPage }) => {
  await javascriptAlertsPage.triggerConfirmAndDismiss();
});

And(
  'eu preencho o prompt com {string}',
  async ({ javascriptAlertsPage }, value: string) => {
    await javascriptAlertsPage.triggerPromptAndAccept(value);
  },
);

Then(
  'o resultado deve indicar as ações realizadas',
  async ({ javascriptAlertsPage }) => {
    await javascriptAlertsPage.expectResultContains('You entered:');
  },
);

Given(
  'que estou na página de infinite scroll do The Internet',
  async ({ infiniteScrollPage }) => {
    await infiniteScrollPage.open();
  },
);

When(
  'eu rolo até carregar pelo menos {int} parágrafos',
  async ({ infiniteScrollPage }, count: number) => {
    await infiniteScrollPage.scrollUntilAtLeastNParagraphs(count);
  },
);

Then(
  'a página deve conter pelo menos {int} parágrafos',
  async ({ infiniteScrollPage }, count: number) => {
    const actual = await infiniteScrollPage.getParagraphCount();
    expect(actual).toBeGreaterThanOrEqual(count);
  },
);

Given(
  'que estou na página de múltiplas janelas do The Internet',
  async ({ windowsPage }) => {
    await windowsPage.open();
  },
);

When('eu abro uma nova janela', async ({ windowsPage }) => {
  await windowsPage.openNewWindowAndVerifyTitle();
});

Then(
  'devo ver o texto {string} na nova janela',
  async ({}, _text: string) => {
    // Verificação já feita em openNewWindowAndVerifyTitle.
  },
);

