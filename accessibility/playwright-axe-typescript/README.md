# Playwright + axe-core Accessibility Template

Automated accessibility testing using axe-core with Playwright.

## Setup

```bash
cp .env.example .env
npm install
npx playwright install chromium
```

## Running tests

```bash
npm test                    # all a11y tests
npm run test:wcag-a         # WCAG 2.0 Level A only
npm run test:wcag-aa        # WCAG 2.0 Level AA
```

## How it works

- Uses `@axe-core/playwright` to scan pages for accessibility violations
- Tests tagged with WCAG levels for selective runs
- `.include('form')` scopes checks to specific page sections
- Violations array is empty = pass; non-empty = fail with details

## Available WCAG tags

| Tag | Standard |
|-----|----------|
| `wcag2a` | WCAG 2.0 Level A |
| `wcag2aa` | WCAG 2.0 Level AA |
| `wcag2aaa` | WCAG 2.0 Level AAA |
| `wcag21a` | WCAG 2.1 Level A |
| `wcag21aa` | WCAG 2.1 Level AA |
| `best-practice` | Common best practices |

## Project structure

```
├── tests/a11y.spec.ts
├── playwright.config.ts
├── package.json
└── .env.example
```
