Feature: Alerts in DemoQA

  @alerts @smoke @regression
  Scenario: Accept a simple alert
    Given I am on the DemoQA alerts page
    When I open and accept a simple alert
    Then the page should remain usable

  @alerts @negative
  Scenario: Dismissing confirm should show Cancel
    Given I am on the DemoQA alerts page
    When I open a confirm and click cancel
    Then I should see a result containing "Cancel"

  @alerts @edge
  Scenario: Prompt text should appear in the result
    Given I am on the DemoQA alerts page
    When I open a prompt and enter "QA Text"
    Then I should see a result containing "QA Text"

