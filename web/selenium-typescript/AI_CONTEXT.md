# AI Context — Selenium TypeScript Template

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

Browser-based E2E testing using Selenium WebDriver with Jest and TypeScript.

## Tech stack

- Node.js 18+
- TypeScript
- Selenium WebDriver
- Jest

## Project structure

```
tests/login.test.ts        → Test files
pages/loginPage.ts         → Page objects
pages/basePage.ts          → Base page
config/env.ts              → Environment config
```

## Code patterns

```typescript
it('should load login page', async () => {
    await driver.get(config.baseUrl + '/login');
    const form = await driver.findElement(By.css('[data-test-id="LoginForm"]'));
    expect(await form.isDisplayed()).toBe(true);
});
```

## Commands

```bash
npm test
```

## Discovery & test generation workflow

1. Run `scripts/discovery/discover-web-ui.js` against target URL.
2. Review the discovery report JSON for available selectors/endpoints/elements
3. Create test files following the patterns above
4. Run tests to verify

## Rules

- Follow existing patterns in the template
- Keep test data in `.env` or config files, not hardcoded
- Use Page Object Model for web/mobile tests
- One test file per feature area
- Name tests descriptively
