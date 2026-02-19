# Selenium + Java E2E Template

End-to-end test template using Selenium WebDriver with Java, Maven, and JUnit 5.

## Prerequisites

- Java 17+
- Maven 3.8+
- Chrome browser installed

## Setup

```bash
cp .env.example .env        # configure BASE_URL, UI_USERNAME, UI_PASSWORD
mvn install                  # download dependencies
```

## Running tests

```bash
mvn test                                    # all tests
mvn test -Dgroups=smoke                     # smoke tests only
mvn test -DBASE_URL=https://myapp.com       # override URL
```

## Environment variables

| Variable       | Description    | Default                |
|---------------|----------------|------------------------|
| `BASE_URL`    | App URL        | `http://localhost:3000` |
| `UI_USERNAME` | Login username | —                      |
| `UI_PASSWORD` | Login password | —                      |

Variables are loaded from `.env` using dotenv-java.

## Project structure

```
├── src/
│   ├── main/java/
│   │   ├── config/Config.java       # Environment configuration
│   │   └── pages/
│   │       ├── BasePage.java        # Base page (WebDriver wrapper)
│   │       └── LoginPage.java       # Login page object
│   └── test/java/tests/
│       └── LoginTest.java           # Smoke tests (@Tag("smoke"))
├── pom.xml                          # Maven config (Selenium 4, JUnit 5, WebDriverManager)
├── .env.example
└── scripts/                         # DOM verification tools
```

## How it works

- `LoginTest.java` uses `@BeforeAll`/`@AfterAll` to manage ChromeDriver lifecycle via WebDriverManager.
- `Config.java` loads `.env` variables using dotenv-java.
- Page objects wrap `WebDriver` with `WebDriverWait` for reliable element interactions.

## Adding new tests

1. Create test classes in `src/test/java/tests/`
2. Add page objects in `src/main/java/pages/`
3. Use `@Tag("smoke")` for categorization

## CI/CD

GitHub Actions workflow at `.github/workflows/e2e.yml`. Set `BASE_URL`, `UI_USERNAME`, `UI_PASSWORD` as repository secrets.
