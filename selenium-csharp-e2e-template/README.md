# Selenium + C# E2E Template

End-to-end test template using Selenium WebDriver with C#, NUnit, and .NET 8.

## Prerequisites

- .NET 8 SDK
- Chrome browser installed

## Setup

```bash
cp .env.example .env        # configure BASE_URL, UI_USERNAME, UI_PASSWORD
dotnet restore
```

## Running tests

```bash
dotnet test                                          # all tests
dotnet test --filter "TestCategory=Smoke"            # smoke tests only
dotnet test --logger "trx;LogFileName=results.trx"   # with TRX report
```

## Environment variables

| Variable       | Description    | Default                |
|---------------|----------------|------------------------|
| `BASE_URL`    | App URL        | `http://localhost:3000` |
| `UI_USERNAME` | Login username | —                      |
| `UI_PASSWORD` | Login password | —                      |

Variables are loaded from `.env` using DotNetEnv.

## Project structure

```
├── Pages/
│   ├── BasePage.cs              # Base page (IWebDriver wrapper)
│   └── LoginPage.cs             # Login page object
├── Tests/
│   ├── WebDriverFixture.cs      # Shared ChromeDriver setup/teardown
│   ├── LoginTests.cs            # Smoke tests ([Category("Smoke")])
│   └── VerifySelectorsTests.cs  # Selector validation tests
├── Config.cs                    # Environment configuration
├── SeleniumE2E.csproj           # .NET project (Selenium.WebDriver, NUnit, DotNetEnv)
├── .env.example
└── scripts/                     # DOM verification tools
```

## How it works

- `WebDriverFixture.cs` provides a shared `ChromeDriver` instance with `[OneTimeSetUp]`/`[OneTimeTearDown]`.
- `Config.cs` loads `.env` variables at static initialization.
- `VerifySelectorsTests.cs` validates that critical login selectors exist on the page.

## Adding new tests

1. Create test classes in `Tests/`
2. Add page objects in `Pages/`
3. Use `[Category("Smoke")]` for categorization

## CI/CD

GitHub Actions workflow at `.github/workflows/e2e.yml`. Set `BASE_URL`, `UI_USERNAME`, `UI_PASSWORD` as repository secrets.
