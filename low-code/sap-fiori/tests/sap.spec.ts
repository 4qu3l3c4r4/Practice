import { test, expect } from '@playwright/test';

test.describe('SAP Fiori', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.SAP_URL!);
    await page.fill('#sap-user', process.env.SAP_USERNAME!);
    await page.fill('#sap-password', process.env.SAP_PASSWORD!);
    await page.click('#LOGON_BUTTON');
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to app', async ({ page }) => {
    await page.click('.sapMTile[title="My App"]');
    await expect(page.locator('.sapMTitle')).toBeVisible();
  });
});
