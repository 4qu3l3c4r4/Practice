# Swag Labs — Playwright BDD TypeScript

End-to-end automation for **Swag Labs (SauceDemo)** using **Playwright + TypeScript + playwright-bdd (Gherkin)**.

## Project structure

```
swag-labs/playwright-bdd-ts/
├── README.md
├── .env.example
├── package.json
├── tsconfig.json
├── playwright.config.ts
└── src
    ├── pages/          # Page Objects (LoginPage, InventoryPage, etc.)
    ├── tests/
    │   ├── features/   # BDD scenarios (.feature)
    │   └── steps/      # Step definitions
    ├── fixtures/       # Playwright fixtures (POM injection, data)
    ├── helpers/        # Shared utilities (logger, waits, etc.)
    └── elements/       # Centralized selectors
```

## Prerequisites

- Node.js 20+
- npm

## Setup

```bash
cd swag-labs/playwright-bdd-ts
cp .env.example .env           # Configure BASE_URL and credentials if needed
npm install
npx playwright install         # Download browsers (first run)
npm run bddgen                 # Generate BDD bindings from .feature files
```

## Running tests

```bash
npm run test                   # All tests (headless)
npm run test:headed            # All tests with visible browser
npm run test:smoke             # Tests tagged with @smoke
npm run test:smoke:headed      # @smoke with visible browser
npm run test:all               # Playwright project 'all'
```

## Environment variables

All variables live in `.env` (never hardcoded in tests):

- `BASE_URL` — Swag Labs base URL (`https://www.saucedemo.com`)
- `HEADLESS_MODE` — `true` or `false`
- `VIDEO_RECORDING` — `true` to record videos
- `UI_USERNAME` — main user (e.g. `standard_user`)
- `UI_PASSWORD` — password (`secret_sauce`)
- `LOCKED_OUT_USERNAME` — locked out user (`locked_out_user`)
- `PROBLEM_USERNAME` — user with visual glitches (`problem_user`)
- `PERFORMANCE_USERNAME` — user with performance issues (`performance_glitch_user`)

## Conventions

- **POM (Page Object Model)**: one class per page (e.g. `LoginPage`, `InventoryPage`).
- **BDD**: Gherkin scenarios with tags like `@login`, `@smoke`, `@regression`, `@negative`, `@edge`.
- **Externalized data**: everything variable comes from `.env` or files in `fixtures/`.
- **Smart waits**: locators + `expect`, `waitForSelector`, dynamic waits; never fixed `sleep`.

## Current scope

- Authentication scenarios:
  - Login with valid credentials (`standard_user`).
  - Login with invalid credentials.
  - Login with locked out user (`locked_out_user`).
  - Edge case with empty fields.
- Business flows:
  - Add item to cart and complete checkout with valid data.
  - Negative checkout with missing first name (edge/negative).

