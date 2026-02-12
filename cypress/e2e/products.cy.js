describe("Product Create Flow", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173/")
    cy.login()
    cy.visit("http://localhost:5173/stock/products")
  })

  it("Modal açılır, form doldurulur ve kapanır", () => {

    // POST mock
    cy.intercept("POST", "**/products", {
      statusCode: 201,
      body: {
        id: 1,
        name: "iPhone",
        category_id: 1,
        brand_id: 1
      }
    }).as("addProduct")

    // Modal aç
    cy.get('[data-cy="new-product-btn"]').click()

    // Modal var mı?
    cy.get('[data-cy="product-modal"]').should("exist")

    // Category seç
    cy.get('[data-cy="category-select"]').click()
    cy.get("li[role='option']").first().click()

    // Brand seç
    cy.get('[data-cy="brand-select"]').click()
    cy.get("li[role='option']").first().click()

    // Product name
    cy.get('[data-cy="product-name-input"]').type("iPhone")

    // Submit
    cy.get('[data-cy="product-submit-btn"]').click()

    // API kontrol
    cy.wait("@addProduct")
      .its("response.statusCode")
      .should("eq", 201)

    // Modal kapandı mı?
    cy.get('[data-cy="product-modal"]').should("not.exist")
  })
})
