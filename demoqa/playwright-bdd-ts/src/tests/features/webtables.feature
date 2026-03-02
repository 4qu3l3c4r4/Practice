Feature: Web Tables in DemoQA

  @tables @smoke @regression
  Scenario: Add and remove a record
    Given I am on the DemoQA web tables page
    When I add a new valid record
    Then the table should contain the email of the new record
    When I remove the record by email
    Then the email should no longer appear in the table

  @tables @negative
  Scenario: Try to create a record without email
    Given I am on the DemoQA web tables page
    When I try to add a record without email
    Then the email field should be marked as invalid

