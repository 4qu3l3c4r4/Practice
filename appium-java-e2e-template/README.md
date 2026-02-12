# Appium + Java E2E Template

End-to-end test template for mobile apps using Appium with Java, Maven, and JUnit 5.

## Prerequisites

- Java 17+
- Maven 3.8+
- Appium server (`npm install -g appium`)
- Android SDK / emulator (or physical device)

## Setup

```bash
cp .env.example .env        # configure APPIUM_URL, DEVICE_NAME, APP_PACKAGE, APP_ACTIVITY
appium                       # start Appium server in a separate terminal
mvn install                  # download dependencies
```

## Running tests

```bash
mvn test                                    # all tests
mvn test -Dgroups=smoke                     # smoke tests only
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
├── src/
│   ├── main/java/config/
│   │   └── Config.java          # Environment configuration (dotenv-java)
│   └── test/java/tests/
│       ├── BaseTest.java        # AndroidDriver setup/teardown
│       └── SmokeTest.java       # Smoke tests (@Tag("smoke"))
├── pom.xml                      # Maven config (Appium java-client 9.x, JUnit 5)
├── .env.example
└── scripts/                     # DOM verification tools
```

## How it works

- `BaseTest.java` creates an `AndroidDriver` with `UiAutomator2Options` in `@BeforeAll` and quits in `@AfterAll`.
- `Config.java` loads `.env` variables using dotenv-java.
- Default config targets the Android Settings app for quick validation.

## Adding new tests

1. Create test classes in `src/test/java/tests/` extending `BaseTest`
2. Update `APP_PACKAGE` and `APP_ACTIVITY` in `.env` for your app
3. Use `@Tag("smoke")` for categorization

## CI/CD

GitHub Actions workflow at `.github/workflows/e2e.yml`. Note: CI requires an Android emulator setup step (not included by default — add `reactivecircus/android-emulator-runner` action).
