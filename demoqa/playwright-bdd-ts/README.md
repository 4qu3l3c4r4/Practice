# DemoQA — Playwright BDD TypeScript

Automação E2E do **DemoQA** usando **Playwright + TypeScript + Playwright BDD (Gherkin)**.

## Estrutura

```
demoqa/playwright-bdd-ts/
├── package.json
├── tsconfig.json
├── playwright.config.ts
├── .env.example
└── src
    ├── pages/
    │   ├── BasePage.ts
    │   └── PracticeFormPage.ts
    ├── elements/
    │   └── common.ts
    ├── fixtures/
    │   └── fixtures.ts
    └── tests/
        ├── features/
        │   └── forms.feature
        └── steps/
            └── forms.steps.ts
```

## Setup

```bash
cd demoqa/playwright-bdd-ts
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

## Escopo atual

- Formulário de prática (`/automation-practice-form`):
  - Cenário positivo com dados válidos (modal de confirmação).
  - Cenário negativo com campos obrigatórios vazios (classe `is-invalid`).

## Módulos cobertos

- **Forms**: Practice Form (positivo/negativo).
- **Elements**: Check Box, Radio Button, Select Menu.
- **Files**: Upload e Download.
- **Alerts**: Alert simples, Confirm (dismiss), Prompt.
- **Interactions**: Drag and Drop (Droppable).
- **Tables**: Web Tables (adicionar/remover; validação de email obrigatório).
- **Frames**: leitura de conteúdo dentro do frame.
- **Modals/Tooltips**: abrir/fechar modal; tooltip via hover.
- **Widgets**: Date Picker (via input); Slider (via setas).

Tudo seguindo **POM**, dados externalizados (arquivo `src/fixtures/testData.json`), waits dinâmicos e tags (`@smoke`, `@regression`, `@negative`, `@edge`).

