import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

export class DragAndDropPage extends BasePage {
  async open() {
    await this.navigate('/drag_and_drop');
  }

  async dragAtoB() {
    const a = this.page.locator(selectors.dragAndDrop.columnA);
    const b = this.page.locator(selectors.dragAndDrop.columnB);
    await a.dragTo(b);
  }

  async expectSwapped() {
    await expect(this.page.locator(selectors.dragAndDrop.columnA)).toContainText('B');
    await expect(this.page.locator(selectors.dragAndDrop.columnB)).toContainText('A');
  }
}

