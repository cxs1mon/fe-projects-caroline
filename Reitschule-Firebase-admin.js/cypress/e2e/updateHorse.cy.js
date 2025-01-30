describe("Update Horse Tests", () => {
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
  it("should allow editing existing horse details", () => {});
  it("should save updated horse information", () => {});
  it("should show validation errors when updating with invalid data", () => {});
});
