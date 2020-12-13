describe("Login Professional User", () => {
  beforeEach(() => {
    cy.server();
  });

  it("should login an professional", () => {
    cy.route({
      method: "POST",
      url: "**/login/psychologist",
      response: {
        user: {
          name: "test",
          lastName: "sobrenome",
          email: "test@esaude.com",
          gender: "M",
          bond: "Psicologo",
          password: "Zgrqab_P",
          ForgetPassword: false,
          phone: "",
          specialization: "testt",
          biography: "",
          weekDay: [],
          restrict: [],
        },
      },
    });

    cy.route({
      method: "GET",
      url: "**/psychologist/test@esaude.com",
      response: {
        name: "test",
        lastName: "sobrenome",
        email: "test@esaude.com",
        gender: "M",
        bond: "Psicologo",
        password: "Zgrqab_P",
        ForgetPassword: false,
        phone: "",
        specialization: "testt",
        biography: "",
        weekDay: [],
        restrict: [],
        __v: 0,
      },
    });

    cy.visit("/login");

    cy.get(":nth-child(2) > input").type("test@esaude.com");
    cy.get(":nth-child(3) > input").type("password");
    cy.get(".button").click();
    cy.get('[href="/patient/list"]').contains("Lista de Pacientes");
    cy.get('[href="/psychologist/events"]').contains("Agendamento");
  });

  it("should return an error when not found an professional", () => {
    cy.route({
      method: "POST",
      url: "**/login/psychologist",
      status: 404,
      response: {},
    });

    cy.visit("/login");

    cy.get(":nth-child(2) > input").type("test@esaude.com");
    cy.get(":nth-child(3) > input").type("password");
    cy.get(".button").click();
    cy.get('.fade').contains('Email/Senha incorretos, digite novamente.');
  });

  it("should return an error when occurred a server error", () => {
    cy.route({
      method: "POST",
      url: "**/login/psychologist",
      status: 500,
      response: {},
    });

    cy.visit("/login");

    cy.get(":nth-child(2) > input").type("test@esaude.com");
    cy.get(":nth-child(3) > input").type("password");
    cy.get(".button").click();
    cy.get('.fade').contains('Ocorreu algum erro no seu login, tente novamente.');
    cy.wait(3000);
  });

  it("should return 404 page", () => {
      cy.visit('/test');
      cy.get('p').contains('Oops! Página não encontrada');
  })
});
