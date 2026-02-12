describe('Smoke Tests', () => {
    it('should load the page', async () => {
        await browser.url('/');
        await expect(browser).toHaveTitle(expect.stringContaining(''));
    });

    it('should have login fields', async () => {
        await browser.url('/');
        const usernameField = await $('input[name="username"], input[type="email"]');
        const passwordField = await $('input[name="password"]');
        
        await expect(usernameField).toBeDisplayed();
        await expect(passwordField).toBeDisplayed();
    });

    it('should login successfully', async () => {
        await browser.url('/');
        
        const usernameField = await $('input[name="username"], input[type="email"]');
        const passwordField = await $('input[name="password"]');
        const submitButton = await $('button[type="submit"], input[type="submit"]');
        
        await usernameField.setValue(process.env.UI_USERNAME || 'test@example.com');
        await passwordField.setValue(process.env.UI_PASSWORD || 'password123');
        await submitButton.click();
        
        await browser.waitUntil(async () => {
            const url = await browser.getUrl();
            return !url.includes('login');
        }, { timeout: 10000 });
    });
});