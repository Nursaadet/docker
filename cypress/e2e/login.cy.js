describe("login test", () => {
  it("login", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-test="loginHeader"]').should("be.visible").contains("Login");
    cy.get('[data-test="loginEmail"]').should("be.visible").type("admin@site.com")
    cy.get('[data-test="loginPassword"]').should("be.visible").type("aA?123456")
    cy.get('[data-test="loginSubmit"]').should("be.visible").click()
    cy.url().should("include", "/stock");
  });
});
