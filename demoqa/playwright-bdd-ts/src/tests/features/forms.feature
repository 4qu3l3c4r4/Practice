Feature: Forms in DemoQA

  @forms @smoke @regression
  Scenario: Submit form with valid data
    Given I am on the DemoQA practice form page
    When I fill all required fields with valid data
    And I submit the form
    Then I should see a confirmation modal with the submitted data

  @forms @negative
  Scenario: Try to submit form with required fields empty
    Given I am on the DemoQA practice form page
    When I try to submit the form without filling the required fields
    Then the required fields should be marked as invalid

