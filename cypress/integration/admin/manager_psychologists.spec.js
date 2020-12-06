describe('Admin Register an Professional', () => {
    beforeEach(() => {
      cy.loginAdmin('psychologist_render');
      cy.server();
    });

    it("should render 5 psychologist", () => {
      cy.get('.psychologists-cards article').should('have.length', 5);
    });

    it("should filter psychologists and rest only one", () => {
      cy.get('.search-psychologists input').type('test2');
      cy.get('img').click();

      cy.get('.psychologists-cards article').should('have.length', 1);
    });

    it("should logout admin when click at Logout button", () => {
      cy.get('.psychologists-cards article').should('have.length', 5);

      cy.get('.get-out').click();
      cy.get('.pageTitle').contains('Login de Administrador');
    });
});