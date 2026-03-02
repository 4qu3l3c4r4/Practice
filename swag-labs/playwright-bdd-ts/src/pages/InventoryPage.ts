import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

// Page Object da listagem de produtos (inventory).
export class InventoryPage extends BasePage {
  async expectLoaded() {
    await this.waitForVisible(selectors.inventory.inventoryContainer);
  }

  async addBackpackToCart() {
    await this.expectLoaded();
    await this.page.click(selectors.inventory.addToCartBackpackButton);
  }

  async openCart() {
    await this.page.click(selectors.inventory.cartIcon);
  }

  async expectCartBadgeCount(expectedCount: number) {
    const badge = this.page.locator(selectors.cart.cartBadge);
    await expect(badge).toHaveText(String(expectedCount));
  }
}

