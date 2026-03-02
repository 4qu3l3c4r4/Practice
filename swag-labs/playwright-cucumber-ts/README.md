# Swag Labs — Playwright Cucumber TypeScript

Automação E2E do **Swag Labs (SauceDemo)** usando **Playwright + Cucumber + TypeScript**.

## Estrutura

```
swag-labs/playwright-cucumber-ts/
├── package.json
├── tsconfig.json
├── playwright.config.ts
├── cucumber.json
├── .env.example
└── src
    ├── features/        # Cenários Gherkin (.feature)
    ├── steps/           # Step definitions
    ├── pages/           # Page Objects (LoginPage)
    └── support/         # World (PlaywrightWorld)
```

## Setup

```bash
cd swag-labs/playwright-cucumber-ts
cp .env.example .env
npm install
npx playwright install
```

## Execução

```bash
npm test           # headless
npm run test:headed
```

## Cenários atuais

- Login feliz com `standard_user` (`@login @smoke @regression`)
- Login com senha inválida (`@negative`)
- Login com campos vazios (`@negative @edge`)

Todos usando POM (`LoginPage`), dados externos via `.env` e asserções robustas (URL + elementos).

