import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

export class InfiniteScrollPage extends BasePage {
  async open() {
    await this.navigate('/infinite_scroll');
  }

  async scrollUntilAtLeastNParagraphs(n: number) {
    let count = await this.page.locator(selectors.infiniteScroll.paragraphs).count();
    let attempts = 0;
    while (count < n && attempts < 20) {
      await this.page.mouse.wheel(0, 1000);
      await this.page.waitForTimeout(500);
      count = await this.page.locator(selectors.infiniteScroll.paragraphs).count();
      attempts++;
    }
  }

  async getParagraphCount(): Promise<number> {
    return this.page.locator(selectors.infiniteScroll.paragraphs).count();
  }
}

