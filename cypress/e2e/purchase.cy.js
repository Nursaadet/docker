describe("Purchase Create Flow", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173/")
    cy.login()
    cy.visit("http://localhost:5173/stock/purchases")
  })

  it("Modal açılır, form doldurulur ve kapanır", () => {

    // POST mock
    cy.intercept("POST", "**/purchases", {
      statusCode: 201,
      body: {
        id: 1,
        firm_id: 1,
        brand_id: 1,
        product_id: 1,
        quantity: 10,
        price: 100
      }
    }).as("addPurchase")

    // Modal aç (sayfadaki butona göre değiştir)
    cy.get('[data-cy="new-purchase-btn"]').click()

    // Modal var mı?
    cy.get('[data-cy="purchase-modal"]').should("exist")

    // 🔥 MUI SELECT NASIL SEÇİLİR?

    // Firm seç
    cy.get('[data-cy="firm-select"]').click()
    cy.get("li[role='option']").eq(1).click()

    // Brand seç
    cy.get('[data-cy="brand-select"]').click()
    cy.get("li[role='option']").eq(1).click()

    // Product seç
    cy.get('[data-cy="product-select"]').click()
    cy.get("li[role='option']").eq(1).click()

    // Quantity
    cy.get('[data-cy="quantity-input"]').type("10")

    // Price
    cy.get('[data-cy="price-input"]').type("100")

    // Submit
    cy.get('[data-cy="purchase-submit-btn"]').click()

    // API kontrol
    cy.wait("@addPurchase")
      .its("response.statusCode")
      .should("eq", 201)

    // Modal kapandı mı?
    cy.get('[data-cy="purchase-modal"]').should("not.exist")
  })
})
