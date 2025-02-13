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
    cy.request("POST", "http://localhost:8080/admin/delete-all");

    // Pferde aus der Fixture-Datei hinzufügen
    cy.request("POST", "http://localhost:8080/admin/add", horseData.horses[0]);
    cy.request("POST", "http://localhost:8080/admin/add", horseData.horses[1]);

    cy.visit("http://localhost:8080/admin");
  });

  it("should successfully delete a horse", () => {
    cy.get("table").should("contain", horseData.horses[0].name);
    cy.contains(horseData.horses[0].name).parent().find(".delete-btn").click();
    cy.get("table").should("not.contain", horseData.horses[0].name);
  });

  it("should successfully delete all horses", () => {
    cy.get("table").should("contain", horseData.horses[0].name);
    cy.get("table").should("contain", horseData.horses[1].name);
    cy.get(".delete-all-btn").click();
    cy.reload();
    cy.get("table").should("not.contain", horseData.horses[0].name);
    cy.get("table").should("not.contain", horseData.horses[1].name);
  });
});
