import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

export class EditorPage extends BasePage {
  async open() {
    await this.navigate('/tinymce');
  }

  async setEditorContent(text: string) {
    const frame = this.page.frameLocator(selectors.frames.iframe);
    await frame.locator(selectors.frames.editorBody).fill(text);
  }

  async expectEditorContent(text: string) {
    const frame = this.page.frameLocator(selectors.frames.iframe);
    await expect(frame.locator(selectors.frames.editorBody)).toHaveText(text);
  }
}

