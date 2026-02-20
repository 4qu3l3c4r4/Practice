import { test, expect } from '@playwright/test';

test.describe('OutSystems App', () => {
  test('app loads successfully', async ({ page }) => {
    await page.goto(process.env.BASE_URL!);
    await page.waitForLoadState('networkidle');
    
    // Verify OutSystems app loaded
    expect(await page.locator('[id*="wt"]').count()).toBeGreaterThan(0);
  });

  test('login flow', async ({ page }) => {
    await page.goto(process.env.BASE_URL!);
    
    // TODO: Update selectors based on your OutSystems app
    await page.fill('[id$="_Input_Username"]', process.env.USERNAME!);
    await page.fill('[id$="_Input_Password"]', process.env.PASSWORD!);
    await page.click('[id$="_Button_Login"]');
    
    await page.waitForLoadState('networkidle');
    
    // Verify successful login
    await expect(page.locator('[id*="Dashboard"]')).toBeVisible();
  });
});
