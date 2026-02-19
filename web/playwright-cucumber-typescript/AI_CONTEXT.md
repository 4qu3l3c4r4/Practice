# AI Context — Playwright Cucumber TypeScript Template

> This file is designed to be read by AI assistants to help implement tests using this template.

## Template purpose

Browser-based E2E testing using Playwright with Cucumber (Gherkin) BDD syntax.

## Tech stack

- Runtime: Node.js 18+
- Language: TypeScript
- Test runner: Playwright Test + @cucumber/cucumber
- Assertions: Playwright `expect` API

## Architecture

```
tests/features/*.feature    → Gherkin scenarios
tests/steps/*.ts            → Cucumber step definitions
pages/*.ts                  → Page Object Model classes
utils/fixtures.ts           → Playwright fixtures
utils/hooks.ts              → Cucumber hooks (Before/After)
utils/logger.ts             → Logging
utils/urls.ts               → URL configuration per environment
playwright.config.ts        → Playwright config
cucumber.json               → Cucumber config
```

## Key patterns

### Step definitions

```typescript
import { Given, When, Then } from '@cucumber/cucumber';

Given('I am on the login page', async function () {
  await this.loginPage.navigateToLoginPage();
});
```

### Page objects

- Receive Playwright `Page` via constructor
- Methods are async, return void or boolean
- Selectors use `data-test-id` attributes

## How to generate tests

1. Run `scripts/discovery/discover-web-ui.js` against target URL
2. Write `.feature` files in `tests/features/`
3. Implement step definitions in `tests/steps/`
4. Create page objects in `pages/`
5. Run `npx playwright test`

## Commands

```bash
npx playwright test                    # run all
npx playwright test --headed           # visible browser
npx playwright test --grep "@smoke"    # by tag
```

## Rules

- Selectors use `data-test-id` (with hyphen)
- One step file per feature domain
- Page objects handle all DOM interaction
