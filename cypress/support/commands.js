// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
    cy.url().should("include", "/");
    cy.get('[data-test="loginHeader"]').should("be.visible").contains("Login");
    cy.get('[data-test="loginEmail"]').should("be.visible").type("admin@site.com")
    cy.get('[data-test="loginPassword"]').should("be.visible").type("aA?123456")
    cy.get('[data-test="loginSubmit"]').should("be.visible").click({force: true})
    cy.url().should("include", "/stock");
  });

Cypress.Commands.add("goToMenu", (menuName, expectedUrl) => {
  cy.get(`[data-test="menu-${menuName}"]`).click()
  cy.url().should("include", expectedUrl)
})
