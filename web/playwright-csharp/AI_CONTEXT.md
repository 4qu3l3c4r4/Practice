# AI Context — Playwright C# Template

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

Browser-based E2E testing using Playwright for .NET with NUnit.

## Tech stack

- .NET 8 SDK
- Playwright for .NET
- NUnit 4
- C#

## Project structure

```
Tests/BaseTest.cs          → Base class with browser setup
Tests/SmokeTests.cs        → Test classes
Tests/VerifySelectorsTests.cs → Selector health checks
Pages/BasePage.cs          → Base page object
Pages/LoginPage.cs         → Page objects
Config.cs                  → Environment config
```

## Code patterns

```csharp
[Test]
public async Task LoginPageLoads()
{
    await Page.GotoAsync(Config.BaseUrl + "/login");
    await Expect(Page.Locator("[data-test-id='LoginForm']")).ToBeVisibleAsync();
}
```

## Commands

```bash
dotnet test
dotnet test --filter "TestCategory=Smoke"
```

## Discovery & test generation workflow

1. Run `scripts/discovery/discover-web-ui.js` against target URL, then create page objects in `Pages/` and tests in `Tests/`.
2. Review the discovery report JSON for available selectors/endpoints/elements
3. Create test files following the patterns above
4. Run tests to verify

## Rules

- Follow existing patterns in the template
- Keep test data in `.env` or config files, not hardcoded
- Use Page Object Model for web/mobile tests
- One test file per feature area
- Name tests descriptively
