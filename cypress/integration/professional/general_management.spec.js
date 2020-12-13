describe("General Management User", () => {
  beforeEach(() => {
    cy.server();
    cy.loginProfessional();
  });

  it("should login an professional", () => {
    cy.visit("psychologist/events");
    cy.get(".closebtn").click();
    cy.get(".arrowOpen").click();
  });

  it("should return error min password in change password page", () => {
    cy.route({
      method: "PUT",
      url: "**/psyUpdatePassword/**",
      status: 203,
      response: {},
    });

    cy.get(".button-change").click();
    cy.get(".modal-body > :nth-child(1) > input").type("test");
    cy.get(".modal-body > :nth-child(2) > input").type("test2");
    cy.get(".modal-body > :nth-child(3) > input").type("test2");
    cy.get(".btn-success").click();
    cy.get(".modal-body > .alertContent > p").contains(
      "A nova senha deve ter no mínimo 8 caracteres."
    );
  });

  it("should return to page profile when password was change successfully", () => {
    cy.route({
      method: "PUT",
      url: "**/psyUpdatePassword/**",
      response: {},
    });

    cy.get(".button-change").click();
    cy.get(".modal-body > :nth-child(1) > input").type("test");
    cy.get(".modal-body > :nth-child(2) > input").type("test2");
    cy.get(".modal-body > :nth-child(3) > input").type("test2");
    cy.get(".btn-success").click();
  });

  it("should return error when status is 400", () => {
    cy.route({
      method: "PUT",
      url: "**/psyUpdatePassword/**",
      status: 400,
      response: {},
    });

    cy.get(".button-change").click();
    cy.get(".modal-body > :nth-child(1) > input").type("test");
    cy.get(".modal-body > :nth-child(2) > input").type("test2");
    cy.get(".modal-body > :nth-child(3) > input").type("test2");
    cy.get(".btn-success").click();
    cy.get(".modal-body > .alertContent > p").contains(
      "A senha atual está incorreta."
    );
  });

  it("should return error when passwords are not equal", () => {
    cy.route({
      method: "PUT",
      url: "**/psyUpdatePassword/**",
      status: 400,
      response: {},
    });

    cy.get(".button-change").click();
    cy.get(".modal-body > :nth-child(1) > input").type("test");
    cy.get(".modal-body > :nth-child(2) > input").type("test2");
    cy.get(".modal-body > :nth-child(3) > input").type("test23");
    cy.get(".btn-success").click();
    cy.get(".modal-body > .alertContent > p").contains(
      "As senhas devem ser iguais"
    );
  });

  it("should return error when server comes wrong", () => {
    cy.route({
      method: "PUT",
      url: "**/psyUpdatePassword/**",
      status: 500,
      response: {},
    });

    cy.get(".button-change").click();
    cy.get(".modal-body > :nth-child(1) > input").type("test");
    cy.get(".modal-body > :nth-child(2) > input").type("test2");
    cy.get(".modal-body > :nth-child(3) > input").type("test2");
    cy.get(".btn-success").click();
    cy.get(".modal-body > .alertContent > p").contains(
      "Ocorreu algum erro ao atualizar a senha, tente novamente."
    );
  });

  it("should return error when try update psychologist info", () => {
    cy.route({
      method: "PUT",
      url: "**/psyUpdate/**",
      status: 203,
      response: {
        value: {
          name: "user",
          lastName: "user",
          email: "user@esaude.com",
          password: "teste",
        },
        error: {
          _original: {
            name: "user",
            lastName: "user",
            email: "user@esaude.com",
            password: "teste",
          },
          details: [
            {
              path: ["password"],
            },
            {
              path: ["name"],
            },
            {
              path: ["lastName"],
            },
            {
              path: ["email"],
            },
            {
              path: ["phone"],
            },
            {
              path: ["specialization"],
            },
            {
              path: ["biography"],
            },
            {
              path: ["gender"],
            },
            {
              path: ["bond"],
            },
          ],
        },
      },
    });

    cy.get(".button-save").click();
    cy.get(":nth-child(1) > :nth-child(2) > p").contains(
      "Nome precisa possuir mais de 2 letras"
    );
    cy.get(":nth-child(2) > :nth-child(4) > p").contains(
      "Insira um telefone válido"
    );
    cy.get(".formColumn > :nth-child(4) > p").contains(
      "A biografia deve conter no máximo 300 caracteres."
    );
  });

  it("should return error when try update psychologist info", () => {
    cy.route({
      method: "PUT",
      url: "**/psyUpdate/**",
      status: 203,
      response: {
        value: {
          name: "user",
          lastName: "user",
          email: "user@esaude.com",
          password: "teste",
        },
        error: {
          _original: {
            name: "user",
            lastName: "user",
            email: "user@esaude.com",
            password: "teste",
          },
          details: [
            {
              path: ["password"],
            },
            {
              path: ["name"],
            },
            {
              path: ["lastName"],
            },
            {
              path: ["email"],
            },
            {
              path: ["phone"],
            },
            {
              path: ["specialization"],
            },
            {
              path: ["biography"],
            },
            {
              path: ["gender"],
            },
            {
              path: ["bond"],
            },
          ],
        },
      },
    });

    cy.get(".button-save").click();
    cy.get(":nth-child(1) > :nth-child(2) > p").contains(
      "Nome precisa possuir mais de 2 letras"
    );
    cy.get(":nth-child(2) > :nth-child(4) > p").contains(
      "Insira um telefone válido"
    );
    cy.get(".formColumn > :nth-child(4) > p").contains(
      "A biografia deve conter no máximo 300 caracteres."
    );
  });

  it("should update psychologist info", () => {
    cy.route({
      method: "PUT",
      url: "**/psyUpdate/**",
      status: 200,
      response: {
        _id: "5fcc82789cbfe53a70867380",
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

    cy.get(".button-save").click();

    cy.wait(3000);
  });
});
