describe("Test Search Functionality", () => {
  // Fixture einmal laden und die Daten speichern
  let horseData;
  before(() => {
    cy.fixture("example.json").then((data) => {
      horseData = data;
    });
  });
  beforeEach(() => {
    // Alle Pferde löschen
    cy.request("POST", "http://localhost:8080/adm/delete-all");

    // Pferde aus der Fixture-Datei hinzufügen
    cy.request("POST", "http://localhost:8080/adm/add", horseData.horses[0]);
    cy.request("POST", "http://localhost:8080/adm/add", horseData.horses[1]);

    cy.visit("http://localhost:8080/adm");
  });

  it("should filter horses based on search input", () => {
    // Prüfen ob die Tabelle 2 einträge + heading hat
    cy.get("table").find("tr").should("have.length", 2+1);
    // nach Rosi suchen
    cy.get("#searchText").type("Rosi");
    cy.get(".search-btn").click();
    // Prüfen dass Rosi angezeigt wird und Mike nicht
    cy.get("table").should("contain", "Rosi").and("not.contain", "Maik");
  });

  it("should clear search results when input is cleared", () => {
     // Prüfen ob die Tabelle 2 einträge + heading hat
     cy.get("table").find("tr").should("have.length", 2+1);
     // nach Rosi suchen
     cy.get("#searchText").type("Rosi");
     cy.get(".search-btn").click();
     // Prüfen dass Rosi angezeigt wird und Mike nicht
     cy.get("table").should("contain", "Rosi").and("not.contain", "Maik");
     // Button zum alle anzeigen klicken
     cy.get("#reset-filter").click();
     // Prüfen, dass wieder beide angezeigt werden
     cy.get("table").should("contain", "Rosi").and("contain", "Maik");
  });
});
