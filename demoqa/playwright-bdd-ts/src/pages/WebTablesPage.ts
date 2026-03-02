import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

type WebTableRecord = {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  salary: string;
  department: string;
};

// Página Elements > Web Tables.
export class WebTablesPage extends BasePage {
  async open() {
    await this.navigate('/webtables');
    await this.page.locator(selectors.elements.webTables.addButton).waitFor({ state: 'visible' });
  }

  async clickAdd() {
    await this.page.click(selectors.elements.webTables.addButton);
    await this.page.locator(selectors.elements.webTables.firstName).waitFor({ state: 'visible' });
  }

  async fillRecord(record: WebTableRecord) {
    await this.page.fill(selectors.elements.webTables.firstName, record.firstName);
    await this.page.fill(selectors.elements.webTables.lastName, record.lastName);
    await this.page.fill(selectors.elements.webTables.email, record.email);
    await this.page.fill(selectors.elements.webTables.age, record.age);
    await this.page.fill(selectors.elements.webTables.salary, record.salary);
    await this.page.fill(selectors.elements.webTables.department, record.department);
  }

  async submit() {
    await this.page.click(selectors.elements.webTables.submitButton);
  }

  async search(text: string) {
    await this.page.fill(selectors.elements.webTables.searchBox, text);
  }

  async expectTableContains(text: string) {
    const body = this.page.locator(selectors.elements.webTables.tableBody);
    await expect(body).toContainText(text);
  }

  async deleteRowByEmail(email: string) {
    // O DemoQA cria ids como delete-record-1/2/3... então buscamos o botão dentro da linha.
    const row = this.page.locator('.rt-tr-group').filter({ hasText: email });
    await expect(row).toBeVisible();
    await row.locator('span[title="Delete"], [id^="delete-record-"]').first().click();
  }

  async expectEmailNotPresent(email: string) {
    const body = this.page.locator(selectors.elements.webTables.tableBody);
    await expect(body).not.toContainText(email);
  }
}

