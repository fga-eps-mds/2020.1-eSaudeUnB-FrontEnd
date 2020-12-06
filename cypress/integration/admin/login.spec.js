  
describe('Corporations page test', () => {
    beforeEach(() => {
      cy.visit('/admin');
      cy.server();
    });

    it("should render initial screen from admin login", () => {
        cy.get('.pageTitle').contains('Login de Administrador');
    });

    it.only("should return a error when credential is wrong", () => {
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
    });
});