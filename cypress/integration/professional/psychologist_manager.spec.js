describe("Manager Patient", () => {
  beforeEach(() => {
    cy.server();
    cy.loginProfessional();
  });

  it("should list all patient", () => {
    cy.route({
      method: "GET",
      url: "**/users",
      response: [
        {
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
          _id: "5fd57f2695683f0ce02995e7",
          name: "teste",
          lastName: "test",
          email: "test@gmail.com",
          ForgetPassword: true,
          appointments: [],
          __v: 0,
        },
        {
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
          _id: "5fd5aa7a95683f0ce02995e8",
          name: "user",
          lastName: "user",
          email: "user@esaude.com",
          ForgetPassword: false,
          appointments: [],
          __v: 0,
        },
      ],
    });

    cy.visit("/patient/list");
    cy.get(".content .patientTab").should("have.length", 2);
  });

  it("should search for patient", () => {
    cy.route({
      method: "GET",
      url: "**/users",
      response: [
        {
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
          _id: "5fd57f2695683f0ce02995e7",
          name: "teste",
          lastName: "test",
          email: "test@gmail.com",
          ForgetPassword: true,
          appointments: [],
          __v: 0,
        },
        {
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
          _id: "5fd5aa7a95683f0ce02995e8",
          name: "user",
          lastName: "user",
          email: "user@esaude.com",
          ForgetPassword: false,
          appointments: [],
          __v: 0,
        },
      ],
    });

    cy.visit("/patient/list");
    cy.get("input").type("test");
    cy.get(".content .patientTab").should("have.length", 1);
  });

  it("should register an session", () => {
    cy.route({
      method: "GET",
      url: "**/users",
      response: [
        {
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
          _id: "5fd57f2695683f0ce02995e7",
          name: "teste",
          lastName: "test",
          email: "test@gmail.com",
          ForgetPassword: true,
          appointments: [],
          __v: 0,
        },
      ],
    });

    cy.route({
      method: "GET",
      url: "**/user/**",
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

    cy.visit("/patient/list");
    cy.get(".button > img").click();
    cy.get("#novoAtendimento").click();

    cy.route({
      method: "GET",
      url: "**/sessions/**",
      response: [
        {
          _id: "5fd6598295683f0ce02995eb",
          mainComplaint: "fdsafasdfas",
          secondaryComplaint: "fadsfasfd",
          complaintEvolution: "fdsafasdf",
          professional: "bbb",
          createdAt: "2020-12-13T18:12:18.217Z",
          updatedAt: "2020-12-13T18:12:18.217Z",
          __v: 0,
        },
      ],
    });

    cy.route({
      method: "GET",
      url: "**/session/**",
      response: [
        {
          _id: "5fd6598295683f0ce02995eb",
          mainComplaint: "fdsafasdfas",
          secondaryComplaint: "fadsfasfd",
          complaintEvolution: "fdsafasdf",
          professional: "bbb",
          createdAt: "2020-12-13T18:12:18.217Z",
          updatedAt: "2020-12-13T18:12:18.217Z",
          __v: 0,
        },
      ],
    });

    cy.route({
      method: "POST",
      url: "**/session",
      response: {},
    });

    cy.get("#mainComplaint > textarea").type("teste complaint");
    cy.get("#secondaryComplaint > textarea").type("teste complaint 2");
    cy.get("#complaintEvolution > textarea").type("teste complaint 3");
    cy.get(".sendButton").click();

    cy.get('.sessionTab').should('have.length', 1);
  });

  it("should change menu in sessions", () => {
    cy.route({
      method: "GET",
      url: "**/users",
      response: [
        {
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
          _id: "5fd57f2695683f0ce02995e7",
          name: "teste",
          lastName: "test",
          email: "test@gmail.com",
          ForgetPassword: true,
          appointments: [],
          __v: 0,
        },
      ],
    });

    cy.route({
      method: "GET",
      url: "**/user/**",
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

    cy.visit("/patient/list");
    cy.get(".button > img").click();
    cy.get("#novoAtendimento").click();

    cy.route({
      method: "GET",
      url: "**/sessions/**",
      response: [
        {
          _id: "5fd6598295683f0ce02995eb",
          mainComplaint: "fdsafasdfas",
          secondaryComplaint: "fadsfasfd",
          complaintEvolution: "fdsafasdf",
          professional: "bbb",
          createdAt: "2020-12-13T18:12:18.217Z",
          updatedAt: "2020-12-13T18:12:18.217Z",
          __v: 0,
        },
      ],
    });

    cy.route({
      method: "GET",
      url: "**/session/**",
      response: [
        {
          _id: "5fd6598295683f0ce02995eb",
          mainComplaint: "fdsafasdfas",
          secondaryComplaint: "fadsfasfd",
          complaintEvolution: "fdsafasdf",
          professional: "bbb",
          createdAt: "2020-12-13T18:12:18.217Z",
          updatedAt: "2020-12-13T18:12:18.217Z",
          __v: 0,
        },
      ],
    });

    cy.route({
      method: "POST",
      url: "**/session",
      response: {},
    });

    cy.get("#mainComplaint > textarea").type("teste complaint");
    cy.get("#secondaryComplaint > textarea").type("teste complaint 2");
    cy.get("#complaintEvolution > textarea").type("teste complaint 3");
    cy.get(".sendButton").click();

    cy.get('#button0').click();
    cy.get('#mostrarTodos').click();
    cy.get('.button > img').click();
  });
});
