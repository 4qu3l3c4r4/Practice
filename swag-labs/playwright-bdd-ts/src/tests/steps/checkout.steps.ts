import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures';

// Step definitions for the complete checkout flow in Swag Labs.

const { Given, When, Then, And } = createBdd(test);

Given('I am authenticated in Swag Labs', async ({ loginPage, uiUsername, uiPassword }) => {
  await loginPage.login(uiUsername, uiPassword);
  await loginPage.expectOnInventoryPage();
});

Given('I am on the products list', async ({ inventoryPage }) => {
  await inventoryPage.expectLoaded();
});

When('I add the backpack to the cart', async ({ inventoryPage }) => {
  await inventoryPage.addBackpackToCart();
  await inventoryPage.expectCartBadgeCount(1);
});

When('I open the cart', async ({ inventoryPage, cartPage }) => {
  await inventoryPage.openCart();
  await cartPage.expectItemWithName('Sauce Labs Backpack');
});

When('I start checkout with valid data', async ({
  checkoutInformationPage,
  checkoutOverviewPage,
}) => {
  await checkoutInformationPage.fillInformation('John', 'Tester', '12345-000');
  await checkoutInformationPage.continue();
  await checkoutOverviewPage.expectTotalsVisible();
});

Then('the order should be completed successfully', async ({
  checkoutOverviewPage,
  checkoutCompletePage,
}) => {
  await checkoutOverviewPage.finish();
  await checkoutCompletePage.expectOrderCompleted();
});

Then('I should see the order totals summary', async ({ checkoutOverviewPage }) => {
  // Ensure subtotal and total are visible and non-empty.
  const subtotal = await checkoutOverviewPage.getSubtotalText();
  const total = await checkoutOverviewPage.getTotalText();

  expect(subtotal).toContain('Item total');
  expect(total).toContain('Total');
});

When(
  'I try to start checkout without filling the first name',
  async ({ checkoutInformationPage }) => {
    // Fill only some fields, leaving first name empty.
    await checkoutInformationPage.fillInformation('', 'Tester', '12345-000');
    await checkoutInformationPage.continue();
  },
);

Then(
  'I should see an error message saying the first name is required',
  async ({ checkoutInformationPage }) => {
    await checkoutInformationPage.expectErrorMessageContains(
      'Error: First Name is required',
    );
  },
);

