describe("General Management User", () => {
    beforeEach(() => {
      cy.server();
      cy.loginProfessional();
    });
  
    it("should login an professional", () => {
      cy.visit('psychologist/events');
      cy.get('.closebtn').click();
      cy.get('.arrowOpen').click();
    });

    it("should return error min password in change password page", () => {
      cy.route({
          method: "PUT",
          url: "**/psyUpdatePassword/**",
          status: 203,
          response: {},
       });

      cy.get('.button-change').click()
      cy.get('.modal-body > :nth-child(1) > input').type('test');
      cy.get('.modal-body > :nth-child(2) > input').type('test2');
      cy.get('.modal-body > :nth-child(3) > input').type('test2');
      cy.get('.btn-success').click();
      cy.get('.modal-body > .alertContent > p').contains('A nova senha deve ter no mínimo 8 caracteres.');
  });

  it("should return to page profile when password was change successfully", () => {
      cy.route({
          method: "PUT",
          url: "**/psyUpdatePassword/**",
          response: {},
       });

      cy.get('.button-change').click()
      cy.get('.modal-body > :nth-child(1) > input').type('test');
      cy.get('.modal-body > :nth-child(2) > input').type('test2');
      cy.get('.modal-body > :nth-child(3) > input').type('test2');
      cy.get('.btn-success').click();
  });

  it("should return error when status is 400", () => {
      cy.route({
          method: "PUT",
          url: "**/psyUpdatePassword/**",
          status: 400,
          response: {},
       });

      cy.get('.button-change').click()
      cy.get('.modal-body > :nth-child(1) > input').type('test');
      cy.get('.modal-body > :nth-child(2) > input').type('test2');
      cy.get('.modal-body > :nth-child(3) > input').type('test2');
      cy.get('.btn-success').click();
      cy.get('.modal-body > .alertContent > p').contains('A senha atual está incorreta.');
  });
  });
  