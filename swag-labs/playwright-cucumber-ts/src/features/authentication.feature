Feature: Authentication in Swag Labs (Cucumber)

  @login @smoke @regression
  Scenario: Successful login with valid credentials
    Given I am on the Swag Labs login page
    When I log in with valid credentials
    Then I should be redirected to the inventory page

  @login @negative @regression
  Scenario: Login fails with invalid password
    Given I am on the Swag Labs login page
    When I try to log in with an invalid password
    Then I should see an error message saying the credentials are invalid

  @login @negative @edge
  Scenario: Login fails with empty fields
    Given I am on the Swag Labs login page
    When I try to log in without filling username and password
    Then I should see an error message saying the username is required

