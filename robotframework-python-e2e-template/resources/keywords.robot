*** Settings ***
Library    SeleniumLibrary
Variables  ../variables/env.py
Variables  ../variables/vars.robot

*** Keywords ***
Open Browser To Login Page
    ${options}=    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver
    Run Keyword If    ${HEADLESS}    Call Method    ${options}    add_argument    --headless
    Create Webdriver    Chrome    options=${options}
    Go To    ${BASE_URL}
    Maximize Browser Window

Login With Valid Credentials
    Input Text    css:input[name="username"], input[type="email"]    ${UI_USERNAME}
    Input Text    css:input[name="password"]    ${UI_PASSWORD}
    Click Button    css:button[type="submit"], input[type="submit"]