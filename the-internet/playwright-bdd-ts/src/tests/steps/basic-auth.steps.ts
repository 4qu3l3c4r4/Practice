import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/fixtures';

const { Given, Then } = createBdd(test);

Given(
  'I access the basic auth page with valid credentials',
  async ({ basicAuthPage, basicAuthUsername, basicAuthPassword }) => {
    await basicAuthPage.openWithValidCredentials(basicAuthUsername, basicAuthPassword);
  },
);

Then('I should see the successful authentication message', async ({ basicAuthPage }) => {
  await basicAuthPage.expectSuccessMessage();
});

