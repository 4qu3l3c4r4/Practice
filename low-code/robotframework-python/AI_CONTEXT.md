# AI Context — Robot Framework Python Template

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

Keyword-driven E2E testing using Robot Framework with SeleniumLibrary and Python.

## Tech stack

- Python 3.10+
- Robot Framework 6.x
- SeleniumLibrary 6.x (browser automation)
- python-dotenv (environment config)

## Architecture

```
tests/*.robot              → Test cases (plain-English keyword syntax)
resources/keywords.robot   → Reusable custom keywords
variables/env.py           → Loads .env into Robot variables (Python)
variables/vars.robot       → Static variables (browser, headless flag)
```

## Key patterns

### Test cases (.robot files)

```robot
*** Settings ***
Resource    ../resources/keywords.robot
Test Setup    Open Browser To Login Page
Test Teardown    Close Browser

*** Test Cases ***
Login Should Work
    [Tags]    smoke
    Login With Valid Credentials
    Wait Until Location Does Not Contain    login    timeout=10s

Dashboard Should Show Username
    [Tags]    regression
    Login With Valid Credentials
    Wait Until Page Contains Element    css:[data-test-id="Dashboard.username"]
    Element Text Should Be    css:[data-test-id="Dashboard.username"]    ${UI_USERNAME}
```

### Custom keywords (resources/keywords.robot)

```robot
*** Keywords ***
Open Browser To Login Page
    ${options}=    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver
    Run Keyword If    ${HEADLESS}    Call Method    ${options}    add_argument    --headless
    Create Webdriver    Chrome    options=${options}
    Go To    ${BASE_URL}

Login With Valid Credentials
    Input Text    css:input[name="username"]    ${UI_USERNAME}
    Input Text    css:input[name="password"]    ${UI_PASSWORD}
    Click Button    css:button[type="submit"]

Navigate To
    [Arguments]    ${path}
    Go To    ${BASE_URL}${path}

Verify Element Visible
    [Arguments]    ${selector}
    Wait Until Page Contains Element    ${selector}    timeout=10s
    Element Should Be Visible    ${selector}
```

### Variables (variables/env.py)

```python
import os
from dotenv import load_dotenv
load_dotenv()

BASE_URL = os.getenv('BASE_URL', 'https://example.com')
UI_USERNAME = os.getenv('UI_USERNAME', '')
UI_PASSWORD = os.getenv('UI_PASSWORD', '')
```

Variables defined in `env.py` are automatically available as `${BASE_URL}`, `${UI_USERNAME}`, etc. in all .robot files.

## Selector strategy

Robot Framework with SeleniumLibrary uses these locator prefixes:

| Prefix | Example | When to use |
|--------|---------|-------------|
| `css:` | `css:[data-test-id="Login.submit"]` | Preferred — CSS selectors |
| `xpath:` | `xpath://button[@type='submit']` | Complex DOM traversal |
| `id:` | `id:username` | Element has unique ID |
| `name:` | `name:password` | Form inputs by name |
| `class:` | `class:btn-primary` | By CSS class (fragile) |

**Preferred order:** `css:` with `data-test-id` → `id:` → `name:` → `xpath:` as last resort.

## Common SeleniumLibrary keywords

| Keyword | Usage |
|---------|-------|
| `Open Browser` | `Open Browser    ${URL}    chrome` |
| `Go To` | `Go To    ${BASE_URL}/dashboard` |
| `Input Text` | `Input Text    css:#email    user@example.com` |
| `Click Button` | `Click Button    css:button[type="submit"]` |
| `Click Element` | `Click Element    css:[data-test-id="Nav.settings"]` |
| `Page Should Contain Element` | `Page Should Contain Element    css:.success-message` |
| `Element Text Should Be` | `Element Text Should Be    css:#result    MATCH` |
| `Wait Until Page Contains Element` | `Wait Until Page Contains Element    css:#loaded    timeout=15s` |
| `Wait Until Element Is Visible` | `Wait Until Element Is Visible    css:.modal    timeout=10s` |
| `Select From List By Value` | `Select From List By Value    css:#country    NL` |
| `Choose File` | `Choose File    css:input[type="file"]    ${CURDIR}/test.csv` |
| `Element Should Be Disabled` | `Element Should Be Disabled    css:#submit-btn` |
| `Get Text` | `${text}=    Get Text    css:#result` |
| `Capture Page Screenshot` | `Capture Page Screenshot    screenshots/${TEST_NAME}.png` |

## Commands

```bash
robot tests/                         # run all tests
robot --include smoke tests/         # by tag
robot --outputdir reports tests/     # custom output dir
robot --variable BASE_URL:https://staging.example.com tests/  # override variable
robot --loglevel DEBUG tests/        # verbose logging
```

## Discovery & test generation workflow

1. Run `./discover.sh https://your-app.com` to scan the target UI
2. Review `discovery-output/ui-discovery.json` for all selectors and forms
3. Map discovered `data-test-id` attributes to Robot variables or use directly as `css:` selectors
4. Create keywords in `resources/keywords.robot` for each page interaction
5. Write test cases in `tests/` using those keywords
6. Use `[Tags]` for categorization: `smoke`, `regression`, `critical`

## Generating tests from discovery report

Given a discovery report with forms and buttons, generate Robot tests like:

```robot
*** Test Cases ***
# For each form found in discovery:
Submit ${form.id} Form
    [Tags]    regression
    Navigate To    ${page_path}
    # For each field in form.fields:
    Input Text    css:${field.selector}    test-value
    Click Button    css:button[type="submit"]
    Wait Until Page Contains Element    css:.success    timeout=10s

# For each button found in discovery:
Click ${button.text} Button
    [Tags]    smoke
    Navigate To    ${page_path}
    Click Element    css:${button.selector}
    # Verify expected outcome
```

## Rules

- One `.robot` file per feature area (login, dashboard, settings, etc.)
- Reusable interactions go in `resources/keywords.robot`
- Page-specific keywords can go in `resources/{page}_keywords.robot`
- Use `[Tags]` on every test case
- Use `[Documentation]` for complex test cases
- Variables in `${UPPER_CASE}`, keywords in `Title Case`
- Timeouts: always explicit, never rely on implicit waits
- Keep selectors using `css:` prefix with `data-test-id` attributes
