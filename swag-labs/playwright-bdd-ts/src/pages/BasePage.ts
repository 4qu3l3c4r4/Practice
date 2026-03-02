import type { Page } from '@playwright/test';

// Classe base para páginas, concentrando navegação e utilitários comuns.
export class BasePage {
  constructor(protected readonly page: Page) {}

  async navigate(path: string) {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async waitForVisible(selector: string, timeout = 10000) {
    await this.page.locator(selector).first().waitFor({ state: 'visible', timeout });
  }
}

