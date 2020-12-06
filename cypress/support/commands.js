Cypress.Commands.add("loginAdmin", (type = '') => {
    cy.server();
    cy.visit('/admin');

    cy.route({
        method: 'POST',
        url: '**/admin/login*',
        response: {},
    });

    if (type === 'psychologist_render') {
        cy.route('GET', '**psychologists*', 'fixture:psychologist_list');
    } else {
        cy.route({
            method: 'GET',
            url: '**psychologists*',
            response: [],
        });
    }

    cy.get(':nth-child(2) > input').type('user@esaude.com');
    cy.get(':nth-child(3) > input').type('password');
    cy.get('.button').click()
 })