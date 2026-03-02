Feature: Core features in The Internet

  @checkboxes @regression
  Scenario: Toggle first checkbox
    Given I am on The Internet checkboxes page
    When I toggle the first checkbox
    Then the first checkbox should be checked

  @dropdown @regression
  Scenario: Select option in dropdown
    Given I am on The Internet dropdown page
    When I select the option "Option 2"
    Then the dropdown should display "Option 2"

  @dynamic @smoke @regression
  Scenario: Dynamic loading shows Hello World
    Given I am on The Internet dynamic loading page
    When I start the loading
    Then I should see the text "Hello World!"

  @dragdrop @regression
  Scenario: Drag column A to B
    Given I am on The Internet drag and drop page
    When I drag column A to column B
    Then the columns should swap positions

  @upload @regression
  Scenario: Successful file upload
    Given I am on The Internet upload page
    When I upload a sample file
    Then the uploaded file name should be displayed

  @editor @regression
  Scenario: Edit text in the WYSIWYG editor
    Given I am on The Internet editor page
    When I fill the editor with "Test text"
    Then the editor should contain "Test text"

  @hovers @edge
  Scenario: Show caption on hover
    Given I am on The Internet hovers page
    When I hover over the first image
    Then I should see the caption visible

