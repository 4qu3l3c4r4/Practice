import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

export class DropdownPage extends BasePage {
  async open() {
    await this.navigate('/dropdown');
  }

  async selectOptionByValue(value: string) {
    await this.page.selectOption(selectors.dropdown.select, value);
  }

  async expectSelectedText(text: string) {
    await expect(this.page.locator(`${selectors.dropdown.select} option:checked`)).toHaveText(
      text,
    );
  }
}

