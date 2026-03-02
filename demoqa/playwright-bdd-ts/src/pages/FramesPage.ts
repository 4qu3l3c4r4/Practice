import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

// Página Alerts, Frame & Windows > Frames.
export class FramesPage extends BasePage {
  async open() {
    await this.navigate('/frames');
    await this.page.locator(selectors.frames.frame1).waitFor({ state: 'visible' });
  }

  async expectFrameHeading(text: string) {
    const frame = this.page.frameLocator(selectors.frames.frame1);
    await expect(frame.locator(selectors.frames.frameHeading)).toHaveText(text);
  }
}

