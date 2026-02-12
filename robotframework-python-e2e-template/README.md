# Robot Framework + Python E2E Template

End-to-end test template using Robot Framework with SeleniumLibrary for keyword-driven testing.

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
robot tests/                         # all tests
robot --include smoke tests/         # smoke tests only
robot --outputdir reports tests/     # output to reports/
```

## Environment variables

| Variable       | Description    | Default                |
|---------------|----------------|------------------------|
| `BASE_URL`    | App URL        | `http://localhost:3000` |
| `UI_USERNAME` | Login username | —                      |
| `UI_PASSWORD` | Login password | —                      |

Variables are loaded from `.env` in `variables/env.py` and available in Robot files.

## Project structure

```
├── tests/
│   └── smoke.robot          # Smoke test cases (3 tests, [Tags] smoke)
├── resources/
│   └── keywords.robot       # Custom keywords (Open App, Login)
├── variables/
│   ├── env.py               # Load .env into Robot variables
│   └── vars.robot           # Variable references
├── requirements.txt         # robotframework, robotframework-seleniumlibrary, python-dotenv
└── scripts/                 # DOM verification tools
```

## How it works

- `variables/env.py` loads `.env` using python-dotenv and exposes variables to Robot Framework.
- `resources/keywords.robot` defines reusable keywords like `Open App` and `Login`.
- Test cases in `tests/smoke.robot` use these keywords in plain-English syntax.
- SeleniumLibrary handles browser automation.

## Test example

```robot
*** Test Cases ***
Login Page Should Load
    [Tags]    smoke
    Open App
    Page Should Contain Element    css:input[type="email"], input[name="username"]
```

## Adding new tests

1. Create `.robot` files in `tests/`
2. Add reusable keywords in `resources/keywords.robot`
3. Use `[Tags]    smoke` for categorization

## CI/CD

GitHub Actions workflow at `.github/workflows/e2e.yml`. Set `BASE_URL`, `UI_USERNAME`, `UI_PASSWORD` as repository secrets.
