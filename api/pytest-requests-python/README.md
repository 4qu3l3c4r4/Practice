# pytest + Requests API Template

API test template using Python requests with pytest.

## Setup

```bash
cp .env.example .env
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```

## Running tests

```bash
pytest                      # all tests
pytest -m smoke             # smoke tests only
```

## Environment variables

| Variable    | Description     | Default                  |
|------------|-----------------|--------------------------|
| `BASE_URL` | API base URL    | `http://localhost:3000`  |
| `API_TOKEN`| Auth token      | -                        |

## Project structure

```
├── tests/test_api.py
├── conftest.py
├── requirements.txt
└── .env.example
```
