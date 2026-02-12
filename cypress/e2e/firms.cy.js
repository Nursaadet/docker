describe("Firm Create Flow", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173/")
    cy.login()
    cy.visit("http://localhost:5173/stock/firms")
  })

  it("Modal açılır, form doldurulur ve kapanır", () => {

    // API mock
    cy.intercept("POST", "**/firms", {
      statusCode: 201,
      body: {
        id: 999,
        name: "Apple",
        phone: "123456",
        address: "USA",
        image: "https://apple.com/logo.png"
      }
    }).as("addFirm")

    // Modal aç (sayfandaki butonun data-cy’sine göre değiştir)
    cy.get('[data-cy="new-firm-btn"]').click()

    // Modal görünür mü?
    cy.get('[data-cy="firm-modal"]').should("exist")

    // Form doldur
    cy.get('[data-cy="firm-name-input"]').type("Apple")
    cy.get('[data-cy="firm-phone-input"]').type("123456")
    cy.get('[data-cy="firm-address-input"]').type("USA")
    cy.get('[data-cy="firm-image-input"]').type("https://apple.com/logo.png")

    // Submit
    cy.get('[data-cy="firm-submit-btn"]').click()

    // API çağrısı atıldı mı?
    cy.wait("@addFirm")
      .its("response.statusCode")
      .should("eq", 201)

    // Modal kapandı mı?
    cy.get('[data-cy="firm-modal"]').should("not.exist")
  })
})
