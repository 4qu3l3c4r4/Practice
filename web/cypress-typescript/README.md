# Cypress + TypeScript E2E Template

End-to-end test template using Cypress with TypeScript.

## Prerequisites

- Node.js 20+
- npm

## Setup

```bash
cp .env.example .env        # configure BASE_URL, UI_USERNAME, UI_PASSWORD
npm install
```

## Running tests

```bash
npx cypress run              # all tests, headless
npx cypress open             # interactive test runner
npm test                     # alias for cypress run
```

## Environment variables

| Variable       | Description    | Default                |
|---------------|----------------|------------------------|
| `BASE_URL`    | App URL        | `http://localhost:3000` |
| `UI_USERNAME` | Login username | —                      |
| `UI_PASSWORD` | Login password | —                      |

Variables are available in tests via `Cypress.env()`.

## Project structure

```
├── cypress/
│   ├── e2e/
│   │   └── smoke.cy.ts         # Smoke tests (3 tests)
│   └── support/
│       ├── commands.ts          # Custom commands (cy.login())
│       └── e2e.ts               # Support file (loads env)
├── cypress.config.ts            # Cypress configuration (baseUrl from env)
├── tsconfig.json
├── package.json                 # cypress, dotenv
└── scripts/                     # DOM verification tools
```

## How it works

- `cypress.config.ts` reads `BASE_URL` from `.env` and sets it as `baseUrl`.
- `cypress/support/commands.ts` defines a `cy.login()` custom command for reusable authentication.
- Tests use `cy.visit()`, `cy.get()`, and custom commands.

## Adding new tests

1. Create test files in `cypress/e2e/` (suffix with `.cy.ts`)
2. Add custom commands in `cypress/support/commands.ts`
3. Cypress auto-discovers new test files — no config changes needed

## CI/CD

GitHub Actions workflow at `.github/workflows/e2e.yml`. Set `BASE_URL`, `UI_USERNAME`, `UI_PASSWORD` as repository secrets (prefixed with `CYPRESS_`).
