# Appium + Python E2E Template

End-to-end test template for mobile apps using Appium with Python and pytest.

## Prerequisites

- Python 3.10+
- pip
- Appium server (`npm install -g appium`)
- Android SDK / emulator (or physical device)

## Setup

```bash
cp .env.example .env                # configure APPIUM_URL, DEVICE_NAME, etc.
python -m venv .venv
source .venv/bin/activate            # Windows: .venv\Scripts\activate
pip install -r requirements.txt
appium                               # start Appium server in a separate terminal
```

## Running tests

```bash
pytest                               # all tests
pytest -m smoke                      # smoke tests only
pytest -v                            # verbose output
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
├── tests/
│   ├── test_smoke.py        # Smoke tests
│   └── __init__.py
├── conftest.py              # pytest fixtures (Appium driver setup)
├── config.py                # Environment variable loading
├── requirements.txt         # Appium-Python-Client, pytest, python-dotenv
└── scripts/                 # DOM verification tools
```

## How it works

- `conftest.py` creates an Appium driver with `UiAutomator2Options` and provides it as a pytest fixture.
- `config.py` loads `.env` variables using python-dotenv.
- Default config targets the Android Settings app for quick validation.

## Adding new tests

1. Create test files in `tests/` (prefix with `test_`)
2. Update `APP_PACKAGE` and `APP_ACTIVITY` in `.env` for your app
