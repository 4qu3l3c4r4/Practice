Feature: API Health Check

@api
Scenario: Health endpoint returns 200
  Given url baseUrl
  And path '/api/health'
  When method get
  Then status 200