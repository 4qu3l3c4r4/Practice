import { test as base } from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

// Fixtures do Playwright para injetar Page Objects e dados vindos de .env.
export const test = base.extend<{
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutInformationPage: CheckoutInformationPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
  uiBaseUrl: string;
  uiUsername: string;
  uiPassword: string;
  lockedOutUsername: string;
}>({
  uiBaseUrl: async ({}, use) => {
    await use(process.env.BASE_URL || 'https://www.saucedemo.com');
  },
  uiUsername: async ({}, use) => {
    await use(process.env.UI_USERNAME || 'standard_user');
  },
  uiPassword: async ({}, use) => {
    await use(process.env.UI_PASSWORD || 'secret_sauce');
  },
  lockedOutUsername: async ({}, use) => {
    await use(process.env.LOCKED_OUT_USERNAME || 'locked_out_user');
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutInformationPage: async ({ page }, use) => {
    await use(new CheckoutInformationPage(page));
  },
  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },
  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
});

