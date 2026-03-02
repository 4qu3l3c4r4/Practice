import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

// Página Widgets > Tool Tips.
export class ToolTipsPage extends BasePage {
  async open() {
    await this.navigate('/tool-tips');
    await this.page.locator(selectors.toolTips.toolTipButton).waitFor({ state: 'visible' });
  }

  async hoverButton() {
    await this.page.hover(selectors.toolTips.toolTipButton);
  }

  async expectTooltipVisible() {
    await expect(this.page.locator(selectors.toolTips.toolTipInner)).toBeVisible();
  }
}

