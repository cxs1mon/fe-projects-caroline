describe("Add Horse Tests", () => {
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

    cy.visit("http://localhost:8080/admin");
  });

  it("should display the add horse form", () => {
    // Summary öffnen
    cy.get("summary").click();
    // Anzahl inputfelder überprüfen
    cy.get("#myForm").find("input").should("have.length", 5);
  });

  it("should successfully add a new horse", () => {
    // Summary öffnen

    cy.get("summary").click();

    // Daten holen
    // Innerhablb des Forms Daten einfügen
    cy.get("#myForm").within(() => {
      Object.keys(horseData.horses[0]).forEach((key) => {
        cy.get(`#${key}`).type(horseData.horses[0][key]);
      });
    });
    // Form abschicken
    cy.get("#form-submit").click();
    // Seite neu laden
    cy.reload();
    // Prüfen ob das Pferd existiert
    cy.get("table").should("contain", "Rosi");
  });

  it("should show validation errors for empty fields", () => {
    // Summary öffnen
    cy.get("summary").click();
    // Input Felder leer lassen
    cy.get("#form-submit").click();
    // Überprüfen, ob ein Alert angezeigt wird
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.include("Error while adding a horse.");
    });
  });
});
