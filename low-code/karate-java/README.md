# Karate + Java E2E Template

End-to-end test template using Karate for combined API and UI testing with BDD syntax.

## Prerequisites

- Java 17+
- Maven 3.8+
- Chrome browser installed (for UI tests)

## Setup

```bash
cp .env.example .env        # configure BASE_URL, UI_USERNAME, UI_PASSWORD
mvn install                  # download dependencies
```

## Running tests

```bash
mvn test                                    # all tests
mvn test -Dkarate.options="--tags @smoke"    # smoke tests only
```

## Environment variables

| Variable       | Description    | Default                |
|---------------|----------------|------------------------|
| `BASE_URL`    | App URL        | `http://localhost:3000` |
| `UI_USERNAME` | Login username | —                      |
| `UI_PASSWORD` | Login password | —                      |

Variables are configured in `karate-config.js` and available in all feature files.

## Project structure

```
├── src/test/java/
│   ├── karate-config.js         # Global config (baseUrl, credentials)
│   └── smoke/
│       ├── SmokeRunner.java     # JUnit 5 parallel runner
│       ├── smoke.feature        # UI smoke test (browser automation)
│       └── api-health.feature   # API smoke test (health check)
├── pom.xml                      # Maven config (karate-core 1.5+)
├── .env.example
└── scripts/                     # DOM verification tools
```

## How it works

- `karate-config.js` runs before every feature and sets up `baseUrl`, `username`, `password` from system properties or defaults.
- `.feature` files use Karate's native syntax — no Cucumber step definitions needed.
- API tests use `Given url`, `When method get`, `Then status 200`.
- UI tests use `configure driver`, `driver baseUrl`, and Karate's built-in browser automation.
- `SmokeRunner.java` runs features in parallel using JUnit 5.

## API test example

```gherkin
Feature: API Health
  Scenario: Health endpoint returns 200
    Given url baseUrl
    And path '/api/health'
    When method get
    Then status 200
```

## UI test example

```gherkin
Feature: UI Smoke
  Scenario: Page loads
    * configure driver = { type: 'chrome', headless: true }
    * driver baseUrl
    * waitForUrl(baseUrl)
```

## Adding new tests

1. Create `.feature` files in `src/test/java/` (in any subfolder)
2. Create a `*Runner.java` class to execute them
3. No step definitions needed — Karate features are self-contained

## CI/CD

GitHub Actions workflow at `.github/workflows/e2e.yml`. Set `BASE_URL`, `UI_USERNAME`, `UI_PASSWORD` as repository secrets.
