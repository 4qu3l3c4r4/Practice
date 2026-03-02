import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

export class WindowsPage extends BasePage {
  async open() {
    await this.navigate('/windows');
  }

  async openNewWindowAndVerifyTitle() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.click(selectors.windows.clickHereLink),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    await expect(newPage.locator('h3')).toHaveText('New Window');
  }
}

