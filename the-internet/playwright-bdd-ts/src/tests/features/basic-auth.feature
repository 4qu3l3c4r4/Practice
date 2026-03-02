Feature: Basic authentication in The Internet

  @auth @smoke @regression
  Scenario: Access /basic_auth with valid credentials
    Given I access the basic auth page with valid credentials
    Then I should see the successful authentication message

