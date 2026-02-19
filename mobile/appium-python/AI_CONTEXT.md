# AI Context — Appium Python Template (Android & iOS)

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

Mobile E2E testing for Android and iOS using Appium with Python and pytest.

## Tech stack

- Python 3.10+
- Appium-Python-Client
- pytest
- UiAutomator2 (Android) / XCUITest (iOS)

## Project structure

```
tests/test_smoke.py        → Tests (platform-aware)
conftest.py                → Fixtures (auto-selects driver)
config.py                  → Config with PLATFORM_NAME
```

## Code patterns

```python
@pytest.mark.smoke
def test_content_visible(driver):
    if config.PLATFORM_NAME.lower() == 'ios':
        elements = driver.find_elements(AppiumBy.CLASS_NAME, "XCUIElementTypeStaticText")
    else:
        elements = driver.find_elements(AppiumBy.CLASS_NAME, "android.widget.TextView")
    assert len(elements) > 0
```

### Selectors by platform
- Android: `AppiumBy.ID` (resource-id), `AppiumBy.ACCESSIBILITY_ID` (content-desc)
- iOS: `AppiumBy.ACCESSIBILITY_ID`, `AppiumBy.CLASS_NAME` (XCUIElementType*)

## Commands

```bash
pytest
PLATFORM_NAME=iOS pytest
pytest -m smoke
```

## Discovery & test generation workflow

1. Run `scripts/discovery/discover-mobile-app.py --platform android` or `--platform ios`.
2. Review the discovery report JSON for available selectors/endpoints/elements
3. Create test files following the patterns above
4. Run tests to verify

## Rules

- Follow existing patterns in the template
- Keep test data in `.env` or config files, not hardcoded
- Use Page Object Model for web/mobile tests
- One test file per feature area
- Name tests descriptively
