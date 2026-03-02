Feature: Frames, Modals, Tooltips, DatePicker and Slider in DemoQA

  @frames @smoke @regression
  Scenario: Read text inside the frame
    Given I am on the DemoQA frames page
    Then I should see the text "This is a sample page" inside the frame

  @modals @regression
  Scenario: Open and close a small modal
    Given I am on the DemoQA modal dialogs page
    When I open the small modal
    Then I should see the small modal visible
    When I close the small modal
    Then the small modal should not be visible

  @tooltips @edge
  Scenario: Tooltip appears when hovering
    Given I am on the DemoQA tool tips page
    When I hover over the tooltip button
    Then I should see the tooltip visible

  @datepicker @regression
  Scenario: Fill date picker via input
    Given I am on the DemoQA date picker page
    When I fill the date with "03/02/2026"
    Then the date field should contain "03/02/2026"

  @slider @regression
  Scenario: Adjust slider to a specific value
    Given I am on the DemoQA slider page
    When I set the slider to 50
    Then the slider value should be 50

