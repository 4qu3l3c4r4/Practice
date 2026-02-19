import { BeforeAll, AfterAll, Before, After } from '@cucumber/cucumber';
import { Page, Browser, chromium } from '@playwright/test';
import { logger } from './logger';

let browser: Browser;
let page: Page;

BeforeAll(async function () {
  browser = await chromium.launch();
});

AfterAll(async function () {
  if (browser) {
    await browser.close();
  }
});

Before(async function (scenario) {
  logger.testStep(`Starting test: ${scenario.pickle.name}`);
  
  const context = await browser.newContext();
  page = await context.newPage();
  
  // Capture console errors
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      logger.error(`Browser console error: ${msg.text()}`);
    }
  });
  
  this.page = page;
});

After(async function (scenario) {
  if (scenario.result?.status === 'FAILED') {
    logger.error(`Test failed: ${scenario.pickle.name}`);
    
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, 'image/png');
  }
  
  logger.testStep(`Completed test: ${scenario.pickle.name}`);
  
  if (this.page) {
    await this.page.context().close();
  }
});