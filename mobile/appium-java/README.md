# Appium + Java E2E Template

End-to-end test template for mobile apps (Android & iOS) using Appium with Java, Maven, and JUnit 5.

## Prerequisites

- Java 17+
- Maven 3.8+
- Appium server (`npm install -g appium`)
- Android: SDK / emulator (or physical device)
- iOS: Xcode + Simulator (or physical device with WebDriverAgent)

## Setup

```bash
cp .env.example .env        # configure platform and device settings
appium                       # start Appium server in a separate terminal
mvn install                  # download dependencies
```

## Running tests

```bash
mvn test                                    # all tests
mvn test -Dgroups=smoke                     # smoke tests only

# Switch platform via system property
mvn test -DPLATFORM_NAME=iOS                # run on iOS
mvn test -DPLATFORM_NAME=Android            # run on Android
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
├── src/
│   ├── main/java/config/
│   │   └── Config.java          # Environment configuration (dotenv-java)
│   └── test/java/tests/
│       ├── BaseTest.java        # Auto-selects AndroidDriver or IOSDriver
│       └── SmokeTest.java       # Smoke tests (Android + iOS)
├── pom.xml
├── .env.example
└── scripts/                     # DOM verification tools
```

## How it works

- `BaseTest.java` checks `PLATFORM_NAME` and creates either an `AndroidDriver` (UiAutomator2) or `IOSDriver` (XCUITest).
- `Config.isIos()` helper for platform-specific logic in tests.
- Default config targets the Settings app on both platforms for quick validation.

## Adding new tests

1. Create test classes in `src/test/java/tests/` extending `BaseTest`
2. Update `.env` with your app's package/bundle ID
3. Use `Config.isIos()` to branch platform-specific logic

## CI/CD

GitHub Actions workflow at `.github/workflows/e2e.yml`. Note: CI requires emulator/simulator setup steps.
