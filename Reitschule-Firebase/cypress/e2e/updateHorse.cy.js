describe("Update Horse Tests", () => {
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
    cy.request("POST", "http://localhost:8080/admin/add", horseData.horses[0]);
    cy.visit("http://localhost:8080/admin");
  });

  it("should allow editing existing horse details", () => {
    // Edit Seite öffnen
    cy.get("table").get(".edit-btn").first().click();
    // Textfeld leeren und neuen Text eingeben
    cy.get("#text").clear().type(`Edited horse`);
    // Prüfen dass der eingegebene Text auch im Feld ist
    cy.get("#text").should("have.value", "Edited horse");
  });

  it("should save updated horse information", () => {
    // Edit Seite öffnen
    cy.get("table").get(".edit-btn").first().click();
    // Textfeld leeren und neuen Text eingeben
    cy.get("#text").clear().type(`Edited horse`);
    // Update Form abschicken
    cy.get("#form-edit-submit").click();
    // Püfen ob Tabelle "Edit horse" Text enthält
    cy.get("table").should("contain", "Edited horse");
  });

  it("should show validation errors when updating with invalid data", () => {
    // Edit Seite öffnen
    cy.get("table").get(".edit-btn").first().click();
    // Textfeld leeren
    cy.get("#text").clear();
    // Update Form abschicken
    cy.get("#form-edit-submit").click();
    // Peüfen ob alert angezeigt wird
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.include("Error while adding a horse.");
    });
  });
});
