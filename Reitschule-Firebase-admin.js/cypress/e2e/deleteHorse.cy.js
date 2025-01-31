describe("Delete Horse Tests", () => {
  // Fixture einmal laden und die Daten speichern
  let horseData;
  before(() => {
    cy.fixture("example.json").then((data) => {
      horseData = data;
    });
  });

  beforeEach(() => {
    // Alle Pferde löschen
    cy.request("POST", "http://localhost:8383/api/delete-all");

    // Pferde aus der Fixture-Datei hinzufügen
    cy.request("POST", "http://localhost:8383/api/add", horseData.horses[0]);

    cy.visit("http://localhost:8383/");
  });

  it("should successfully delete a horse", () => {
    cy.get("table").should("contain", horseData.horses[0].name);
    cy.get(".delete-btn").click();
    cy.reload();
    cy.get("table").should("not.contain", horseData.horses[0].name);
  });
});
