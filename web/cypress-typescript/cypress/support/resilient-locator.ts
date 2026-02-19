/**
 * Self-healing selector: tries data-test-id → role → text → CSS fallback.
 */
Cypress.Commands.add('resilientGet', (selectors: {
  testId?: string;
  role?: string;
  text?: string;
  css?: string;
}, options?: Partial<Cypress.Loggable & Cypress.Timeoutable>) => {
  const timeout = options?.timeout ?? 5000;

  if (selectors.testId) {
    const sel = `[data-test-id="${selectors.testId}"]`;
    if (Cypress.$(sel).length) return cy.get(sel, { timeout });
  }
  if (selectors.role) {
    const found = Cypress.$(`[role="${selectors.role}"]`);
    if (found.length) return cy.get(`[role="${selectors.role}"]`, { timeout });
  }
  if (selectors.text) {
    return cy.contains(selectors.text, { timeout });
  }
  if (selectors.css) {
    return cy.get(selectors.css, { timeout });
  }

  throw new Error('resilientGet: no selectors matched');
});

declare global {
  namespace Cypress {
    interface Chainable {
      resilientGet(selectors: {
        testId?: string;
        role?: string;
        text?: string;
        css?: string;
      }, options?: Partial<Loggable & Timeoutable>): Chainable<JQuery<HTMLElement>>;
    }
  }
}
