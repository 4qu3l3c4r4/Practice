import { test as base } from 'playwright-bdd';
import { LoginPage } from '../pages/loginPage';

export const test = base.extend<{
  loginPage: LoginPage;
  uiBaseUrl: string;
  uiUsername: string;
  uiPassword: string;
}>({
  uiBaseUrl: async ({}, use) => {
    await use(process.env.BASE_URL || 'http://localhost:3000');
  },
  uiUsername: async ({}, use) => {
    await use(process.env.UI_USERNAME || '');
  },
  uiPassword: async ({}, use) => {
    await use(process.env.UI_PASSWORD || '');
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});