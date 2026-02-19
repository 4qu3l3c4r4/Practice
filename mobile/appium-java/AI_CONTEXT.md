# AI Context — Appium Java Template (Android & iOS)

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

Mobile E2E testing for Android and iOS using Appium with Java and JUnit 5.

## Tech stack

- Java 17+
- Maven
- Appium java-client 9.x
- JUnit 5
- UiAutomator2 (Android) / XCUITest (iOS)

## Project structure

```
src/test/java/tests/BaseTest.java  → Driver setup (auto-selects Android/iOS)
src/test/java/tests/SmokeTest.java → Tests
src/main/java/config/Config.java   → Config with isIos() helper
```

## Code patterns

```java
@Test
void app_displays_content() {
    if (Config.isIos()) {
        assertFalse(driver.findElements(By.className("XCUIElementTypeStaticText")).isEmpty());
    } else {
        assertFalse(driver.findElements(By.xpath("//*[@resource-id]")).isEmpty());
    }
}
```

### Selectors by platform
- Android: `resource-id`, `content-desc`, `By.xpath`, `By.className("android.widget.*")`
- iOS: `accessibility id`, `By.className("XCUIElementType*")`, `By.xpath`

## Commands

```bash
mvn test
mvn test -DPLATFORM_NAME=iOS
mvn test -Dgroups=smoke
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
