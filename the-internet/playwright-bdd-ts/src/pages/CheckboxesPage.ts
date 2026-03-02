import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

export class CheckboxesPage extends BasePage {
  async open() {
    await this.navigate('/checkboxes');
  }

  async toggleFirst() {
    await this.page.click(selectors.checkboxes.firstCheckbox);
  }

  async expectFirstChecked(checked: boolean) {
    await expect(this.page.locator(selectors.checkboxes.firstCheckbox)).toBeChecked({ checked });
  }
}

