Feature: Smoke Tests

Background:
  * url baseUrl

@smoke
Scenario: API health check
  Given path '/api/health'
  When method get
  Then status 200

@smoke @ui
Scenario: Login page loads
  * configure driver = { type: 'chrome', headless: true }
  * driver baseUrl
  * match driver.title != null