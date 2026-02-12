describe("Sale Create Flow", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173/")
    cy.login()
    cy.visit("http://localhost:5173/stock/sales")
  })

  it("Modal açılır, form doldurulur ve kapanır", () => {

    // POST mock
    cy.intercept("POST", "**/sales", {
      statusCode: 201,
      body: {
        id: 1,
        brand_id: 1,
        product_id: 1,
        quantity: 5,
        price: 200
      }
    }).as("addSale")

    // Modal aç
    cy.get('[data-cy="new-sale-btn"]').click()

    // Modal var mı?
    cy.get('[data-cy="sale-modal"]').should("exist")

    // Brand seç (MUI portal)
    cy.get('[data-cy="brand-select"]').click()
    cy.get("li[role='option']").eq(1).click()

    // Product seç
    cy.get('[data-cy="product-select"]').click()
    cy.get("li[role='option']").eq(1).click()

    // Quantity
    cy.get('[data-cy="quantity-input"]').type("5")

    // Price
    cy.get('[data-cy="price-input"]').type("200")

    // Submit
    cy.get('[data-cy="sale-submit-btn"]').click()

    // API kontrol
    cy.wait("@addSale")
      .its("response.statusCode")
      .should("eq", 201)

    // Modal kapandı mı?
    cy.get('[data-cy="sale-modal"]').should("not.exist")
  })
})
