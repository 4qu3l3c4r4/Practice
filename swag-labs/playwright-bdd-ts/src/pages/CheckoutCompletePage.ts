import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

// Página de confirmação final do pedido.
export class CheckoutCompletePage extends BasePage {
  async expectOrderCompleted() {
    await this.waitForVisible(selectors.checkoutComplete.completeHeader);
    await expect(this.page.locator(selectors.checkoutComplete.completeHeader)).toContainText(
      'Thank you for your order',
    );
  }

  async backToProducts() {
    await this.page.click(selectors.checkoutComplete.backHomeButton);
  }
}

