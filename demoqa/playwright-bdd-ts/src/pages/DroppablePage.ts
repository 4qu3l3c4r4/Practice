import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

// Página Interactions > Droppable.
export class DroppablePage extends BasePage {
  async open() {
    await this.navigate('/droppable');
    await this.page.locator(selectors.interactions.droppable.draggable).waitFor({ state: 'visible' });
  }

  async dragAndDrop() {
    const source = this.page.locator(selectors.interactions.droppable.draggable);
    const target = this.page.locator(selectors.interactions.droppable.droppable);
    await source.dragTo(target);
  }

  async expectDropped() {
    const target = this.page.locator(selectors.interactions.droppable.droppable);
    await expect(target).toContainText('Dropped!');
  }
}

