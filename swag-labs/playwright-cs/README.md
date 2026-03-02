# Swag Labs — Playwright C# (.NET)

End-to-end automation project for **Swag Labs (SauceDemo)** using **Playwright for .NET + NUnit**.

## Structure

```
swag-labs/playwright-cs/
├── PlaywrightE2E.SwagLabs.csproj
├── Config.cs
├── .env.example
├── Pages/
│   ├── BasePage.cs
│   └── LoginPage.cs
└── Tests/
    ├── BaseTest.cs
    └── AuthTests.cs
```

## Prerequisites

- .NET 8 SDK
- PowerShell (to install Playwright browsers)

## Setup

```bash
cd swag-labs/playwright-cs
cp .env.example .env            # adjust credentials if needed
dotnet restore
dotnet build
pwsh bin/Debug/net8.0/playwright.ps1 install chromium
```

## Running tests

```bash
dotnet test                               # all tests
dotnet test --filter "TestCategory=Smoke" # only smoke (happy path login)
dotnet test --filter "TestCategory=Negative"
dotnet test --filter "TestCategory=Edge"
```

## Implemented scenarios

All tests live in `Tests/AuthTests.cs` and use the `LoginPage` Page Object:

- **Login_WithValidCredentials_ShouldRedirectToInventory**  
  - Category: `Auth`, `Smoke`  
  - Uses `UI_USERNAME`/`UI_PASSWORD` from `.env` (defaults to `standard_user` / `secret_sauce`).  
  - Validates redirect to `inventory.html` and the presence of the products container.

- **Login_WithInvalidPassword_ShouldShowErrorMessage**  
  - Category: `Auth`, `Negative`  
  - Uses an invalid password and validates the message  
    `"Epic sadface: Username and password do not match any user in this service"`.

- **Login_WithEmptyFields_ShouldRequireUsername**  
  - Categories: `Auth`, `Negative`, `Edge`  
  - Clicks login with empty fields and validates the message  
    `"Epic sadface: Username is required"`.

## Test data

Credentials and execution flags are configured via `.env`:

- `BASE_URL` — `https://www.saucedemo.com`
- `UI_USERNAME` — default user (`standard_user`)
- `UI_PASSWORD` — password (`secret_sauce`)
- `HEADLESS_MODE` — `true` or `false`
- `VIDEO_RECORDING` — enables or disables video recording

No sensitive data is hardcoded in the code — everything goes through `Config`.

