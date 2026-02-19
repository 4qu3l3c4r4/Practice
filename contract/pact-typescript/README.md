# Pact Contract Testing Template

Consumer-driven contract testing using Pact (TypeScript).

## Setup

```bash
npm install
```

## Running tests

```bash
npm test                    # generate pact contracts
npm run test:publish        # publish to Pact Broker
```

## How it works

1. Consumer tests define expected interactions (request/response pairs)
2. Pact spins up a mock provider, runs your assertions, and generates a contract JSON in `pacts/`
3. Publish the contract to a Pact Broker
4. Provider verifies the contract against their real implementation

## Matchers

| Matcher | Description |
|---------|-------------|
| `like(value)` | Matches type, not exact value |
| `eachLike(value)` | Array where each element matches type |
| `regex(pattern, example)` | Matches regex pattern |
| `integer()` | Any integer |
| `string()` | Any string |

## Project structure

```
├── tests/consumer.test.ts    # Consumer contract tests
├── pacts/                     # Generated contract files (gitignored)
├── jest.config.js
├── package.json
└── .env.example
```
