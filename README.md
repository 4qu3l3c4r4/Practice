# E2E Project Templates

Reusable E2E test templates for web (and mobile where noted). Each folder is a different tool and language. Copy the one you need, set `.env` from `.env.example`, and run.

## When to use what

| Need | Recommended template |
|------|---------------------|
| Web testing (modern, fast) | `playwright-bdd-typescript` or `playwright-csharp` |
| Web + Gherkin/BDD | `playwright-bdd-typescript` or `playwright-cucumber-typescript` |
| Web + .NET shop | `playwright-csharp` or `selenium-csharp` |
| Web + Java shop | `selenium-java` |
| Web + Python shop | `selenium-python` |
| Mobile (Android/iOS) | `appium-csharp` or `appium-python` |
| Component testing + web | `cypress-typescript` |
| No-code / AI team | `testrigor`, `mabl`, or `virtuoso-qa` |
| Keyword-driven / non-dev QA | `robotframework-python` or `katalon-groovy` |

## Templates

| Template | Language | Notes |
|----------|----------|--------|
| **playwright-bdd-typescript-e2e-template** | TypeScript | Playwright + Playwright BDD (Gherkin) |
| **playwright-cucumber-typescript-e2e-template** | TypeScript | Playwright + Cucumber (Gherkin) |
| **playwright-csharp-e2e-template** | C# | Playwright for .NET + NUnit |
| **selenium-csharp-e2e-template** | C# | Selenium WebDriver + NUnit |
| **selenium-typescript-e2e-template** | TypeScript | Selenium WebDriver + Jest |
| **selenium-java-e2e-template** | Java | Selenium + Maven + JUnit 5 |
| **selenium-python-e2e-template** | Python | Selenium + pytest |
| **appium-csharp-e2e-template** | C# | Appium + NUnit (mobile Android/iOS) |
| **appium-python-e2e-template** | Python | Appium (mobile Android/iOS) |
| **cypress-typescript-e2e-template** | TypeScript | Cypress (Node.js only) |
| **webdriverio-typescript-e2e-template** | TypeScript | WebdriverIO (Node.js) |
| **testcafe-typescript-e2e-template** | TypeScript | TestCafe (Node.js, no drivers) |
| **robotframework-python-e2e-template** | Python + Robot | Robot Framework (keyword-driven) |
| **katalon-groovy-e2e-template** | Groovy / Java | Katalon script mode; low-code in IDE |
| **testrigor-e2e-template** | Plain English | testRigor (AI/codeless, natural language) |
| **mabl-e2e-template** | Low-code / AI | Mabl (flows in UI, auto-healing) |
| **virtuoso-qa-e2e-template** | Plain English | Virtuoso QA (AI, natural language) |

## Quick start

1. Copy the template folder you want.
2. `cp .env.example .env` and set `BASE_URL`, `UI_USERNAME`, `UI_PASSWORD` (or tool-specific env).
3. Install and run (see each template's README).

## CI/CD

Each template that uses Node.js or has a CLI runner includes a sample GitHub Actions workflow at `.github/workflows/e2e.yml`. Adapt it to your CI provider as needed.

## Handling flaky tests

- Use retries in CI (Playwright: `retries: 2` in config; Cypress: `retries: { runMode: 2 }`)
- Tag known flaky tests so they can be tracked: `@flaky`, `test.fixme()`, `pytest.mark.xfail`
- Investigate root causes — flaky tests usually indicate timing issues or shared state

## No code / low-code

- **testRigor**, **Mabl**, **Virtuoso QA**: no (or minimal) code; use their UIs and the README/example tests in the template as a guide.
# e2e-templates
