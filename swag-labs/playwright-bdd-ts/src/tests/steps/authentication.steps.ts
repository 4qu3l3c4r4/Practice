import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/fixtures';

// Step definitions dos cenários de autenticação do Swag Labs.
// Mantemos a lógica de navegação e asserções aqui, usando o POM (LoginPage).

const { Given, When, Then } = createBdd(test);

Given('que estou na página de login do Swag Labs', async ({ loginPage }) => {
  await loginPage.open();
});

When('eu faço login com credenciais válidas', async ({ loginPage, uiUsername, uiPassword }) => {
  await loginPage.login(uiUsername, uiPassword);
});

Then('devo ver a lista de produtos na tela inicial', async ({ loginPage }) => {
  await loginPage.expectOnInventoryPage();
});

When(
  'eu tento fazer login com usuário válido e senha inválida',
  async ({ loginPage, uiUsername }) => {
    await loginPage.login(uiUsername, 'senha_incorreta!');
  },
);

Then(
  'devo ver uma mensagem de erro informando que as credenciais são inválidas',
  async ({ loginPage }) => {
    // Mensagem real exibida pelo Swag Labs em caso de credenciais inválidas.
    await loginPage.expectErrorMessageContains(
      'Epic sadface: Username and password do not match any user in this service',
    );
  },
);

When('eu tento fazer login com um usuário bloqueado', async ({ loginPage, lockedOutUsername }) => {
  await loginPage.login(lockedOutUsername, 'secret_sauce');
});

Then('devo ver uma mensagem indicando que o usuário está bloqueado', async ({ loginPage }) => {
  // BUG: se a aplicação mudar a mensagem, este teste serve como documentação.
  await loginPage.expectErrorMessageContains(
    'Epic sadface: Sorry, this user has been locked out.',
  );
});

When(
  'eu tento fazer login sem preencher usuário e senha',
  async ({ loginPage }) => {
    // Abre a tela, não preenche nada e apenas tenta submeter.
    await loginPage.open();
    await loginPage.submit();
  },
);

Then(
  'devo ver uma mensagem de erro informando que o usuário é obrigatório',
  async ({ page }) => {
    // O Swag Labs exibe uma mensagem específica quando o usuário está vazio.
    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible({ timeout: 10000 });
    await expect(error).toContainText('Epic sadface: Username is required');
  },
);

