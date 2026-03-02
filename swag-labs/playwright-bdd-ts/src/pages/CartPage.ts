import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

// Page Object do carrinho.
export class CartPage extends BasePage {
  async expectItemWithName(name: string) {
    const item = this.page.locator(selectors.cart.cartItem).filter({
      hasText: name,
    });
    await expect(item).toBeVisible();
  }

  async goToCheckout() {
    await this.page.click(selectors.cart.checkoutButton);
  }
}

