# Appium + Python E2E Template

End-to-end test template for mobile apps (Android & iOS) using Appium with Python and pytest.

## Prerequisites

- Python 3.10+
- pip
- Appium server (`npm install -g appium`)
- Android: SDK / emulator (or physical device)
- iOS: Xcode + Simulator (or physical device with WebDriverAgent)

## Setup

```bash
cp .env.example .env                # configure platform and device settings
python -m venv .venv
source .venv/bin/activate            # Windows: .venv\Scripts\activate
pip install -r requirements.txt
appium                               # start Appium server in a separate terminal
```

## Running tests

```bash
pytest                               # all tests
pytest -m smoke                      # smoke tests only

# Switch platform via env
PLATFORM_NAME=iOS pytest             # run on iOS
PLATFORM_NAME=Android pytest         # run on Android
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
├── tests/
│   ├── test_smoke.py        # Smoke tests (Android + iOS)
│   └── __init__.py
├── conftest.py              # pytest fixtures (auto-selects Android/iOS driver)
├── config.py                # Environment variable loading
├── requirements.txt
└── scripts/                 # DOM verification tools
```

## How it works

- `conftest.py` checks `PLATFORM_NAME` and creates either an `AndroidDriver` (UiAutomator2) or `IOSDriver` (XCUITest).
- Tests use platform-aware assertions (e.g. `XCUIElementTypeStaticText` for iOS, `android.widget.TextView` for Android).
- Set `PLATFORM_NAME=iOS` in `.env` or as an env var to switch platforms.

## Adding new tests

1. Create test files in `tests/` (prefix with `test_`)
2. Update `.env` with your app's package/bundle ID
3. Use `config.PLATFORM_NAME` to branch platform-specific logic
