Feature: Upload and Download in DemoQA

  @files @smoke @regression
  Scenario: Successful file upload
    Given I am on the DemoQA upload and download page
    When I upload a sample file
    Then I should see the uploaded file path

  @files @edge
  Scenario: File download triggers a download event
    Given I am on the DemoQA upload and download page
    When I download the file
    Then the download should have a suggested filename

