Feature: Checkout in Swag Labs

  # Critical business flows: add product to cart and complete checkout.

  @e2e @smoke @regression
  Scenario: Customer successfully buys a backpack
    Given I am authenticated in Swag Labs
    And I am on the products list
    When I add the backpack to the cart
    And I open the cart
    And I start checkout with valid data
    Then the order should be completed successfully
    And I should see the order totals summary

  @e2e @negative
  Scenario: Checkout fails when first name is blank
    Given I am authenticated in Swag Labs
    And I am on the products list
    When I add the backpack to the cart
    And I open the cart
    And I try to start checkout without filling the first name
    Then I should see an error message saying the first name is required

