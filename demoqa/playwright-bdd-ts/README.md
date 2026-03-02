# DemoQA — Playwright BDD TypeScript

End-to-end automation for **DemoQA** using **Playwright + TypeScript + Playwright BDD (Gherkin)**.

## Structure

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

## Running tests

```bash
npm run test        # all scenarios
npm run test:smoke  # scenarios tagged with @smoke
```

## Current scope

- Practice Form (`/automation-practice-form`):
  - Positive scenario with valid data (confirmation modal).
  - Negative scenario with required fields empty (class `is-invalid`).

## Covered modules

- **Forms**: Practice Form (positive/negative).
- **Elements**: Check Box, Radio Button, Select Menu.
- **Files**: Upload and Download.
- **Alerts**: Simple alert, Confirm (dismiss), Prompt.
- **Interactions**: Drag and Drop (Droppable).
- **Tables**: Web Tables (add/remove; required email validation).
- **Frames**: read content inside the frame.
- **Modals/Tooltips**: open/close modal; tooltip on hover.
- **Widgets**: Date Picker (via input); Slider (via arrow keys).

Everything follows **POM**, externalized data (`src/fixtures/testData.json`), dynamic waits and tags (`@smoke`, `@regression`, `@negative`, `@edge`).

