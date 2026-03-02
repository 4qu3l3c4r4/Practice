import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

// Página Widgets > Date Picker.
export class DatePickerPage extends BasePage {
  async open() {
    await this.navigate('/date-picker');
    await this.page.locator(selectors.datePicker.dateInput).waitFor({ state: 'visible' });
  }

  async setDate(value: string) {
    // Preenche diretamente para evitar cliques complexos no datepicker.
    await this.page.fill(selectors.datePicker.dateInput, value);
    await this.page.press(selectors.datePicker.dateInput, 'Enter');
  }

  async expectDateValue(value: string) {
    await expect(this.page.locator(selectors.datePicker.dateInput)).toHaveValue(value);
  }
}

