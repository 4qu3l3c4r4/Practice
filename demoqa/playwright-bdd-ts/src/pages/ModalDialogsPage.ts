import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

// Página Alerts, Frame & Windows > Modal Dialogs.
export class ModalDialogsPage extends BasePage {
  async open() {
    await this.navigate('/modal-dialogs');
    await this.page.locator(selectors.modalDialogs.showSmallModal).waitFor({ state: 'visible' });
  }

  async openSmallModal() {
    await this.page.click(selectors.modalDialogs.showSmallModal);
  }

  async expectSmallModalVisible() {
    await expect(this.page.locator(selectors.modalDialogs.smallModal)).toBeVisible();
  }

  async closeSmallModal() {
    await this.page.click(selectors.modalDialogs.closeSmallModal);
  }
}

