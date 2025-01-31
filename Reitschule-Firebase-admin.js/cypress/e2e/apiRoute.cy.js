describe("Test API Routes directly", () => {
  beforeEach(() => {
    // Alle Pferde löschen
    cy.request("POST", "http://localhost:8383/api/delete-all");
    // Maik aus der Fixture-Datei hinzufügen
    cy.fixture("example.json").then((horseData) => {
      cy.request("POST", "http://localhost:8383/api/add", horseData.horses[1]);
    });
    cy.visit("http://localhost:8383/");
  });

  it("should successfully fetch all horses from API", () => {
    // Schauen ob Daten von der DB korrekt geladen wurden
    cy.fixture("example.json").then((horseData) => {
      cy.get("table").should("contain", `${horseData.horses[1].name}`);
    });
  });

  it("should create new horse via API", () => {
    // Zweites Pferd aus der fixture Datei laden
    cy.fixture("example.json").then((horseData) => {
      cy.request("POST", "http://localhost:8383/api/add", horseData.horses[0]);
    });
    // Seite neu laden
    cy.reload();
    // Schauen obs in der Tabelle existiert
    cy.fixture("example.json").then((horseData) => {
      cy.get("table").should("contain", horseData.horses[0].name);
    });
  });

  it("should update horse via API", () => {
    // Form holen mit der Action "/api/edit/"
    cy.get('form[action^="/api/edit/"]')
      .should("exist")
      .first()
      .then((form) => {
        // Holt die gesamte actionUrl
        const actionUrl = form.attr("action");
        // Holt das letze Element nach dem spliten
        const horseId = actionUrl.split("/").pop();

        // Dummy Horse-Daten fürs Update
        cy.fixture("example.json").then((horseData) => {
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
            url: `/api/edit/${dummyData.id}`,
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
  });

  it("should delete a horse via API", () => {
    // Daten holen
    cy.fixture("example.json").then((horseData) => {
      cy.get("table").should("contain", horseData.horses[1].name);
      // Form holen mit der Action "/api/edit/"
      cy.get('form[action^="/api/edit/"]')
        .should("exist")
        .first()
        .then((form) => {
          // Holt die gesamte actionUrl
          const actionUrl = form.attr("action");
          // Holt das letze Element nach dem spliten
          const horseId = actionUrl.split("/").pop();
          // POST request zum löschen
          cy.request("POST", `http://localhost:8383/api/delete/${horseId}`);
          //seite laden
          cy.reload();
          // prüfen, dass es das Pferd nichtmehr gibt
          cy.get("table").should("not.contain", horseData.horses[1].name);
        });
    });

    it("should delete all horses via API", () => {
      // POST request zum alle löschen
      cy.request("POST", "http://localhost:8383/api/delete-all");
      cy.visit("http://localhost:8383/");
      // prüfen, dass es das Pferd nichtmehr gibt
      cy.get("table").should("not.contain", horseData.horses[1].name);
    });
  });
});
