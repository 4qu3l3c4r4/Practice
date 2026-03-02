import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

// Página Alerts, Frame & Windows > Alerts.
export class AlertsPage extends BasePage {
  async open() {
    await this.navigate('/alerts');
    await this.page.locator(selectors.alerts.alertButton).waitFor({ state: 'visible' });
  }

  async triggerSimpleAlertAndAccept() {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.page.click(selectors.alerts.alertButton);
  }

  async triggerConfirmAndDismiss() {
    this.page.once('dialog', async (dialog) => {
      await dialog.dismiss();
    });
    await this.page.click(selectors.alerts.confirmButton);
  }

  async expectConfirmResultContains(text: string) {
    await expect(this.page.locator(selectors.alerts.confirmResult)).toContainText(text);
  }

  async triggerPromptAndAccept(value: string) {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept(value);
    });
    await this.page.click(selectors.alerts.promptButton);
  }

  async expectPromptResultContains(text: string) {
    await expect(this.page.locator(selectors.alerts.promptResult)).toContainText(text);
  }
}

