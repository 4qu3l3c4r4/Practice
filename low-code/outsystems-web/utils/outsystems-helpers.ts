import { Page } from '@playwright/test';

export async function waitForOutSystemsAjax(page: Page) {
  await page.waitForLoadState('networkidle');
}

export function getOutSystemsWidgetSelector(widgetName: string): string {
  return `[id$="_wt${widgetName}"]`;
}

export function getOutSystemsInputSelector(inputName: string): string {
  return `[id$="_wt${inputName}_Input"]`;
}

export function getOutSystemsButtonSelector(buttonName: string): string {
  return `[id$="_wt${buttonName}_Button"]`;
}
