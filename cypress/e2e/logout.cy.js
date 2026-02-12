describe("Logout Flow", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173/")
    cy.login()
  })

  it("Kullanıcı logout olur ve login sayfasına döner", () => {

    cy.logout()

    // URL kontrol
    cy.location("pathname").should("not.include", "/stock")

    // Login header görünmeli
    cy.get('[data-test="loginHeader"]')
      .should("be.visible")
      .contains("Login")
  })

})
