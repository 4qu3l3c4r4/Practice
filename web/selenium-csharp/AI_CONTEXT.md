# AI Context — Selenium C# Template

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

Browser-based E2E testing using Selenium WebDriver with NUnit and C#.

## Tech stack

- .NET 8 SDK
- Selenium WebDriver
- NUnit 4
- C#

## Project structure

```
Tests/LoginTests.cs        → Test classes
Tests/WebDriverFixture.cs  → Driver setup/teardown
Pages/LoginPage.cs         → Page objects
Pages/BasePage.cs          → Base page
Config.cs                  → Environment config
```

## Code patterns

```csharp
[Test]
public void LoginPageLoads()
{
    Driver.Navigate().GoToUrl(Config.BaseUrl + "/login");
    var form = Driver.FindElement(By.CssSelector("[data-test-id='LoginForm']"));
    Assert.That(form.Displayed, Is.True);
}
```

## Commands

```bash
dotnet test
dotnet test --filter "TestCategory=Smoke"
```

## Discovery & test generation workflow

1. Run `scripts/discovery/discover-web-ui.js` against target URL.
2. Review the discovery report JSON for available selectors/endpoints/elements
3. Create test files following the patterns above
4. Run tests to verify

## Rules

- Follow existing patterns in the template
- Keep test data in `.env` or config files, not hardcoded
- Use Page Object Model for web/mobile tests
- One test file per feature area
- Name tests descriptively
