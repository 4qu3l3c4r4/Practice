Feature: Smoke Tests

  @smoke
  Scenario: Login page is accessible
    Given I open the login page
    Then I should see the login form

  @smoke
  Scenario: User can log in with valid credentials
    Given I open the login page
    When I log in with valid credentials
    Then I should be redirected away from the login page

  @smoke
  Scenario: Authenticated user can access the main page
    Given I am logged in
    When I navigate to the main page
    Then I should see the main content area