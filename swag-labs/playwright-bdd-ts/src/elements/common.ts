// Selectors centralizados para o Swag Labs (SauceDemo)
// Mantemos todos os seletores aqui para facilitar manutenção e auto-healing.

export const selectors = {
  login: {
    usernameInput: '#user-name',
    passwordInput: '#password',
    submitButton: '#login-button',
    errorContainer: '[data-test="error"]',
  },
  inventory: {
    inventoryContainer: '#inventory_container',
    inventoryItem: '.inventory_item',
    headerTitle: '.title',
    cartIcon: '.shopping_cart_link',
    itemName: '.inventory_item_name',
    itemPrice: '.inventory_item_price',
    addToCartBackpackButton: '[data-test="add-to-cart-sauce-labs-backpack"]',
  },
  cart: {
    cartBadge: '.shopping_cart_badge',
    cartItem: '.cart_item',
    checkoutButton: '[data-test="checkout"]',
  },
  checkoutInformation: {
    firstNameInput: '[data-test="firstName"]',
    lastNameInput: '[data-test="lastName"]',
    postalCodeInput: '[data-test="postalCode"]',
    continueButton: '[data-test="continue"]',
    errorContainer: '[data-test="error"]',
  },
  checkoutOverview: {
    summarySubtotal: '.summary_subtotal_label',
    summaryTax: '.summary_tax_label',
    summaryTotal: '.summary_total_label',
    finishButton: '[data-test="finish"]',
  },
  checkoutComplete: {
    completeHeader: '.complete-header',
    backHomeButton: '[data-test="back-to-products"]',
  },
};

