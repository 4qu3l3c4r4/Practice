# AI Context — Playwright Python Template

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

Browser-based E2E testing using Playwright for Python with pytest.

## Tech stack

- Python 3.10+
- Playwright for Python
- pytest

## Project structure

```
tests/test_smoke.py        → Test files
pages/login_page.py        → Page objects
pages/base_page.py         → Base page
conftest.py                → Fixtures
config.py                  → Environment config
```

## Code patterns

```python
def test_login_page_loads(page):
    page.goto(config.BASE_URL + "/login")
    expect(page.locator("[data-test-id='LoginForm']")).to_be_visible()
```

## Commands

```bash
pytest
pytest -m smoke
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
