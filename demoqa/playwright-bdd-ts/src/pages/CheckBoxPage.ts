import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

// Página Elements > Check Box.
export class CheckBoxPage extends BasePage {
  async open() {
    await this.navigate('/checkbox');
    await this.page.locator(selectors.elements.checkBox.expandAllButton).waitFor({ state: 'visible' });
  }

  async selectHome() {
    // No DemoQA o checkbox é acionado clicando no ícone do checkbox dentro do label.
    await this.page.click(selectors.elements.checkBox.homeCheckbox);
  }

  async expectResultContains(text: string) {
    const result = this.page.locator(selectors.elements.checkBox.result);
    await expect(result).toBeVisible();
    await expect(result).toContainText(text);
  }
}

