describe("Add Horse Tests", () => {
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

    it('should display the add horse form', () => {

    });

    it('should successfully add a new horse', () => {

    });

    it('should show validation errors for empty fields', () => {

    });

    it('should show success message after adding horse', () => {

    });

    
  
  });