describe("Test API Routes", () => {
  beforeEach(() => {
    // Alle Pferde löschen
    cy.request("POST", "http://localhost:8383/api/delete-all");

    // Pferde aus der Fixture-Datei hinzufügen
    cy.fixture("example.json").then((horseData) => {
      cy.request("POST", "http://localhost:8383/api/add", horseData.horses[0]);
      cy.request("POST", "http://localhost:8383/api/add", horseData.horses[1]);
    });

    cy.visit("http://localhost:8383/");
  });

  it("should successfully fetch all horses from API", () => {});
  it("should create new horse via API", () => {});
  it("should update horse via API", () => {});
  it("should delete horse via API", () => {});
});
