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


  it("should return error when session is expired", () => {
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
      status: 401,
      response: {},
    });

    cy.visit("/login");

    cy.get(":nth-child(2) > input").type("test@esaude.com");
    cy.get(":nth-child(3) > input").type("password");
    cy.get(".button").click();
    cy.get('[href="/patient/list"]').contains("Lista de Pacientes");
    cy.get('[href="/psychologist/events"]').contains("Agendamento");
    cy.wait(11000);
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
  });

  it("should reset user password", () => {
    cy.route({
        method: "PUT",
        url: "**/userForgetPassword/user@esaude.com",
        response: {},
    });

    cy.visit("/login");

    cy.get('[href=""]').click();
    cy.get('.modalInput').type('user@esaude.com');
    cy.get('.btn-success').click();
    cy.get('.fade').contains('Verifique o seu e-mail para recebimento da nova senha de acesso.');
    cy.wait(3000);
  });

  it("should reset user password", () => {
    cy.route({
        method: "PUT",
        url: "**/userForgetPassword/user@esaude.com",
        response: {},
    });

    cy.visit("/login");

    cy.get('[href=""]').click();
    cy.get('.modalInput').type('user@esaude.com');
    cy.get('.btn-success').click();
    cy.get('.fade').contains('Verifique o seu e-mail para recebimento da nova senha de acesso.');
    cy.wait(3000);
  });


  it("should return an error when server not deal well with request rest password to patient", () => {
    cy.route({
        method: "PUT",
        url: "**/userForgetPassword/user@esaude.com",
        status: 500,
        response: {},
    });

    cy.route({
        method: "PUT",
        url: "**psyForgetPassword/user@esaude.com",
        response: {},
    });

    cy.visit("/login");

    cy.get('[href=""]').click();
    cy.get('.modalInput').type('user@esaude.com');
    cy.get('.btn-success').click();
    cy.wait(6000);
  });

  it("should return an error when server not deal well with request rest password to psychologist", () => {
    cy.route({
        method: "PUT",
        url: "**/userForgetPassword/user@esaude.com",
        status: 500,
        response: {},
    });

    cy.route({
        method: "PUT",
        url: "**psyForgetPassword/user@esaude.com",
        status: 500,
        response: {},
    });

    cy.visit("/login");

    cy.get('[href=""]').click();
    cy.get('.modalInput').type('user@esaude.com');
    cy.get('.btn-success').click();
    cy.get('.alertContent > p').contains('Email não encontrado');
    cy.wait(6000);
  });
});
