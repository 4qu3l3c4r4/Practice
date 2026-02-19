# AI Context — TestCafe TypeScript Template

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

Browser-based E2E testing using TestCafe (no WebDriver needed).

## Tech stack

- Node.js 18+
- TypeScript
- TestCafe

## Project structure

```
tests/smoke.ts             → Test files
```

## Code patterns

```typescript
fixture('Login').page(`${baseUrl}/login`);

test('Login form is visible', async (t) => {
    await t.expect(Selector('[data-test-id="LoginForm"]').visible).ok();
});
```

## Commands

```bash
npx testcafe chrome tests/
npx testcafe chrome:headless tests/
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
