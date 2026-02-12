# Appium + C# E2E Template

End-to-end test template for mobile apps using Appium with C# and NUnit.

## Prerequisites

- .NET 8 SDK
- Appium server (`npm install -g appium`)
- Android SDK / emulator (or physical device)

## Setup

```bash
cp .env.example .env        # configure APPIUM_URL, DEVICE_NAME, APP_PACKAGE, APP_ACTIVITY
appium                       # start Appium server in a separate terminal
dotnet restore
```

## Running tests

```bash
dotnet test                                          # all tests
dotnet test --filter "TestCategory=Smoke"            # smoke tests only
```

## Environment variables

| Variable        | Description              | Default                    |
|----------------|--------------------------|----------------------------|
| `APPIUM_URL`   | Appium server URL        | `http://127.0.0.1:4723`   |
| `PLATFORM_NAME`| Platform                 | `Android`                  |
| `DEVICE_NAME`  | Device or emulator name  | `emulator-5554`            |
| `APP_PACKAGE`  | Android app package      | `com.android.settings`     |
| `APP_ACTIVITY` | Android launch activity  | `.Settings`                |

## Project structure

```
├── Tests/
│   ├── AppiumFixture.cs     # AndroidDriver setup/teardown
│   └── SmokeTests.cs        # Smoke tests (2 tests)
├── Config.cs                # Environment configuration
├── AppiumE2E.csproj         # .NET project (Appium.WebDriver, NUnit)
├── .env.example
└── scripts/                 # DOM verification tools
```

## How it works

- `AppiumFixture.cs` creates an `AndroidDriver` with `UiAutomator2Options` from environment config.
- Tests inherit from `AppiumFixture` and use the shared driver.
- Default config targets the Android Settings app for quick validation.

## Adding new tests

1. Create test classes in `Tests/` inheriting from `AppiumFixture`
2. Update `APP_PACKAGE` and `APP_ACTIVITY` in `.env` for your app
