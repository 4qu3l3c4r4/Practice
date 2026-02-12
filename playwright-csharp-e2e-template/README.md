# Playwright + C# E2E Template

End-to-end test template using Playwright for .NET with NUnit.

## Prerequisites

- .NET 8 SDK
- PowerShell (for Playwright browser install)

## Setup

```bash
cp .env.example .env        # configure BASE_URL, UI_USERNAME, UI_PASSWORD
dotnet restore
dotnet build
pwsh bin/Debug/net8.0/playwright.ps1 install chromium   # download browser
```

## Running tests

```bash
dotnet test                                          # all tests
dotnet test --filter "TestCategory=Smoke"            # smoke tests only
dotnet test --logger "trx;LogFileName=results.trx"   # with TRX report
```

## Environment variables

| Variable       | Description                 | Default                |
|---------------|-----------------------------|------------------------|
| `BASE_URL`    | App URL                     | `http://localhost:3000` |
| `UI_USERNAME` | Login username              | —                      |
| `UI_PASSWORD` | Login password              | —                      |

Variables are loaded from `.env` using DotNetEnv.

## Project structure

```
├── Pages/
│   ├── BasePage.cs          # Base page (GotoAsync, WaitForSelectorAsync)
│   └── LoginPage.cs         # Login page object
├── Tests/
│   ├── SmokeTests.cs        # Smoke tests (3 tests, [Category("Smoke")])
│   └── VerifySelectorsTests.cs  # Selector validation tests
├── Config.cs                # Environment configuration
├── PlaywrightE2E.csproj     # .NET project file with NuGet packages
├── .env.example
└── scripts/                 # DOM verification tools
```

## How it works

- Tests inherit from `PageTest` (Playwright NUnit base class) which manages browser lifecycle.
- `Config.cs` loads environment variables from `.env` at static initialization.
- `VerifySelectorsTests.cs` validates that critical selectors exist on the page.

## Adding new tests

1. Create test classes in `Tests/` inheriting from `PageTest`
2. Add page objects in `Pages/`
3. Use `[Category("Smoke")]` for smoke test categorization

## CI/CD

GitHub Actions workflow at `.github/workflows/e2e.yml`. Set `BASE_URL`, `UI_USERNAME`, `UI_PASSWORD` as repository secrets.
