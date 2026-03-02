import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures';
import { testData } from '../../fixtures/testData';

const { Given, When, Then } = createBdd(test);

Given('I am on the DemoQA web tables page', async ({ webTablesPage }) => {
  await webTablesPage.open();
});

When('I add a new valid record', async ({ webTablesPage }) => {
  const record = testData.webTables.valid;
  await webTablesPage.clickAdd();
  await webTablesPage.fillRecord(record);
  await webTablesPage.submit();
});

Then('the table should contain the email of the new record', async ({ webTablesPage }) => {
  await webTablesPage.expectTableContains(testData.webTables.valid.email);
});

When('I remove the record by email', async ({ webTablesPage }) => {
  await webTablesPage.deleteRowByEmail(testData.webTables.valid.email);
});

Then('the email should no longer appear in the table', async ({ webTablesPage }) => {
  await webTablesPage.expectEmailNotPresent(testData.webTables.valid.email);
});

When('I try to add a record without email', async ({ webTablesPage, page }) => {
  const record = { ...testData.webTables.valid, email: '' };
  await webTablesPage.clickAdd();
  await webTablesPage.fillRecord(record);
  await webTablesPage.submit();

  // Store the locator to validate it in the Then step.
  // @ts-expect-error - stored dynamically for test purposes.
  page.__invalidEmailLocator = page.locator('#userEmail');
});

Then('the email field should be marked as invalid', async ({ page }) => {
  // @ts-expect-error - see comment above.
  const emailInput = page.__invalidEmailLocator;
  await expect(emailInput).toHaveClass(/is-invalid/);
});

