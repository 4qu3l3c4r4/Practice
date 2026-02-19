# AI Context — Playwright BDD TypeScript Template

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

Browser-based E2E testing using Playwright with BDD (Gherkin) syntax via `playwright-bdd`.

## Tech stack

- Runtime: Node.js 18+
- Language: TypeScript
- Test runner: Playwright Test
- BDD layer: playwright-bdd (Gherkin `.feature` files → auto-generated Playwright specs)
- Assertions: Playwright `expect` API

## Architecture

```
tests/features/*.feature    → Gherkin scenarios (Given/When/Then)
tests/steps/*.ts            → Step definitions (createBdd)
pages/*.ts                  → Page Object Model classes
elements/common.ts          → Centralized selectors
utils/fixtures.ts           → Playwright fixtures (DI for page objects)
utils/hooks.ts              → beforeEach/afterEach lifecycle
utils/logger.ts             → Logging utility
playwright.config.ts        → Playwright configuration
```

## Key patterns

### Step definitions

```typescript
import { createBdd } from 'playwright-bdd';
import { test } from '../../utils/fixtures';
const { Given, When, Then } = createBdd(test);

Given('I am on the login page', async ({ loginPage }) => {
  await loginPage.navigateToLoginPage();
});
```

### Page objects

- Extend `basePage.ts`
- Receive `page: Page` via constructor
- Use selectors from `elements/common.ts`
- Methods return `Promise<void>` or `Promise<boolean>`

### Selectors

- Prefer `data-test-id` attributes: `[data-test-id="MyComponent.element"]`
- Note: this project uses `data-test-id` (with hyphen), NOT `data-testid`
- Fallback: `role` selectors, then CSS

### Fixtures

Page objects are injected via Playwright fixtures defined in `utils/fixtures.ts`. Available fixtures: `loginPage`, `singleCheckPage`, `fileCheckPage`, `dashboardPage`, `settingsPage`, `userManagementPage`.

## How to generate tests

1. Run `scripts/discovery/discover-web-ui.js` against the target URL to get all selectors
2. Add selectors to `elements/common.ts`
3. Create/update page objects in `pages/`
4. Write `.feature` files in `tests/features/`
5. Write step definitions in `tests/steps/`
6. Run `npm run bddgen` to generate Playwright specs from features
7. Run `npx playwright test`

## Commands

```bash
npm run bddgen              # regenerate specs from .feature files (REQUIRED after changes)
npx playwright test         # run all tests
npx playwright test --headed # run with visible browser
```

## Rules

- NEVER modify `.features-gen/` files directly — they are auto-generated
- Always run `bddgen` after modifying `.feature` files or step definitions
- One step definition file per feature area
- Keep selectors in `elements/common.ts`, not hardcoded in steps
