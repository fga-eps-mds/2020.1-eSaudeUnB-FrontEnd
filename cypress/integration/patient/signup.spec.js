describe("Sign Up Patient test", () => {
  beforeEach(() => {
    cy.server();
  });

  it("should registes an user", () => {
    cy.route({
      method: "POST",
      url: "**/users",
      status: 201,
      response: {},
    });

    cy.visit("/login");
    cy.get('[href="/registration"]').click();
    cy.get(":nth-child(1) > input").type("user");
    cy.get(":nth-child(3) > input").type("test");
    cy.get(":nth-child(5) > input").type("user@esaude.com");
    cy.get(":nth-child(7) > input").type("password");
    cy.get(":nth-child(9) > input").type("password");

    cy.get(".button").click();
  });

  it("should return error when field is not fill", () => {
    cy.visit("/login");
    cy.get('[href="/registration"]').click();
    cy.get(":nth-child(3) > input").type("test");
    cy.get(":nth-child(5) > input").type("user@esaude.com");
    cy.get(":nth-child(7) > input").type("password");
    cy.get(":nth-child(9) > input").type("password");

    cy.get(".button").click();
    cy.get(".fade").contains("Os campos não foram preenchidos corretamente.");
  });

  it("should return error from joi (password)", () => {
    cy.route({
      method: "POST",
      url: "**/users",
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
              message: '"password" length must be at least 8 characters long',
              path: ["password"],
              type: "string.min",
              context: {
                limit: 8,
                value: "teste",
                label: "password",
                key: "password",
              },
            },
          ],
        },
      },
    });

    cy.visit("/login");
    cy.get('[href="/registration"]').click();
    cy.get(":nth-child(1) > input").type("user");
    cy.get(":nth-child(3) > input").type("test");
    cy.get(":nth-child(5) > input").type("user@esaude.com");
    cy.get(":nth-child(7) > input").type("password");
    cy.get(":nth-child(9) > input").type("password");
    
    cy.get(".button").click();
    cy.get(':nth-child(8) > p').contains('A senha deve conter no mínimo 8 caracteres, sem dígitos especiais.');
  });

  it("should return error from joi (name)", () => {
    cy.route({
      method: "POST",
      url: "**/users",
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
              message: '"password" length must be at least 8 characters long',
              path: ["name"],
              type: "string.min",
              context: {
                limit: 8,
                value: "teste",
                label: "password",
                key: "password",
              },
            },
          ],
        },
      },
    });

    cy.visit("/login");
    cy.get('[href="/registration"]').click();
    cy.get(":nth-child(1) > input").type("user");
    cy.get(":nth-child(3) > input").type("test");
    cy.get(":nth-child(5) > input").type("user@esaude.com");
    cy.get(":nth-child(7) > input").type("password");
    cy.get(":nth-child(9) > input").type("password");
    
    cy.get(".button").click();
    cy.get(':nth-child(2) > p').contains('Nome precisa possuir mais de 2 letras.');
  });

  it("should return error from joi (lastName)", () => {
    cy.route({
      method: "POST",
      url: "**/users",
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
              message: '"lastName" length must be at least 8 characters long',
              path: ["lastName"],
              type: "string.min",
              context: {
                limit: 8,
                value: "teste",
                label: "password",
                key: "password",
              },
            },
          ],
        },
      },
    });

    cy.visit("/login");
    cy.get('[href="/registration"]').click();
    cy.get(":nth-child(1) > input").type("user");
    cy.get(":nth-child(3) > input").type("test");
    cy.get(":nth-child(5) > input").type("user@esaude.com");
    cy.get(":nth-child(7) > input").type("password");
    cy.get(":nth-child(9) > input").type("password");
    
    cy.get(".button").click();
    cy.get(':nth-child(4) > p').contains('Sobrenome precisa possuir mais de 2 letras.');
  });

  it("should return error from joi (email)", () => {
    cy.route({
      method: "POST",
      url: "**/users",
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
              message: '"email" length must be at least 8 characters long',
              path: ["email"],
              type: "string.min",
              context: {
                limit: 8,
                value: "teste",
                label: "password",
                key: "password",
              },
            },
          ],
        },
      },
    });

    cy.visit("/login");
    cy.get('[href="/registration"]').click();
    cy.get(":nth-child(1) > input").type("user");
    cy.get(":nth-child(3) > input").type("test");
    cy.get(":nth-child(5) > input").type("user@esaude.com");
    cy.get(":nth-child(7) > input").type("password");
    cy.get(":nth-child(9) > input").type("password");
    
    cy.get(".button").click();
    cy.get(':nth-child(6) > p').contains('E-mail não foi preenchido corretamente.');
  });

  it("should return error from joi (server)", () => {
    cy.route({
      method: "POST",
      url: "**/users",
      status: 203,
      response: {},
    });

    cy.visit("/login");
    cy.get('[href="/registration"]').click();
    cy.get(":nth-child(1) > input").type("user");
    cy.get(":nth-child(3) > input").type("test");
    cy.get(":nth-child(5) > input").type("user@esaude.com");
    cy.get(":nth-child(7) > input").type("password");
    cy.get(":nth-child(9) > input").type("passworddd");
    
    cy.get(".button").click();
    cy.get('.fade').contains('Erro no cadastro, tente novamente.');
    cy.wait(3000);
  });

  it("should return error from joi (confirmation)", () => {
    cy.route({
      method: "POST",
      url: "**/users",
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
              message: 'confirmation',
              path: [],
              type: "string.min",
              context: {
                limit: 8,
                value: "teste",
                label: "password",
                key: "password",
              },
            },
          ],
        },
      },
    });

    cy.visit("/login");
    cy.get('[href="/registration"]').click();
    cy.get(":nth-child(1) > input").type("user");
    cy.get(":nth-child(3) > input").type("test");
    cy.get(":nth-child(5) > input").type("user@esaude.com");
    cy.get(":nth-child(7) > input").type("password");
    cy.get(":nth-child(9) > input").type("passworddd");
    
    cy.get(".button").click();
    cy.get(':nth-child(10) > p').contains('As senhas não são iguais.');
    cy.wait(4000);
  });
});
