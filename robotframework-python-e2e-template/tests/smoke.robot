*** Settings ***
Resource    ../resources/keywords.robot
Test Setup    Open Browser To Login Page
Test Teardown    Close Browser

*** Test Cases ***
Page Should Load
    [Tags]    smoke
    Page Should Contain Element    css:body

Login Fields Should Exist
    [Tags]    smoke
    Page Should Contain Element    css:input[name="username"], input[type="email"]
    Page Should Contain Element    css:input[name="password"]

Login Should Work
    [Tags]    smoke
    Login With Valid Credentials
    Wait Until Location Does Not Contain    login    timeout=10s