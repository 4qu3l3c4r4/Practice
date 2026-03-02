# Swag Labs — Playwright C# (.NET)

Projeto de automação E2E do **Swag Labs (SauceDemo)** usando **Playwright para .NET + NUnit**.

## Estrutura

```
swag-labs/playwright-cs/
├── PlaywrightE2E.SwagLabs.csproj
├── Config.cs
├── .env.example
├── Pages/
│   ├── BasePage.cs
│   └── LoginPage.cs
└── Tests/
    ├── BaseTest.cs
    └── AuthTests.cs
```

## Pré-requisitos

- .NET 8 SDK
- PowerShell (para instalar os browsers do Playwright)

## Setup

```bash
cd swag-labs/playwright-cs
cp .env.example .env            # ajuste credenciais se necessário
dotnet restore
dotnet build
pwsh bin/Debug/net8.0/playwright.ps1 install chromium
```

## Execução

```bash
dotnet test                               # todos os testes
dotnet test --filter "TestCategory=Smoke" # apenas smoke (login feliz)
dotnet test --filter "TestCategory=Negative"
dotnet test --filter "TestCategory=Edge"
```

## Cenários implementados

Todos os testes estão em `Tests/AuthTests.cs` e utilizam o Page Object `LoginPage`:

- **Login_ComCredenciaisValidas_DeveRedirecionarParaInventory**  
  - Categoria: `Auth`, `Smoke`  
  - Usa `UI_USERNAME`/`UI_PASSWORD` do `.env` (por padrão `standard_user` / `secret_sauce`).  
  - Valida redirecionamento para `inventory.html` e presença do container de produtos.

- **Login_ComSenhaInvalida_DeveExibirMensagemErro**  
  - Categoria: `Auth`, `Negative`  
  - Usa senha incorreta e valida a mensagem  
    `"Epic sadface: Username and password do not match any user in this service"`.

- **Login_CamposVazios_DeveInformarUsuarioObrigatorio**  
  - Categorias: `Auth`, `Negative`, `Edge`  
  - Clica em login sem preencher nada e valida mensagem  
    `"Epic sadface: Username is required"`.

## Dados de teste

As credenciais e flags de execução ficam no `.env`:

- `BASE_URL` — `https://www.saucedemo.com`
- `UI_USERNAME` — usuário padrão (`standard_user`)
- `UI_PASSWORD` — senha (`secret_sauce`)
- `HEADLESS_MODE` — `true` ou `false`
- `VIDEO_RECORDING` — habilita ou não gravação de vídeo

Nenhum dado sensível fica hardcoded no código — sempre via `Config`.

