import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

// Página de resumo do checkout (overview).
export class CheckoutOverviewPage extends BasePage {
  async expectTotalsVisible() {
    await this.waitForVisible(selectors.checkoutOverview.summarySubtotal);
    await this.waitForVisible(selectors.checkoutOverview.summaryTotal);
  }

  async finish() {
    await this.page.click(selectors.checkoutOverview.finishButton);
  }

  async getSubtotalText() {
    return this.page.locator(selectors.checkoutOverview.summarySubtotal).innerText();
  }

  async getTotalText() {
    return this.page.locator(selectors.checkoutOverview.summaryTotal).innerText();
  }
}

