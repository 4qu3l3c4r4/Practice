Feature: Advanced features in The Internet

  @alerts @regression
  Scenario: Interact with JavaScript alerts
    Given I am on The Internet JavaScript alerts page
    When I accept the simple alert
    And I cancel the confirm
    And I fill the prompt with "QA"
    Then the result should indicate the actions performed

  @scroll @edge
  Scenario: Infinite scroll loads more content
    Given I am on The Internet infinite scroll page
    When I scroll until at least 5 paragraphs are loaded
    Then the page should contain at least 5 paragraphs

  @windows @regression
  Scenario: Open a new window
    Given I am on The Internet multiple windows page
    When I open a new window
    Then I should see the text "New Window" in the new window

