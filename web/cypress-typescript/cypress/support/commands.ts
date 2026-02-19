declare global {
  namespace Cypress {
    interface Chainable {
      login(username?: string, password?: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', (username?: string, password?: string) => {
  const user = username || Cypress.env('UI_USERNAME') || 'test@example.com';
  const pass = password || Cypress.env('UI_PASSWORD') || 'password123';
  
  cy.get('input[name="username"], input#username, input[type="email"]').type(user);
  cy.get('input[name="password"], input#password').type(pass);
  cy.get('button[type="submit"], input[type="submit"]').click();
});

export {};