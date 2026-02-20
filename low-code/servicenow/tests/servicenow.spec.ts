import { test, expect } from '@playwright/test';

test.describe('ServiceNow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.SERVICENOW_URL!);
    await page.fill('#user_name', process.env.SERVICENOW_USERNAME!);
    await page.fill('#user_password', process.env.SERVICENOW_PASSWORD!);
    await page.click('#sysverb_login');
    await page.waitForLoadState('networkidle');
  });

  test('should create incident', async ({ page }) => {
    await page.goto(`${process.env.SERVICENOW_URL}/incident.do?sys_id=-1`);
    
    await page.fill('#incident.short_description', 'Test Incident');
    await page.fill('#incident.description', 'Test Description');
    await page.click('#sysverb_insert');
    
    await expect(page.locator('.notification-success')).toBeVisible();
  });
});
