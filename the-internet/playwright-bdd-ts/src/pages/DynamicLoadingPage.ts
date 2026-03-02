import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

export class DynamicLoadingPage extends BasePage {
  async openExample1() {
    await this.navigate('/dynamic_loading/1');
  }

  async startAndWaitFinish() {
    await this.page.click(selectors.dynamicLoading.startButton);
    await expect(this.page.locator(selectors.dynamicLoading.finishText)).toHaveText('Hello World!');
  }
}

