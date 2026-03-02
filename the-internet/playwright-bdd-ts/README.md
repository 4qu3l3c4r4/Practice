# The Internet (HerokuApp) — Playwright BDD TypeScript

Automação E2E do **The Internet (HerokuApp)** usando **Playwright + TypeScript + Playwright BDD (Gherkin)**.

## Estrutura

```
the-internet/playwright-bdd-ts/
├── package.json
├── tsconfig.json
├── playwright.config.ts
├── .env.example
└── src
    ├── elements/
    ├── pages/
    ├── fixtures/
    └── tests/
        ├── features/
        └── steps/
```

## Setup

```bash
cd the-internet/playwright-bdd-ts
cp .env.example .env
npm install
npx playwright install
npm run bddgen
```

## Execução

```bash
npm run test        # todos os cenários
npm run test:smoke  # cenários marcados com @smoke
```

## Funcionalidades cobertas

- **Autenticação básica**: `/basic_auth` com credenciais em `.env`.
- **Checkboxes**: alternar e validar estado.
- **Dropdown dinâmico**: seleção de Option 1/2.
- **Elementos dinâmicos**: `/dynamic_loading/1` com wait até "Hello World!".
- **Drag and drop**: troca entre colunas A/B.
- **Upload**: envio de arquivo e validação do nome.
- **Editor WYSIWYG**: edição e validação de texto dentro do iframe.
- **Hover**: exibição de legenda ao passar o mouse.
- **JS Alerts/Confirm/Prompt**: aceitar/descartar e validar resultado.
- **Infinite scroll**: rolagem até N parágrafos.
- **Múltiplas janelas**: abertura e validação de janela "New Window".

Todos os testes seguem **POM**, usam seletores centralizados em `src/elements/common.ts` e fixtures em `src/fixtures/fixtures.ts`, com cenários **positivos**, **negativos** (quando aplicável) e **edge** (como infinite scroll e hovers).

