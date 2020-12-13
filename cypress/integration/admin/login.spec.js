describe('Login Admin User', () => {
    beforeEach(() => {
      cy.visit('/admin');
      cy.server();
    });

    it("should render initial screen from admin login", () => {
        cy.get('.pageTitle').contains('Login de Administrador');
    });

    it("should return a error when credential is wrong", () => {
        cy.route({
            method: 'POST',
            url: '**/admin/login*',
            status: 404,
            response: {},
        })
        cy.get(':nth-child(2) > input').type('user@esaude.com');
        cy.get(':nth-child(3) > input').type('password');
        cy.get('.button').click()

        cy.get('.fade').contains('Ocorreu algum erro no seu login, tente novamente.');
        cy.wait(6000);
    });

    it("should return a error when credential is wrong and remove when it unauthorized", () => {
        cy.route({
            method: 'POST',
            url: '**/admin/login*',
            response: {},
        });

        cy.route({
            method: 'GET',
            url: '**/psychologists',
            status: 401,
            response: {},
        })

        cy.get(':nth-child(2) > input').type('user@esaude.com');
        cy.get(':nth-child(3) > input').type('password');
        cy.get('.button').click();
        cy.wait(3000);
    });

    it("should logout from admin page", () => {
        cy.route({
            method: 'POST',
            url: '**/admin/login*',
            response: {},
        });

        cy.route({
            method: 'GET',
            url: '**/psychologists',
            response: [],
        })

        cy.get(':nth-child(2) > input').type('user@esaude.com');
        cy.get(':nth-child(3) > input').type('password');
        cy.get('.button').click();
        cy.wait(500);

        cy.get('.get-out').click();
    });

    it("should stop user when token is not available", () => {
        cy.route({
          method: 'POST',
          url: '**/admin/login*',
          response: {},
        });
  
        cy.get(':nth-child(2) > input').type('user@esaude.com');
        cy.get(':nth-child(3) > input').type('password');
        cy.get('.button').click();
        
        cy.wait(3000);
    });

    it("should an admin login in application", () => {
        cy.route({
            method: 'POST',
            url: '**/admin/login*',
            response: {},
        });
        cy.route({
            method: 'GET',
            url: '**psychologists*',
            response: [],
        });

        cy.get(':nth-child(2) > input').type('user@esaude.com');
        cy.get(':nth-child(3) > input').type('password');
        cy.get('.button').click()

        cy.get('.message-warning span').contains('Nenhum profissional foi encontrado');
    });
});