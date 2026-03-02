import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

// Page Object da tela de login do Swag Labs.
// Toda a lógica de interação com o login fica encapsulada aqui.
export class LoginPage extends BasePage {
  async open() {
    // A página inicial já é a tela de login do Swag Labs.
    await this.navigate('/');
    await this.waitForVisible(selectors.login.usernameInput);
  }

  async fillCredentials(username: string, password: string) {
    await this.page.fill(selectors.login.usernameInput, username);
    await this.page.fill(selectors.login.passwordInput, password);
  }

  async submit() {
    await this.page.click(selectors.login.submitButton);
  }

  async login(username: string, password: string) {
    await this.open();
    await this.fillCredentials(username, password);
    await this.submit();
  }

  async expectOnInventoryPage() {
    await this.page.waitForURL('**/inventory.html', { timeout: 15000 });
    await this.page.waitForSelector(selectors.inventory.inventoryContainer, {
      timeout: 15000,
    });
  }

  async expectErrorMessageContains(text: string) {
    const error = this.page.locator(selectors.login.errorContainer);
    await expect(error).toBeVisible({ timeout: 10000 });
    await expect(error).toContainText(text);
  }
}

