import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures';
import { testData } from '../../fixtures/testData';

const { Given, When, Then, And } = createBdd(test);

Given(
  'que estou na página de formulário de prática do DemoQA',
  async ({ practiceFormPage }) => {
    await practiceFormPage.open();
  },
);

When(
  'eu preencho todos os campos obrigatórios com dados válidos',
  async ({ practiceFormPage }) => {
    await practiceFormPage.fillRequiredFields(
      testData.practiceForm.valid.firstName,
      testData.practiceForm.valid.lastName,
      testData.practiceForm.valid.email,
      testData.practiceForm.valid.mobile,
    );
  },
);

And('eu submeto o formulário', async ({ practiceFormPage }) => {
  await practiceFormPage.submit();
});

Then(
  'devo ver um modal de confirmação com os dados enviados',
  async ({ practiceFormPage }) => {
    await practiceFormPage.expectConfirmationVisible();
  },
);

When(
  'eu tento submeter o formulário sem preencher os campos obrigatórios',
  async ({ page }) => {
    await page.click('#submit');
  },
);

Then(
  'os campos obrigatórios devem ser marcados como inválidos',
  async ({ page }) => {
    const firstName = page.locator('#firstName');
    await expect(firstName).toHaveClass(/is-invalid/);
  },
);

