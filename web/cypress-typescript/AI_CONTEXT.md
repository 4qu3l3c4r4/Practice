# AI Context — Cypress TypeScript Template

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

Component and E2E testing using Cypress with TypeScript.

## Tech stack

- Node.js 18+
- TypeScript
- Cypress

## Project structure

```
cypress/e2e/smoke.cy.ts    → E2E test specs
cypress/support/commands.ts → Custom commands
cypress/support/e2e.ts     → Support file
cypress.config.ts          → Cypress config
```

## Code patterns

```typescript
describe('Login', () => {
    it('should display login form', () => {
        cy.visit('/login');
        cy.get('[data-test-id="LoginForm"]').should('be.visible');
    });
});
```

## Commands

```bash
npx cypress run
npx cypress open  # interactive mode
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
