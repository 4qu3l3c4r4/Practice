import { test, expect, _electron as electron } from '@playwright/test';

test('Electron app launches', async () => {
  const app = await electron.launch({ args: ['./main.js'] });
  const window = await app.firstWindow();
  
  await expect(window).toHaveTitle(/Your App/);
  
  await window.click('#button');
  await expect(window.locator('#result')).toBeVisible();
  
  await app.close();
});
