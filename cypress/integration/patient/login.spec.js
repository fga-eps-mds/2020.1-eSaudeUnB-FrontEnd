describe("Login Patient User", () => {
  beforeEach(() => {
    cy.server();
  });

  it("should render Landing Page", () => {
    cy.visit("/");
    cy.get(".logo-container > h1").contains("e-Saúde");
    cy.get(".title").contains("Sobre");
    cy.get("#how-it-work > h1").contains("Como funciona");
    cy.get("#who-behind > h1").contains("Nossa equipe");
  });

  it("should login an patient", () => {
    cy.route({
      method: "POST",
      url: "**/login/patient",
      response: {
        user: {
          phone: null,
          gender: null,
          unbRegistration: null,
          bond: "user",
          civilStatus: null,
          race: null,
          sexualOrientation: null,
          children: null,
          emergencyContactName: null,
          emergencyContactPhone: null,
          emergencyContactBond: null,
          motherName: null,
          fatherName: null,
          affiliationPhone: null,
          socialPrograms: null,
          studentHouseResidence: null,
          psychiatricFollowUp: null,
          medication: null,
          mainComplaint: null,
          sessions: [],
          name: "teste",
          lastName: "test",
          email: "test@gmail.com",
          ForgetPassword: false,
          appointments: [],
          __v: 0,
        },
      },
    });

    cy.route({
      method: "GET",
      url: "**/user/paciente@gmail.com",
      response: {
        phone: null,
        gender: null,
        unbRegistration: null,
        bond: "user",
        civilStatus: null,
        race: null,
        sexualOrientation: null,
        children: null,
        emergencyContactName: null,
        emergencyContactPhone: null,
        emergencyContactBond: null,
        motherName: null,
        fatherName: null,
        affiliationPhone: null,
        socialPrograms: null,
        studentHouseResidence: null,
        psychiatricFollowUp: null,
        medication: null,
        mainComplaint: null,
        sessions: [],
        name: "teste",
        lastName: "test",
        email: "test@gmail.com",
        ForgetPassword: false,
        appointments: [],
        __v: 0,
      },
    });

    cy.visit("/login");

    cy.get(":nth-child(2) > input").type("paciente@gmail.com");
    cy.get(":nth-child(3) > input").type("password");
    cy.get(".button").click();
    cy.get('[href="/psychologist/list"]').contains('Lista de Psicologos');
    cy.get('[href="/main"]').contains('Agendamento');
    cy.get('[href="/events"]').contains('Consultas Marcadas');
  });

  it("should recover password", () => {
    cy.route({
      method: "POST",
      url: "**/login/patient",
      response: {
        user: {
          phone: null,
          gender: null,
          unbRegistration: null,
          bond: "user",
          civilStatus: null,
          race: null,
          sexualOrientation: null,
          children: null,
          emergencyContactName: null,
          emergencyContactPhone: null,
          emergencyContactBond: null,
          motherName: null,
          fatherName: null,
          affiliationPhone: null,
          socialPrograms: null,
          studentHouseResidence: null,
          psychiatricFollowUp: null,
          medication: null,
          mainComplaint: null,
          sessions: [],
          name: "teste",
          lastName: "test",
          email: "test@gmail.com",
          ForgetPassword: 1,
          appointments: [],
          __v: 0,
        },
      },
    });

    cy.route({
      method: "GET",
      url: "**/user/paciente@gmail.com",
      response: {
        phone: null,
        gender: null,
        unbRegistration: null,
        bond: "user",
        civilStatus: null,
        race: null,
        sexualOrientation: null,
        children: null,
        emergencyContactName: null,
        emergencyContactPhone: null,
        emergencyContactBond: null,
        motherName: null,
        fatherName: null,
        affiliationPhone: null,
        socialPrograms: null,
        studentHouseResidence: null,
        psychiatricFollowUp: null,
        medication: null,
        mainComplaint: null,
        sessions: [],
        name: "teste",
        lastName: "test",
        email: "test@gmail.com",
        ForgetPassword: 1,
        appointments: [],
        __v: 0,
      },
    });

    cy.visit("/login");

    cy.get(":nth-child(2) > input").type("paciente@gmail.com");
    cy.get(":nth-child(3) > input").type("password");
    cy.get(".button").click();
    cy.get('[href="/psychologist/list"]').contains('Lista de Psicologos');
    cy.get('[href="/main"]').contains('Agendamento');
    cy.get('[href="/events"]').contains('Consultas Marcadas');
  });

  it("should remove scheduler from psychologist", () => {
    cy.visit("/psychologist/events");
  });

  it("should list psychologist", () => {
    cy.route({
      method: "GET",
      url: "**/psychologists",
      response: [
        {
          _id: "5fcc82789cbfe53a70867380",
          name: "usuário",
          lastName: "sobrenome",
          email: "test@esaude.com",
          gender: "M",
          bond: "Psicologo",
          ForgetPassword: false,
          phone: "",
          specialization: "testt",
          biography: "",
          weekDay: [],
          restrict: [],
          __v: 0,
        },
      ],
    });

    cy.visit("/psychologist/list");
  });

  it("should filter psychologist", () => {
    cy.route({
      method: "GET",
      url: "**/psychologists",
      response: [
        {
          _id: "5fcc82789cbfe53a70867380",
          name: "usuário",
          lastName: "sobrenome",
          email: "test@esaude.com",
          gender: "M",
          bond: "Psicologo",
          ForgetPassword: false,
          phone: "",
          specialization: "testt",
          biography: "",
          weekDay: [],
          restrict: [],
          __v: 0,
        },
      ],
    });

    cy.visit("/psychologist/list");
    cy.get('input').type('usuário');
  });

  it("should return error when user is not authenticated", () => {
    cy.route({
      method: "GET",
      url: "**/psychologists",
      status: 401,
      response: {},
    });

    cy.visit("/psychologist/list");
    cy.wait(3000);
  });
});
