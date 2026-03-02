import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

// Página Elements > Radio Button.
export class RadioButtonPage extends BasePage {
  async open() {
    await this.navigate('/radio-button');
    await this.page.locator(selectors.elements.radioButton.yesLabel).waitFor({ state: 'visible' });
  }

  async chooseYes() {
    await this.page.click(selectors.elements.radioButton.yesLabel);
  }

  async chooseImpressive() {
    await this.page.click(selectors.elements.radioButton.impressiveLabel);
  }

  async expectOutputIs(value: string) {
    const output = this.page.locator(selectors.elements.radioButton.output);
    await expect(output).toBeVisible();
    await expect(output).toHaveText(value);
  }
}

