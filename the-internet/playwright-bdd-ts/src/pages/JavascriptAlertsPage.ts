import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

export class JavascriptAlertsPage extends BasePage {
  async open() {
    await this.navigate('/javascript_alerts');
  }

  async triggerAlertAndAccept() {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.page.click(selectors.javascriptAlerts.jsAlertButton);
  }

  async triggerConfirmAndDismiss() {
    this.page.once('dialog', async (dialog) => {
      await dialog.dismiss();
    });
    await this.page.click(selectors.javascriptAlerts.jsConfirmButton);
  }

  async triggerPromptAndAccept(value: string) {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept(value);
    });
    await this.page.click(selectors.javascriptAlerts.jsPromptButton);
  }

  async expectResultContains(text: string) {
    await expect(this.page.locator(selectors.javascriptAlerts.result)).toContainText(text);
  }
}

