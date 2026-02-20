import { test, expect } from '@playwright/test';

test.describe('Salesforce', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.SALESFORCE_URL!);
    await page.fill('#username', process.env.SALESFORCE_USERNAME!);
    await page.fill('#password', process.env.SALESFORCE_PASSWORD!);
    await page.click('#Login');
    await page.waitForLoadState('networkidle');
  });

  test('should create account', async ({ page }) => {
    await page.click('button[title="New"]');
    await page.fill('lightning-input[data-name="Name"] input', 'Test Account');
    await page.click('button[title="Save"]');
    
    await expect(page.locator('.toastMessage')).toContainText('created');
  });
});
