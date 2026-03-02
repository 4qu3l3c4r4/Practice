import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

// Página Widgets > Slider.
export class SliderPage extends BasePage {
  async open() {
    await this.navigate('/slider');
    await this.page.locator(selectors.elements.slider.slider).waitFor({ state: 'visible' });
  }

  async setSliderValueWithArrows(targetValue: number) {
    const slider = this.page.locator(selectors.elements.slider.slider);
    await slider.focus();

    // Move para o valor desejado com setas (evita issues de drag em headless).
    // Limitamos as tentativas para não travar em caso de flakiness.
    for (let i = 0; i < 200; i++) {
      const current = Number(await this.page.locator(selectors.elements.slider.value).inputValue());
      if (current === targetValue) return;
      await this.page.keyboard.press(current < targetValue ? 'ArrowRight' : 'ArrowLeft');
    }
  }

  async expectSliderValue(value: number) {
    await expect(this.page.locator(selectors.elements.slider.value)).toHaveValue(String(value));
  }
}

