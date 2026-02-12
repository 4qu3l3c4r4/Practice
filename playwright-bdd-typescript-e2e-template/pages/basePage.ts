import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(path: string) {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async waitForElement(selector: string, timeout = 10000) {
    return this.page.waitForSelector(selector, { timeout });
  }
}