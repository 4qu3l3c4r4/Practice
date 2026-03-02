import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures';

const { Given, When, Then, And } = createBdd(test);

Given(
  'I am on The Internet JavaScript alerts page',
  async ({ javascriptAlertsPage }) => {
    await javascriptAlertsPage.open();
  },
);

When('I accept the simple alert', async ({ javascriptAlertsPage }) => {
  await javascriptAlertsPage.triggerAlertAndAccept();
});

And('I cancel the confirm', async ({ javascriptAlertsPage }) => {
  await javascriptAlertsPage.triggerConfirmAndDismiss();
});

And(
  'I fill the prompt with {string}',
  async ({ javascriptAlertsPage }, value: string) => {
    await javascriptAlertsPage.triggerPromptAndAccept(value);
  },
);

Then(
  'the result should indicate the actions performed',
  async ({ javascriptAlertsPage }) => {
    await javascriptAlertsPage.expectResultContains('You entered:');
  },
);

Given(
  'I am on The Internet infinite scroll page',
  async ({ infiniteScrollPage }) => {
    await infiniteScrollPage.open();
  },
);

When(
  'I scroll until at least {int} paragraphs are loaded',
  async ({ infiniteScrollPage }, count: number) => {
    await infiniteScrollPage.scrollUntilAtLeastNParagraphs(count);
  },
);

Then(
  'the page should contain at least {int} paragraphs',
  async ({ infiniteScrollPage }, count: number) => {
    const actual = await infiniteScrollPage.getParagraphCount();
    expect(actual).toBeGreaterThanOrEqual(count);
  },
);

Given(
  'I am on The Internet multiple windows page',
  async ({ windowsPage }) => {
    await windowsPage.open();
  },
);

When('I open a new window', async ({ windowsPage }) => {
  await windowsPage.openNewWindowAndVerifyTitle();
});

Then(
  'I should see the text {string} in the new window',
  async ({}, _text: string) => {
    // Assertion already done in openNewWindowAndVerifyTitle.
  },
);

