describe("dashboard test", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/");
        cy.viewport(1280, 720);
    })
  it("dashboard", () => {
    cy.login()
    cy.get('[data-test="logoutButton"]').should("be.visible")
    
  });
});