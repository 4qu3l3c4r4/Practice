# AI Context — WebdriverIO TypeScript Template

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

Browser-based E2E testing using WebdriverIO with TypeScript.

## Tech stack

- Node.js 18+
- TypeScript
- WebdriverIO

## Project structure

```
specs/smoke.spec.ts        → Test specs
wdio.conf.ts               → WebdriverIO config
```

## Code patterns

```typescript
describe('Login', () => {
    it('should display login form', async () => {
        await browser.url('/login');
        await expect($('[data-test-id="LoginForm"]')).toBeDisplayed();
    });
});
```

## Commands

```bash
npx wdio run wdio.conf.ts
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
