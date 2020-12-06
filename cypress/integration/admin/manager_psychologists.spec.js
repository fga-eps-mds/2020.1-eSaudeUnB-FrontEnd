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

    it("should return error when fields are empty", () => {
      cy.get('.new-psychologist').click();
      cy.get('.button').click();

      cy.get('.fade').contains('Os campos não foram preenchidos corretamente');
    });

    it("should create an professional", () => {
      cy.get('.new-psychologist').click();
      cy.get(':nth-child(1) > input').type('user');
      cy.get(':nth-child(3) > input').type('surname');
      cy.get('.gender_selection').select('Masculino');
      cy.get('[name="bond"]').select('Psicólogo');
      cy.get(':nth-child(8) > input').type('user@esaude.com');
      cy.get(':nth-child(10) > input').type('Clínica');

      cy.route('GET', '**psychologists', 'fixture:psychologist_list_add');

      cy.route({
        method: 'POST',
        url: '**/psychologist',
        status: 201,
        response: {
          "_id":"5fcc900e9cbfe53a70867381",
          "name":"test",
          "lastName":"adfas",
          "email":"test2@esaude.com",
          "gender":"M",
          "bond":"Psicologo",
          "password":"XKkXnKer",
          "ForgetPassword":false,
          "phone":"",
          "specialization":"clinica",
          "biography":"",
          "weekDay":[],
          "restrict":[]
        },
      });

      cy.get('.button').click();
      cy.get('.psychologists-cards article').should('have.length', 6);
    });

    it("should remove an professional", () => {
      cy.route('DELETE', '**psychologist/**', {});
      cy.route('GET', '**psychologists*', 'fixture:psychologist_list_remove');

      cy.get('.psychologists-cards > :nth-child(1) > button').click();
      cy.get('.success-button').click();
      cy.get('.psychologists-cards article').should('have.length', 4);
    });
});