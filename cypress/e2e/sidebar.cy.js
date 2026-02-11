describe("Sidebar test", () => {
  beforeEach(() => {
        cy.visit("http://localhost:5173/");
        cy.viewport(1280, 720);
  })

  it("Purchase sayfasına gider", () => {
    cy.goToMenu("purchase", "/stock/purchases")
  })

  it("Sales sayfasına gider", () => {
    cy.goToMenu("sales", "/stock/sales")
  })

  it("Products sayfasına gider", () => {
    cy.goToMenu("products", "/stock/products")
  })
})
