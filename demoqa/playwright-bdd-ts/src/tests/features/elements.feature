Feature: Basic elements in DemoQA

  @elements @smoke @regression
  Scenario: Select Home checkbox and see result
    Given I am on the DemoQA checkboxes page
    When I select the Home checkbox
    Then I should see the result containing "home"

  @elements @regression
  Scenario: Select Yes radio and see message
    Given I am on the DemoQA radio buttons page
    When I select the Yes option
    Then I should see the text "Yes" as the result

  @elements @edge
  Scenario: Toggle radio between Yes and Impressive
    Given I am on the DemoQA radio buttons page
    When I select the Yes option
    And I select the Impressive option
    Then I should see the text "Impressive" as the result

  @elements @regression
  Scenario: Select option in the old-style dropdown
    Given I am on the DemoQA select menu page
    When I select "Purple" in the old-style dropdown
    Then the old-style dropdown should have "Purple" selected

