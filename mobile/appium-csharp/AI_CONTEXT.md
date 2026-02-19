# AI Context — Appium C# Template (Android & iOS)

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

Mobile E2E testing for Android and iOS using Appium with C# and NUnit.

## Tech stack

- .NET 8 SDK
- Appium.WebDriver
- NUnit 4
- UiAutomator2 (Android) / XCUITest (iOS)

## Project structure

```
Tests/AppiumFixture.cs     → Driver setup (auto-selects Android/iOS)
Tests/SmokeTests.cs        → Tests
Config.cs                  → Config with IsIos property
```

## Code patterns

```csharp
[Test]
public void ContentVisible()
{
    var className = Config.IsIos ? "XCUIElementTypeStaticText" : "android.widget.TextView";
    var elements = Driver.FindElements(MobileBy.ClassName(className));
    Assert.That(elements.Count, Is.GreaterThan(0));
}
```

## Commands

```bash
dotnet test
PLATFORM_NAME=iOS dotnet test
dotnet test --filter "TestCategory=Smoke"
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
