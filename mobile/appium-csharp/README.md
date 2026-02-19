# Appium + C# E2E Template

End-to-end test template for mobile apps (Android & iOS) using Appium with C# and NUnit.

## Prerequisites

- .NET 8 SDK
- Appium server (`npm install -g appium`)
- Android: SDK / emulator (or physical device)
- iOS: Xcode + Simulator (or physical device with WebDriverAgent)

## Setup

```bash
cp .env.example .env        # configure platform and device settings
appium                       # start Appium server in a separate terminal
dotnet restore
```

## Running tests

```bash
dotnet test                                          # all tests
dotnet test --filter "TestCategory=Smoke"            # smoke tests only

# Switch platform via env
PLATFORM_NAME=iOS dotnet test                        # run on iOS
PLATFORM_NAME=Android dotnet test                    # run on Android
```

## Environment variables

| Variable              | Description              | Default                    |
|----------------------|--------------------------|----------------------------|
| `APPIUM_URL`         | Appium server URL        | `http://127.0.0.1:4723`   |
| `PLATFORM_NAME`      | `Android` or `iOS`       | `Android`                  |
| `DEVICE_NAME`        | Android device/emulator  | `emulator-5554`            |
| `APP_PACKAGE`        | Android app package      | `com.android.settings`     |
| `APP_ACTIVITY`       | Android launch activity  | `.Settings`                |
| `IOS_DEVICE_NAME`    | iOS device/simulator     | `iPhone 15`                |
| `IOS_PLATFORM_VERSION`| iOS version             | `17.4`                     |
| `IOS_BUNDLE_ID`      | iOS app bundle ID        | `com.apple.Preferences`    |

## Project structure

```
├── Tests/
│   ├── AppiumFixture.cs     # Auto-selects AndroidDriver or IOSDriver
│   └── SmokeTests.cs        # Smoke tests (Android + iOS)
├── Config.cs                # Environment configuration
├── AppiumE2E.csproj
├── .env.example
└── scripts/                 # DOM verification tools
```

## How it works

- `AppiumFixture.cs` checks `Config.IsIos` and creates either an `AndroidDriver` or `IOSDriver`.
- Tests use `Config.IsIos` for platform-specific element lookups.
- Default config targets the Settings app on both platforms for quick validation.

## Adding new tests

1. Create test classes in `Tests/` inheriting from `AppiumFixture`
2. Update `.env` with your app's package/bundle ID
3. Use `Config.IsIos` to branch platform-specific logic
