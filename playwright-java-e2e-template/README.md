# Playwright + Java E2E Template

End-to-end test template using Playwright for Java with Maven and JUnit 5.

## Prerequisites

- Java 17+
- Maven 3.8+

## Setup

```bash
cp .env.example .env        # configure BASE_URL, UI_USERNAME, UI_PASSWORD
mvn install                  # download dependencies
```

## Running tests

```bash
mvn test                                    # all tests
mvn test -Dgroups=smoke                     # smoke tests only
mvn test -DBASE_URL=https://myapp.com       # override URL via system property
```

## Environment variables

| Variable       | Description                 | Default                |
|---------------|-----------------------------|------------------------|
| `BASE_URL`    | App URL                     | `http://localhost:3000` |
| `UI_USERNAME` | Login username              | —                      |
| `UI_PASSWORD` | Login password              | —                      |
| `HEADLESS`    | Run without visible browser | `true`                 |

Variables are loaded from `.env` using dotenv-java. You can also pass them as `-D` system properties.

## Project structure

```
├── src/
│   ├── main/java/
│   │   ├── config/Config.java       # Environment configuration
│   │   └── pages/
│   │       ├── BasePage.java        # Base page (navigate, waitForSelector)
│   │       └── LoginPage.java       # Login page object
│   └── test/java/tests/
│       ├── BaseTest.java            # JUnit 5 base (browser lifecycle)
│       └── SmokeTest.java           # Smoke tests (3 tests, @Tag("smoke"))
├── pom.xml                          # Maven dependencies and plugins
├── .env.example
└── scripts/                         # DOM verification tools
```

## How it works

- `BaseTest.java` manages the Playwright browser lifecycle with `@BeforeAll`/`@AfterAll` and creates a fresh page per test with `@BeforeEach`.
- `Config.java` loads environment variables from `.env` using dotenv-java.
- Page objects wrap `com.microsoft.playwright.Page` for reusable interactions.

## Adding new tests

1. Create test classes in `src/test/java/tests/` extending `BaseTest`
2. Add page objects in `src/main/java/pages/`
3. Use `@Tag("smoke")` for smoke test categorization

## CI/CD

GitHub Actions workflow at `.github/workflows/e2e.yml`. Set `BASE_URL`, `UI_USERNAME`, `UI_PASSWORD` as repository secrets.
