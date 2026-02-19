# Selenium + Python E2E Template

End-to-end test template using Selenium WebDriver with Python and pytest.

## Prerequisites

- Python 3.10+
- pip
- Chrome browser installed

## Setup

```bash
cp .env.example .env                # configure BASE_URL, UI_USERNAME, UI_PASSWORD
python -m venv .venv
source .venv/bin/activate            # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

## Running tests

```bash
pytest                               # all tests
pytest -m smoke                      # smoke tests only
pytest -v                            # verbose output
pytest --junitxml=reports/results.xml  # with JUnit XML report
```

## Environment variables

| Variable       | Description                 | Default                |
|---------------|-----------------------------|------------------------|
| `BASE_URL`    | App URL                     | `http://localhost:3000` |
| `UI_USERNAME` | Login username              | —                      |
| `UI_PASSWORD` | Login password              | —                      |
| `BROWSER`     | Browser to use              | `chrome`               |

## Project structure

```
├── tests/
│   ├── test_login.py        # Smoke tests (3 tests)
│   └── __init__.py
├── pages/
│   ├── base_page.py         # BasePage with WebDriver + WebDriverWait
│   ├── login_page.py        # LoginPage with generic selectors
│   └── __init__.py
├── conftest.py              # pytest fixtures (driver setup/teardown)
├── config.py                # Environment variable loading
├── requirements.txt         # selenium, pytest, python-dotenv, webdriver-manager
├── pytest.ini               # pytest configuration and markers
└── scripts/                 # DOM verification tools
```

## How it works

- `conftest.py` creates a Chrome WebDriver (headless by default) via webdriver-manager and provides it as a pytest fixture.
- `config.py` loads environment variables from `.env` using python-dotenv.
- Page objects use Selenium's `By` locators and `WebDriverWait` for element interactions.

## Adding new tests

1. Create test files in `tests/` (prefix with `test_`)
2. Add page objects under `pages/`
3. Use `@pytest.mark.smoke` to tag smoke tests

## CI/CD

GitHub Actions workflow at `.github/workflows/e2e.yml`. Set `BASE_URL`, `UI_USERNAME`, `UI_PASSWORD` as repository secrets.
