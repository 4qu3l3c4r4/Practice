# AI Context — Playwright + axe-core Accessibility Template

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

Automated WCAG accessibility compliance testing using axe-core with Playwright.

## Tech stack

- Node.js 18+
- Playwright Test
- @axe-core/playwright

## Project structure

```
tests/a11y.spec.ts         → Accessibility tests
```

## Code patterns

```typescript
test('homepage meets WCAG 2.0 AA', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();
    expect(results.violations).toEqual([]);
});

// Scope to specific section
test('form is accessible', async ({ page }) => {
    await page.goto('/login');
    const results = await new AxeBuilder({ page })
        .include('form')
        .withTags(['wcag2aa'])
        .analyze();
    expect(results.violations).toEqual([]);
});
```

### WCAG tags: `wcag2a`, `wcag2aa`, `wcag2aaa`, `wcag21a`, `wcag21aa`, `best-practice`

## Commands

```bash
npm test
npm run test:wcag-aa
```

## Discovery & test generation workflow

1. Run `scripts/discovery/discover-web-ui.js` to find all pages, forms, and ARIA elements to test.
2. Review the discovery report JSON for available selectors/endpoints/elements
3. Create test files following the patterns above
4. Run tests to verify

## Rules

- Follow existing patterns in the template
- Keep test data in `.env` or config files, not hardcoded
- Use Page Object Model for web/mobile tests
- One test file per feature area
- Name tests descriptively
