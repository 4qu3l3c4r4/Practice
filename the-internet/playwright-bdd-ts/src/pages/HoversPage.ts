import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

export class HoversPage extends BasePage {
  async open() {
    await this.navigate('/hovers');
  }

  async hoverFirstFigure() {
    await this.page.hover(selectors.hovers.figure);
  }

  async expectCaptionVisible() {
    await expect(this.page.locator(selectors.hovers.caption)).toBeVisible();
  }
}

