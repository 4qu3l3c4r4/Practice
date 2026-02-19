# Playwright + Python E2E Template

End-to-end test template using Playwright for Python with pytest.

## Prerequisites

- Python 3.10+
- pip

## Setup

```bash
cp .env.example .env                # configure BASE_URL, UI_USERNAME, UI_PASSWORD
python -m venv .venv
source .venv/bin/activate            # Windows: .venv\Scripts\activate
pip install -r requirements.txt
playwright install chromium          # download browser (first time)
```

## Running tests

```bash
pytest                               # all tests, headless
pytest -m smoke                      # smoke tests only
pytest --headed                      # visible browser
pytest -v                            # verbose output
```

## Environment variables

| Variable         | Description                 | Default                |
|-----------------|-----------------------------|------------------------|
| `BASE_URL`      | App URL                     | `http://localhost:3000` |
| `UI_USERNAME`   | Login username              | —                      |
| `UI_PASSWORD`   | Login password              | —                      |
| `HEADLESS_MODE` | Run without visible browser | `true`                 |
| `LOGIN_PATH`    | Login page path             | `/login`               |

## Project structure

```
├── tests/
│   ├── test_smoke.py      # Smoke tests (3 tests)
│   └── __init__.py
├── pages/
│   ├── base_page.py       # BasePage with navigate(), wait_for_element()
│   ├── login_page.py      # LoginPage with login()
│   └── __init__.py
├── conftest.py            # pytest fixtures (page, browser, credentials)
├── config.py              # Environment variable loading
├── requirements.txt       # Dependencies
├── pytest.ini             # pytest configuration and markers
└── scripts/               # DOM verification tools
```

## Adding new tests

1. Create test files in `tests/` (prefix with `test_`)
2. Add page objects under `pages/`
3. Add fixtures in `conftest.py` as needed
4. Use `@pytest.mark.smoke` to tag smoke tests

## CI/CD

GitHub Actions workflow at `.github/workflows/e2e.yml`. Set `BASE_URL`, `UI_USERNAME`, `UI_PASSWORD` as repository secrets.
