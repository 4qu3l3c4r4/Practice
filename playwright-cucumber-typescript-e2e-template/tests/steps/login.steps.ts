import { Given, When, Then, BeforeAll, AfterAll, Before } from '@cucumber/cucumber';
import { expect, chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { getLoginUrl } from '../../utils/urls';
import fs from 'fs';

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async function () {
  browser = await chromium.launch({
    headless: process.env.HEADLESS_MODE !== 'false',
  });
});

Before(async function () {
  if (process.env.TEST_ISOLATION === 'true' && fs.existsSync('tests/storage-state.json')) {
    context = await browser.newContext({
      storageState: 'tests/storage-state.json',
    });
  } else {
    context = await browser.newContext();
  }
  page = await context.newPage();
});

AfterAll(async function () {
  await browser.close();
});

Given('I am on the login page', async function () {
  await page.goto(getLoginUrl());
});

When('I enter valid credentials', async function () {
  await page.fill('[data-testid="username"]', process.env.UI_USERNAME!);
  await page.fill('[data-testid="password"]', process.env.UI_PASSWORD!);
  await page.click('[data-testid="submit"]');
});

Then('I should be logged in successfully', async function () {
  await expect(page).toHaveURL(/dashboard/);
});