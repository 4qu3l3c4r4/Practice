# AI Context — pytest + Requests Python API Template

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

REST API testing using Python requests with pytest.

## Tech stack

- Python 3.10+
- requests
- pytest

## Project structure

```
tests/test_api.py          → API tests
conftest.py                → Session fixture with auth headers
```

## Code patterns

```python
def test_get_users(api):
    res = api.get(f'{BASE_URL}/api/users')
    assert res.status_code == 200
    assert isinstance(res.json(), list)
```

## Commands

```bash
pytest
pytest -m smoke
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
