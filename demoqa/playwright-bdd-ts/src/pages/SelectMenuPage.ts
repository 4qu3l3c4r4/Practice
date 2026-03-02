import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

// Página Widgets/Elements > Select Menu.
export class SelectMenuPage extends BasePage {
  async open() {
    await this.navigate('/select-menu');
    await this.page.locator(selectors.elements.selectMenu.oldSelect).waitFor({ state: 'visible' });
  }

  async selectOldStyleOptionByLabel(label: string) {
    await this.page.selectOption(selectors.elements.selectMenu.oldSelect, { label });
  }

  async expectOldStyleValue(label: string) {
    const select = this.page.locator(selectors.elements.selectMenu.oldSelect);
    await expect(select).toHaveValue(/.*/);
    // Confirma pelo texto selecionado para ficar mais robusto.
    await expect(select.locator('option:checked')).toHaveText(label);
  }
}

