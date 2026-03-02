import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

// Página "Practice Form" do DemoQA (Forms > Practice Form).
export class PracticeFormPage extends BasePage {
  async open() {
    await this.navigate('/automation-practice-form');
    await this.page.locator(selectors.forms.firstNameInput).waitFor({ state: 'visible' });
  }

  async fillRequiredFields(firstName: string, lastName: string, email: string, mobile: string) {
    await this.page.fill(selectors.forms.firstNameInput, firstName);
    await this.page.fill(selectors.forms.lastNameInput, lastName);
    await this.page.fill(selectors.forms.emailInput, email);
    await this.page.click(selectors.forms.genderRadioMale);
    await this.page.fill(selectors.forms.mobileInput, mobile);
  }

  async submit() {
    await this.page.click(selectors.forms.submitButton);
  }

  async expectConfirmationVisible() {
    await expect(this.page.locator(selectors.forms.confirmationModal)).toBeVisible();
  }
}

