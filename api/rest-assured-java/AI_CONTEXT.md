# AI Context — REST Assured Java API Template

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

REST API testing using REST Assured with Maven and JUnit 5.

## Tech stack

- Java 17+
- Maven
- REST Assured 5.x
- JUnit 5

## Project structure

```
src/test/java/tests/ApiTest.java   → API tests
src/main/java/config/Config.java   → Config
```

## Code patterns

```java
@Test
void get_users_returns_array() {
    get("/api/users").then()
        .statusCode(200)
        .body("$", instanceOf(java.util.List.class));
}
```

## Commands

```bash
mvn test
mvn test -Dgroups=smoke
```

## Discovery & test generation workflow

1. Run `scripts/discovery/discover-api.sh http://your-api.com` to find all endpoints.
2. Review the discovery report JSON for available selectors/endpoints/elements
3. Create test files following the patterns above
4. Run tests to verify

## Rules

- Follow existing patterns in the template
- Keep test data in `.env` or config files, not hardcoded
- Use Page Object Model for web/mobile tests
- One test file per feature area
- Name tests descriptively
