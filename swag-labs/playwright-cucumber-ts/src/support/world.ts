import { chromium, Browser, BrowserContext, Page, expect } from '@playwright/test';
import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import * as dotenv from 'dotenv';

dotenv.config();

export class PlaywrightWorld implements World {
  public browser!: Browser;
  public context!: BrowserContext;
  public page!: Page;
  public expect = expect;

  constructor(options: IWorldOptions) {
    // eslint-disable-next-line no-unused-expressions
    options;
  }

  async init() {
    this.browser = await chromium.launch({
      headless: process.env.HEADLESS_MODE !== 'false',
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async dispose() {
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(PlaywrightWorld);

