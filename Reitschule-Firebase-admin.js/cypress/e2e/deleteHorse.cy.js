describe("Delete Horse Tests", () => {
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
  it("should show delete confirmation dialog", () => {});
  it("should successfully delete a horse", () => {});
  it("should update the list after deletion", () => {});
});
