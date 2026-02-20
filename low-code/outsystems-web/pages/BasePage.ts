import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async waitForOutSystemsLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  findWidget(widgetName: string) {
    return this.page.locator(`[id$="_wt${widgetName}"]`);
  }

  findInput(inputName: string) {
    return this.page.locator(`[id$="_wt${inputName}_Input"]`);
  }

  findButton(buttonName: string) {
    return this.page.locator(`[id$="_wt${buttonName}_Button"]`);
  }
}
