# AI Context — Playwright Java Template

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

Browser-based E2E testing using Playwright for Java with Maven and JUnit 5.

## Tech stack

- Java 17+
- Maven
- Playwright for Java
- JUnit 5

## Project structure

```
src/test/java/tests/       → Test classes
src/main/java/config/      → Config
pom.xml                    → Maven dependencies
```

## Code patterns

```java
@Test
void loginPageLoads() {
    page.navigate(Config.getBaseUrl() + "/login");
    assertThat(page.locator("[data-test-id='LoginForm']")).isVisible();
}
```

## Commands

```bash
mvn test
mvn test -Dgroups=smoke
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
