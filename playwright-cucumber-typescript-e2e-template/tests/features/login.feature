Feature: Login
  As a user
  I want to login to the application
  So that I can access protected features

  Scenario: Successful login
    Given I am on the login page
    When I enter valid credentials
    Then I should be logged in successfully