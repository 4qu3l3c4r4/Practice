# Supertest + TypeScript API Template

API test template using Supertest with Jest and TypeScript.

## Setup

```bash
cp .env.example .env
npm install
```

## Running tests

```bash
npm test                    # all tests
npm run test:smoke          # smoke tests only
```

## Environment variables

| Variable    | Description     | Default                  |
|------------|-----------------|--------------------------|
| `BASE_URL` | API base URL    | `http://localhost:3000`  |
| `API_TOKEN`| Auth token      | -                        |

## Project structure

```
├── tests/
│   └── api.test.ts          # API tests
├── jest.config.js
├── package.json
├── tsconfig.json
└── .env.example
```
