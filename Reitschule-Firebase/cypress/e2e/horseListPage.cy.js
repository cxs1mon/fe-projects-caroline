describe("Horse List Page Tests", () => {
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

  it("should display the horse list page", () => {
    cy.get("table").should("exist");
  });

  it("should show all horses from the database", () => {
    cy.get("table").should("contain", "Rosi").and("contain", "Maik");
  });

  it('should display "No horses found" when database is empty', () => {});
});
