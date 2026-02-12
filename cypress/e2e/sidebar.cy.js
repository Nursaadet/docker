describe("Sidebar Navigation Test", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.viewport(1280, 720);
    cy.login();
  });

  const menus = [
    { name: "dashboard", url: "/stock" },
    { name: "purchase", url: "/stock/purchases" },
    { name: "sales", url: "/stock/sales" },
    { name: "products", url: "/stock/products" },
    { name: "firms", url: "/stock/firms" },
    { name: "brands", url: "/stock/brands" },
  ];

  menus.forEach((menu) => {
    it(`${menu.name} sayfasına gider`, () => {
      cy.goToMenu(menu.name, menu.url);
    });
  });

});
