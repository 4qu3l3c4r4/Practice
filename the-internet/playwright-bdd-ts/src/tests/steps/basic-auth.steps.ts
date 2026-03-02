import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/fixtures';

const { Given, Then } = createBdd(test);

Given(
  'que acesso a página de basic auth com credenciais válidas',
  async ({ basicAuthPage, basicAuthUsername, basicAuthPassword }) => {
    await basicAuthPage.openWithValidCredentials(basicAuthUsername, basicAuthPassword);
  },
);

Then('devo ver a mensagem de sucesso de autenticação', async ({ basicAuthPage }) => {
  await basicAuthPage.expectSuccessMessage();
});

