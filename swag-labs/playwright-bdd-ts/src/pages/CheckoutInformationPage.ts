import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

// Página de informações do checkout (nome, sobrenome, CEP).
export class CheckoutInformationPage extends BasePage {
  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(selectors.checkoutInformation.firstNameInput, firstName);
    await this.page.fill(selectors.checkoutInformation.lastNameInput, lastName);
    await this.page.fill(selectors.checkoutInformation.postalCodeInput, postalCode);
  }

  async continue() {
    await this.page.click(selectors.checkoutInformation.continueButton);
  }

  async expectErrorMessageContains(text: string) {
    const error = this.page.locator(selectors.checkoutInformation.errorContainer);
    await expect(error).toBeVisible();
    await expect(error).toContainText(text);
  }
}

