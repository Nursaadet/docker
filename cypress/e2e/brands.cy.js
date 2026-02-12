describe("Brand Create Flow", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173/")
    cy.login()
    cy.url().should("include", "/stock")

    cy.visit("http://localhost:5173/stock/brands/")
    cy.url().should("include", "/stock/brands")
  })

  it("Modal açılır, form doldurulur ve kapanır", () => {

    // 🔥 MOCK BURADA OLMALI (CLICK'TEN ÖNCE)
    cy.intercept("POST", "**/brands", {
      statusCode: 201,
      body: {
        id: 999,
        name: "Nike",
        image: "https://nike.com/logo.png"
      }
    }).as("addBrand")

    // Modal aç
    cy.get('[data-cy="new-brand-btn"]').click()

    // Modal görünür mü?
    cy.get('[data-cy="brand-modal"]').should("be.visible")

    // Form doldur
    cy.get('[data-cy="brand-name-input"]')
      .type("Nike")
      .should("have.value", "Nike")

    cy.get('[data-cy="brand-image-input"]')
      .type("https://nike.com/logo.png")

    // Submit
    cy.get('[data-cy="save-brand-btn"]').click()

    // Mock response kontrolü
    cy.wait("@addBrand")
      .its("response.statusCode")
      .should("eq", 201)

    // Modal kapandı mı?
    cy.get('[data-cy="brand-modal"]').should("not.exist")

  })
})
