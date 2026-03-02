import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures';
import { testData } from '../../fixtures/testData';

const { Given, When, Then } = createBdd(test);

Given('que estou na página de web tables do DemoQA', async ({ webTablesPage }) => {
  await webTablesPage.open();
});

When('eu adiciono um novo registro válido', async ({ webTablesPage }) => {
  const record = testData.webTables.valid;
  await webTablesPage.clickAdd();
  await webTablesPage.fillRecord(record);
  await webTablesPage.submit();
});

Then('a tabela deve conter o email do novo registro', async ({ webTablesPage }) => {
  await webTablesPage.expectTableContains(testData.webTables.valid.email);
});

When('eu removo o registro pelo email', async ({ webTablesPage }) => {
  await webTablesPage.deleteRowByEmail(testData.webTables.valid.email);
});

Then('o email não deve mais aparecer na tabela', async ({ webTablesPage }) => {
  await webTablesPage.expectEmailNotPresent(testData.webTables.valid.email);
});

When('eu tento adicionar um registro sem email', async ({ webTablesPage, page }) => {
  const record = { ...testData.webTables.valid, email: '' };
  await webTablesPage.clickAdd();
  await webTablesPage.fillRecord(record);
  await webTablesPage.submit();

  // Guardamos o locator para validar no Then.
  // @ts-expect-error - armazenamento em runtime.
  page.__invalidEmailLocator = page.locator('#userEmail');
});

Then('o campo de email deve ser marcado como inválido', async ({ page }) => {
  // @ts-expect-error - ver comentário acima.
  const emailInput = page.__invalidEmailLocator;
  await expect(emailInput).toHaveClass(/is-invalid/);
});

