import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures';

// Step definitions para o fluxo de checkout completo no Swag Labs.

const { Given, When, Then, And } = createBdd(test);

Given('que estou autenticado no Swag Labs', async ({ loginPage, uiUsername, uiPassword }) => {
  await loginPage.login(uiUsername, uiPassword);
  await loginPage.expectOnInventoryPage();
});

Given('eu estou na lista de produtos', async ({ inventoryPage }) => {
  await inventoryPage.expectLoaded();
});

When('eu adiciono a mochila ao carrinho', async ({ inventoryPage }) => {
  await inventoryPage.addBackpackToCart();
  await inventoryPage.expectCartBadgeCount(1);
});

When('eu abro o carrinho', async ({ inventoryPage, cartPage }) => {
  await inventoryPage.openCart();
  await cartPage.expectItemWithName('Sauce Labs Backpack');
});

When('eu inicio o checkout com dados válidos', async ({
  checkoutInformationPage,
  checkoutOverviewPage,
}) => {
  await checkoutInformationPage.fillInformation('Joao', 'Teste', '12345-000');
  await checkoutInformationPage.continue();
  await checkoutOverviewPage.expectTotalsVisible();
});

Then('o pedido deve ser concluído com sucesso', async ({
  checkoutOverviewPage,
  checkoutCompletePage,
}) => {
  await checkoutOverviewPage.finish();
  await checkoutCompletePage.expectOrderCompleted();
});

Then('devo ver o resumo de totais do pedido', async ({ checkoutOverviewPage }) => {
  // Volta para overview através da URL apenas para validar os textos quando necessário.
  // Aqui garantimos que subtotal e total estão visíveis e com texto não vazio.
  const subtotal = await checkoutOverviewPage.getSubtotalText();
  const total = await checkoutOverviewPage.getTotalText();

  expect(subtotal).toContain('Item total');
  expect(total).toContain('Total');
});

When(
  'eu tento iniciar o checkout sem preencher o primeiro nome',
  async ({ checkoutInformationPage }) => {
    // Preenche apenas alguns campos, deixando o primeiro nome vazio.
    await checkoutInformationPage.fillInformation('', 'Teste', '12345-000');
    await checkoutInformationPage.continue();
  },
);

Then(
  'devo ver uma mensagem de erro informando que o primeiro nome é obrigatório',
  async ({ checkoutInformationPage }) => {
    await checkoutInformationPage.expectErrorMessageContains(
      'Error: First Name is required',
    );
  },
);

