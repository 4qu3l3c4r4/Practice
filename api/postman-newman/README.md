# Postman + Newman API Template

Run Postman collections from CLI and CI using Newman.

## Setup

```bash
cp .env.example .env
npm install
```

## Running tests

```bash
npm test                    # run smoke collection
npm run test:html           # run + HTML report in reports/
npm run test:ci             # run + JUnit XML for CI
```

## Override environment

```bash
newman run collections/smoke.postman_collection.json \
  --env-var "baseUrl=https://staging.example.com" \
  --env-var "apiToken=my-token"
```

## Adding collections

1. Author in Postman GUI or edit JSON directly
2. Export as Collection v2.1 → save to `collections/`
3. Export environment → save to `collections/`
4. Add npm script in `package.json`

## API discovery

```bash
./discover.sh http://your-api.com
# Generates a Postman collection from discovered endpoints
```

## Environment variables

| Variable | Description | Default |
|----------|-------------|---------|
| `BASE_URL` | API base URL | `http://localhost:3000` |
| `API_TOKEN` | Auth token | - |

## Project structure

```
├── collections/
│   ├── smoke.postman_collection.json       # Postman collection
│   └── env.postman_environment.json        # Environment variables
├── discover.sh
├── AI_CONTEXT.md
├── package.json
└── .env.example
```
