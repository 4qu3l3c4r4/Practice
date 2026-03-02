import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/fixtures';

// Authentication step definitions for Swag Labs.
// Navigation and assertions are centralized here using the LoginPage POM.

const { Given, When, Then } = createBdd(test);

Given('I am on the Swag Labs login page', async ({ loginPage }) => {
  await loginPage.open();
});

When('I log in with valid credentials', async ({ loginPage, uiUsername, uiPassword }) => {
  await loginPage.login(uiUsername, uiPassword);
});

Then('I should see the products list on the inventory page', async ({ loginPage }) => {
  await loginPage.expectOnInventoryPage();
});

When(
  'I try to log in with a valid user and invalid password',
  async ({ loginPage, uiUsername }) => {
    await loginPage.login(uiUsername, 'invalid_password!');
  },
);

Then(
  'I should see an error message saying the credentials are invalid',
  async ({ loginPage }) => {
    // Real message shown by Swag Labs for invalid credentials.
    await loginPage.expectErrorMessageContains(
      'Epic sadface: Username and password do not match any user in this service',
    );
  },
);

When(
  'I try to log in with a locked out user',
  async ({ loginPage, lockedOutUsername }) => {
    await loginPage.login(lockedOutUsername, 'secret_sauce');
  },
);

Then(
  'I should see a message indicating the user is locked out',
  async ({ loginPage }) => {
    // BUG: if the application changes the message, this test documents the behavior.
    await loginPage.expectErrorMessageContains(
      'Epic sadface: Sorry, this user has been locked out.',
    );
  },
);

When(
  'I try to log in without filling username and password',
  async ({ loginPage }) => {
    // Open the login page, leave fields empty and submit.
    await loginPage.open();
    await loginPage.submit();
  },
);

Then(
  'I should see an error message saying the username is required',
  async ({ page }) => {
    // Swag Labs shows this specific message when username is empty.
    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible({ timeout: 10000 });
    await expect(error).toContainText('Epic sadface: Username is required');
  },
);

