# E2E & Test Automation Templates

Reusable test templates organized by category. Copy the one you need, set `.env` from `.env.example`, and run.

## When to use what

| Need | Category | Recommended template |
|------|----------|---------------------|
| Web testing (modern, fast) | `web/` | `playwright-bdd-typescript` or `playwright-csharp` |
| Web + Gherkin/BDD | `web/` | `playwright-bdd-typescript` or `playwright-cucumber-typescript` |
| Web + .NET shop | `web/` | `playwright-csharp` or `selenium-csharp` |
| Web + Java shop | `web/` | `selenium-java` |
| Web + Python shop | `web/` | `selenium-python` |
| Mobile (Android & iOS) | `mobile/` | `appium-java`, `appium-csharp`, or `appium-python` |
| API / REST testing | `api/` | `supertest-typescript`, `rest-assured-java`, `pytest-requests-python`, or `postman-newman` |
| Visual regression | `visual/` | `playwright-visual-regression-typescript` |
| Accessibility (WCAG) | `accessibility/` | `playwright-axe-typescript` |
| Load / performance | `performance/` | `k6-javascript` or `artillery-yaml` |
| Contract testing | `contract/` | `pact-typescript` |
| Mock API / test data | `mock/` | `wiremock-docker` |
| Database seeding | `data/` | `test-data-seeder-typescript` |
| Cloud device farm | `cloud/` | `browserstack` |
| CI/CD pipelines | `ci/` | GitHub Actions, GitLab CI, Azure DevOps, Jenkins |
| No-code / AI team | `low-code/` | `testrigor`, `mabl`, or `virtuoso-qa` |
| Keyword-driven / non-dev QA | `low-code/` | `robotframework-python` or `katalon-groovy` |
| Component testing | `web/` | `cypress-typescript` |

## Directory structure

```
├── web/                          # Browser-based UI testing
│   ├── playwright-bdd-typescript/
│   ├── playwright-cucumber-typescript/
│   ├── playwright-csharp/
│   ├── playwright-java/
│   ├── playwright-python/
│   ├── selenium-typescript/
│   ├── selenium-java/
│   ├── selenium-python/
│   ├── selenium-csharp/
│   ├── cypress-typescript/
│   ├── webdriverio-typescript/
│   └── testcafe-typescript/
│
├── mobile/                       # Android & iOS testing
│   ├── appium-java/
│   ├── appium-python/
│   └── appium-csharp/
│
├── api/                          # REST / HTTP API testing
│   ├── supertest-typescript/
│   ├── rest-assured-java/
│   ├── pytest-requests-python/
│   └── postman-newman/
│
├── visual/                       # Screenshot comparison
│   └── playwright-visual-regression-typescript/
│
├── accessibility/                # WCAG / a11y compliance
│   └── playwright-axe-typescript/
│
├── performance/                  # Load & stress testing
│   ├── k6-javascript/
│   └── artillery-yaml/
│
├── contract/                     # Consumer-driven contracts
│   └── pact-typescript/
│
├── mock/                         # API mocking / stubbing
│   └── wiremock-docker/
│
├── data/                         # Test data management
│   └── test-data-seeder-typescript/
│
├── cloud/                        # Cloud execution (device farms)
│   └── browserstack/
│
├── ci/                           # CI/CD pipeline templates
│   ├── github-actions/           #   GitHub Actions (Node/Python/Java/.NET/k6)
│   ├── gitlab-ci/                #   GitLab CI
│   ├── azure-devops/             #   Azure DevOps
│   └── jenkins/                  #   Jenkins
│
├── low-code/                     # No-code & keyword-driven
│   ├── testrigor/
│   ├── mabl/
│   ├── virtuoso-qa/
│   ├── robotframework-python/
│   ├── katalon-groovy/
│   └── karate-java/
│
└── scripts/                      # Shared utilities
```

## Quick start

1. Copy the template folder you want
2. `cp .env.example .env` and configure
3. Install and run (see each template's README)

## AI-assisted implementation

Every template includes an `AI_CONTEXT.md` file designed for LLMs (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.). Point your AI assistant to it when starting implementation.

### Discovery scripts

Before writing tests, scan your target system to extract all testable elements:

```bash
# Web — extract selectors, forms, buttons, links, ARIA elements
node scripts/discovery/discover-web-ui.js https://your-app.com report.json

# Mobile — extract resource IDs (Android) / accessibility IDs (iOS)
python scripts/discovery/discover-mobile-app.py --platform android

# API — find endpoints from OpenAPI spec or by probing
./scripts/discovery/discover-api.sh http://localhost:3000

# WireMock — summarize existing stubs
./scripts/discovery/discover-wiremock.sh ./mappings
```

Feed the JSON output to your AI assistant along with the template's `AI_CONTEXT.md`:

```
Here is the discovery report: <paste JSON>
Here is the template context: <paste AI_CONTEXT.md>
Generate test cases covering all forms and navigation flows.
```

## CI/CD

Templates with a CLI runner include a sample GitHub Actions workflow at `.github/workflows/e2e.yml`. Adapt to your CI provider.

## Getting started — full workflow

See [`IMPLEMENTATION_GUIDE.md`](IMPLEMENTATION_GUIDE.md) for the complete step-by-step process:

1. Fill out [`SYSTEM_PROFILE_TEMPLATE.md`](SYSTEM_PROFILE_TEMPLATE.md) with your system info
2. Choose template(s) from the decision tree
3. Run `./discover.sh <target_url>` inside the template to scan your system
4. Feed the discovery output + `AI_CONTEXT.md` to your AI assistant
5. Implement tests following the guide

### Every template includes

| File | Purpose |
|------|---------|
| `AI_CONTEXT.md` | LLM-readable context (patterns, conventions, stack) |
| `discover.sh` | Scans your target system, extracts selectors/endpoints/elements |
| `README.md` | Human-readable setup and usage |
| `.env.example` | Environment configuration template |

## Handling flaky tests

- Use retries in CI (Playwright: `retries: 2`; Cypress: `retries: { runMode: 2 }`)
- Tag known flaky tests: `@flaky`, `test.fixme()`, `pytest.mark.xfail`
- Investigate root causes — usually timing issues or shared state
