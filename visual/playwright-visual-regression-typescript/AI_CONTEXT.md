# AI Context — Playwright Visual Regression Template

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

Screenshot comparison testing using Playwright's built-in toHaveScreenshot().

## Tech stack

- Node.js 18+
- Playwright Test

## Project structure

```
tests/visual.spec.ts                    → Visual tests
tests/visual.spec.ts-snapshots/         → Baseline screenshots (auto-generated)
```

## Code patterns

```typescript
test('homepage visual snapshot', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot('homepage.png');
});

// Component-level snapshot
test('header snapshot', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header')).toHaveScreenshot('header.png');
});
```

## Commands

```bash
npm test                    # compare against baselines
npm run test:update         # update baselines
```

## Discovery & test generation workflow

1. Run `scripts/discovery/discover-web-ui.js` to find key pages and components to snapshot.
2. Review the discovery report JSON for available selectors/endpoints/elements
3. Create test files following the patterns above
4. Run tests to verify

## Rules

- Follow existing patterns in the template
- Keep test data in `.env` or config files, not hardcoded
- Use Page Object Model for web/mobile tests
- One test file per feature area
- Name tests descriptively
