*** Settings ***
Library    SeleniumLibrary
Library    Collections

*** Keywords ***
Resilient Find Element
    [Documentation]    Self-healing locator: tries data-test-id → id → css → xpath
    [Arguments]    ${test_id}=${EMPTY}    ${id}=${EMPTY}    ${css}=${EMPTY}    ${xpath}=${EMPTY}    ${timeout}=10s
    Run Keyword If    '${test_id}' != '${EMPTY}'    Run Keyword And Return If True
    ...    Resilient Try Locator    css:[data-test-id="${test_id}"]    ${timeout}
    Run Keyword If    '${id}' != '${EMPTY}'    Run Keyword And Return If True
    ...    Resilient Try Locator    id:${id}    ${timeout}
    Run Keyword If    '${css}' != '${EMPTY}'    Run Keyword And Return If True
    ...    Resilient Try Locator    css:${css}    ${timeout}
    Run Keyword If    '${xpath}' != '${EMPTY}'    Run Keyword And Return If True
    ...    Resilient Try Locator    xpath:${xpath}    ${timeout}
    Fail    Resilient Find Element: all strategies failed

Resilient Try Locator
    [Arguments]    ${locator}    ${timeout}=5s
    ${status}=    Run Keyword And Return Status
    ...    Wait Until Element Is Visible    ${locator}    timeout=${timeout}
    [Return]    ${status}

Resilient Click
    [Documentation]    Click with retry — handles stale elements
    [Arguments]    ${locator}    ${retries}=3    ${delay}=1s
    FOR    ${i}    IN RANGE    ${retries}
        ${status}=    Run Keyword And Return Status    Click Element    ${locator}
        Return From Keyword If    ${status}
        Sleep    ${delay}
    END
    Fail    Resilient Click failed after ${retries} attempts on ${locator}

Resilient Input Text
    [Documentation]    Input text with retry — handles stale elements
    [Arguments]    ${locator}    ${text}    ${retries}=3    ${delay}=1s
    FOR    ${i}    IN RANGE    ${retries}
        ${status}=    Run Keyword And Return Status
        ...    Run Keywords    Clear Element Text    ${locator}    AND    Input Text    ${locator}    ${text}
        Return From Keyword If    ${status}
        Sleep    ${delay}
    END
    Fail    Resilient Input Text failed after ${retries} attempts on ${locator}
