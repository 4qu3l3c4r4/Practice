import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures';
import { testData } from '../../fixtures/testData';

const { Given, When, Then, And } = createBdd(test);

Given(
  'I am on the DemoQA practice form page',
  async ({ practiceFormPage }) => {
    await practiceFormPage.open();
  },
);

When(
  'I fill all required fields with valid data',
  async ({ practiceFormPage }) => {
    await practiceFormPage.fillRequiredFields(
      testData.practiceForm.valid.firstName,
      testData.practiceForm.valid.lastName,
      testData.practiceForm.valid.email,
      testData.practiceForm.valid.mobile,
    );
  },
);

And('I submit the form', async ({ practiceFormPage }) => {
  await practiceFormPage.submit();
});

Then(
  'I should see a confirmation modal with the submitted data',
  async ({ practiceFormPage }) => {
    await practiceFormPage.expectConfirmationVisible();
  },
);

When(
  'I try to submit the form without filling the required fields',
  async ({ page }) => {
    await page.click('#submit');
  },
);

Then(
  'the required fields should be marked as invalid',
  async ({ page }) => {
    const firstName = page.locator('#firstName');
    await expect(firstName).toHaveClass(/is-invalid/);
  },
);

