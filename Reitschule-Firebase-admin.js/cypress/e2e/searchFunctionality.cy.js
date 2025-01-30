describe("Test Search Functionality", () => {
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

  it("should filter horses based on search input", () => {});
  it('should show "No results found" for non-matching search', () => {});
  it("should clear search results when input is cleared", () => {});
});
