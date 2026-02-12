describe("Dashboard", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173/")
    cy.login()
  })

  it("Layout görünür", () => {
    cy.contains("Stock App").should("exist")
  })

})

