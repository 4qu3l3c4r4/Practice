# Swag Labs — Playwright BDD TypeScript

Automação E2E do site **Swag Labs (SauceDemo)** usando **Playwright + TypeScript + playwright-bdd (Gherkin)**.

## Estrutura do projeto

```
swag-labs/playwright-bdd-ts/
├── README.md
├── .env.example
├── package.json
├── tsconfig.json
├── playwright.config.ts
└── src
    ├── pages/          # Page Objects (LoginPage, InventoryPage, etc.)
    ├── tests/
    │   ├── features/   # Cenários BDD (.feature)
    │   └── steps/      # Step definitions
    ├── fixtures/       # Fixtures do Playwright (injeção de POM, dados)
    ├── helpers/        # Utilitários compartilhados (logger, waits, etc.)
    └── elements/       # Selectors centralizados
```

## Pré-requisitos

- Node.js 20+
- npm

## Setup

```bash
cd swag-labs/playwright-bdd-ts
cp .env.example .env           # Ajuste BASE_URL e credenciais se necessário
npm install
npx playwright install         # Baixar navegadores na primeira vez
npm run bddgen                 # Gerar bindings BDD a partir dos .feature
```

## Execução

```bash
npm run test                   # Todos os testes (headless)
npm run test:headed            # Todos os testes com browser visível
npm run test:smoke             # Cenários marcados com @smoke
npm run test:smoke:headed      # @smoke com browser visível
npm run test:all               # Projeto 'all' do Playwright
```

## Variáveis de ambiente

Todas as variáveis ficam em `.env` (nunca hardcoded nos testes):

- `BASE_URL` — URL base do Swag Labs (`https://www.saucedemo.com`)
- `HEADLESS_MODE` — `true` ou `false`
- `VIDEO_RECORDING` — `true` para gravar vídeo dos testes
- `UI_USERNAME` — usuário principal (ex.: `standard_user`)
- `UI_PASSWORD` — senha (`secret_sauce`)
- `LOCKED_OUT_USERNAME` — usuário bloqueado (`locked_out_user`)
- `PROBLEM_USERNAME` — usuário com problemas visuais (`problem_user`)
- `PERFORMANCE_USERNAME` — usuário com performance degradada (`performance_glitch_user`)

## Convenções

- **POM (Page Object Model)**: uma classe por página (ex.: `LoginPage`, `InventoryPage`).
- **BDD**: cenários em Gherkin com tags como `@login`, `@smoke`, `@regression`, `@negative`, `@edge`.
- **Dados externos**: tudo que for variável vem de `.env` ou arquivos em `fixtures/`.
- **Waits inteligentes**: uso de locators com `expect`, `waitForSelector` e waits dinâmicos, nunca `sleep` fixo.

## Escopo atual

Neste primeiro passo foram implementados apenas os **cenários de autenticação**:

- Login com credenciais válidas (`standard_user`).
- Login com credenciais inválidas.
- Login com usuário bloqueado (`locked_out_user`).
- Cenário de borda com campos vazios.

Os próximos passos esperados são:

1. Cobrir fluxos críticos de negócio (ex.: adicionar ao carrinho, checkout).
2. Adicionar cenários negativos e de borda adicionais.

Os arquivos de teste e POM estão comentados em português para facilitar o entendimento.

