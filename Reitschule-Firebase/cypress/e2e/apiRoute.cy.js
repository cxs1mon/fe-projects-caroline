describe("Test API Routes directly", () => {
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
    // Maik aus der Fixture-Datei hinzufügen
    cy.request("POST", "http://localhost:8080/admin/add", horseData.horses[1]);
    cy.visit("http://localhost:8080/admin");
  });

  it("should successfully fetch all horses from API", () => {
    // Schauen ob Daten von der DB korrekt geladen wurden
    cy.get("table").should("contain", `${horseData.horses[1].name}`);
  });

  it("should create new horse via API", () => {
    // Zweites Pferd aus der fixture Datei laden
    cy.request("POST", "http://localhost:8080/admin/add", horseData.horses[0]);
    // Seite neu laden
    cy.reload();
    // Schauen obs in der Tabelle existiert
    cy.get("table").should("contain", horseData.horses[0].name);
  });

  it("should update horse via API", () => {
    // Form holen mit der Action "/api/edit/"
    cy.get('form[action^="/admin/edit/"]')
      .should("exist")
      .first()
      .then((form) => {
        // Holt die gesamte actionUrl
        const actionUrl = form.attr("action");
        // Holt das letze Element nach dem spliten
        const horseId = actionUrl.split("/").pop();

        // Dummy Horse-Daten fürs Update
        const dummyData = {
          id: `${horseId}`,
          name: "Updated Mike",
          birthyear: horseData.horses[1].birthyear,
          color: horseData.horses[1].color,
          breed: horseData.horses[1].breed,
          text: horseData.horses[1].text,
        };

        // POST Request auf /api/edit/id
        cy.request({
          method: "POST",
          url: `/admin/edit/${dummyData.id}`,
          // dummy Daten als body zum updaten
          body: dummyData,
          headers: {
            "Content-Type": "application/json",
          },
        });
        // Seite neuladen
        cy.reload();
        // Prüfen ob Update funktioniert hat
        cy.get("table").should("contain", "Updated Mike");
      });
  });

  it("should delete a horse via API", () => {
    // Daten holen
    cy.get("table").should("contain", horseData.horses[1].name);
    // Form holen mit der Action "/api/edit/"
    cy.get('form[action^="/admin/edit/"]')
      .should("exist")
      .first()
      .then((form) => {
        // Holt die gesamte actionUrl
        const actionUrl = form.attr("action");
        // Holt das letze Element nach dem spliten
        const horseId = actionUrl.split("/").pop();
        // POST request zum löschen
        cy.request("POST", `http://localhost:8080/admin/delete/${horseId}`);
        //seite laden
        cy.reload();
        // prüfen, dass es das Pferd nichtmehr gibt
        cy.get("table").should("not.contain", horseData.horses[1].name);
      });

    it("should delete all horses via API", () => {
      // POST request zum alle löschen
      cy.request("POST", "http://localhost:8080/admin/delete-all");
      cy.visit("http://localhost:8080/admin");
      // prüfen, dass es das Pferd nichtmehr gibt
      cy.get("table").should("not.contain", horseData.horses[1].name);
    });
  });
});
