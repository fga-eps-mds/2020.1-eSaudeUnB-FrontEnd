describe("Change Password User", () => {
    beforeEach(() => {
      cy.server();
      cy.loginPatient();
    });
  
    it("should return error min password in change password page", () => {
        cy.route({
            method: "PUT",
            url: "**/user/password/**",
            status: 203,
            response: {},
         });

        cy.get('.button-change').click()
        cy.get(':nth-child(1) > .input > .modalInput').type('test');
        cy.get(':nth-child(2) > .input > .modalInput').type('test2');
        cy.get(':nth-child(3) > .input > .modalInput').type('test2');
        cy.get('.buttonConfirm').click();
        cy.get('.modal-body > :nth-child(4) > .alertContent > p').contains('A nova senha deve ter no mínimo 8 caracteres.');
    });

    it("should return to page profile when password was change successfully", () => {
        cy.route({
            method: "PUT",
            url: "**/user/password/**",
            response: {},
         });

        cy.get('.button-change').click()
        cy.get(':nth-child(1) > .input > .modalInput').type('test');
        cy.get(':nth-child(2) > .input > .modalInput').type('test2');
        cy.get(':nth-child(3) > .input > .modalInput').type('test2');
        cy.get('.buttonConfirm').click();
    });
  
    it("should return error when status is 400", () => {
        cy.route({
            method: "PUT",
            url: "**/user/password/**",
            status: 400,
            response: {},
         });

        cy.get('.button-change').click()
        cy.get(':nth-child(1) > .input > .modalInput').type('test');
        cy.get(':nth-child(2) > .input > .modalInput').type('test2');
        cy.get(':nth-child(3) > .input > .modalInput').type('test2');
        cy.get('.buttonConfirm').click();
        cy.get('.modal-body > :nth-child(4) > .alertContent > p').contains('A senha atual está incorreta.');
    });
  });
  