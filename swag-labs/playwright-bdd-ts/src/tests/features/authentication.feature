Feature: Authentication in Swag Labs

  # Basic authentication scenarios. These are the foundation for
  # business flows such as cart and checkout.

  @login @smoke @regression
  Scenario: Successful login with valid credentials
    Given I am on the Swag Labs login page
    When I log in with valid credentials
    Then I should see the products list on the inventory page

  @login @negative @regression
  Scenario: Login fails with invalid password
    Given I am on the Swag Labs login page
    When I try to log in with a valid user and invalid password
    Then I should see an error message saying the credentials are invalid

  @login @negative
  Scenario: Login fails for locked out user
    Given I am on the Swag Labs login page
    When I try to log in with a locked out user
    Then I should see a message indicating the user is locked out

  @login @edge @negative
  Scenario: Login with empty fields
    Given I am on the Swag Labs login page
    When I try to log in without filling username and password
    Then I should see an error message saying the username is required

