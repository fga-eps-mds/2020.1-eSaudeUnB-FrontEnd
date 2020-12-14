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

    cy.get(".sessionTab").should("have.length", 1);
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

    cy.get("#button0").click();
    cy.get("#mostrarTodos").click();
    cy.get(".button > img").click();
  });

  it("should manager scheduler from psychologist", () => {
    cy.route({
      method: "PUT",
      url: "**/calendary/update/",
      response: { n: 1, nModified: 1, ok: 1 },
    });

    cy.route({
      method: "POST",
      url: "**/calendary/update",
      response: [
        {
          _id: "5fd6ad75439ad3341c50202f",
          day: 13,
          month: 11,
          year: 2020,
          weekDay: 0,
          from: "21:05",
          to: "22:05",
          appointment: [
            {
              _id: "5fd6ad75439ad3341c502030",
              time: "21:05",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502031",
              time: "21:10",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502032",
              time: "21:15",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502033",
              time: "21:20",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502034",
              time: "21:25",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502035",
              time: "21:30",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502036",
              time: "21:35",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502037",
              time: "21:40",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502038",
              time: "21:45",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502039",
              time: "21:50",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c50203a",
              time: "21:55",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c50203b",
              time: "22:00",
              scheduled: false,
            },
          ],
          duration: 5,
        },
      ],
    });

    cy.visit("/psychologist/schedule");
    cy.get(".link").click();
    cy.get(".legend > button").click();
  });

  it("should manager scheduler from psychologist calendary", () => {
    cy.route({
      method: "PUT",
      url: "**/calendary/update/",
      response: { n: 1, nModified: 1, ok: 1 },
    });

    cy.visit("/psychologist/schedule");
    cy.get(".link").click();
    cy.get(".legend > button").click();
    cy.get(":nth-child(1) > :nth-child(1) > input").type("20:35");
    cy.get(":nth-child(1) > :nth-child(2) > input").type("22:35");
    cy.get(":nth-child(1) > :nth-child(3) > input").type(5);
    cy.get(".footer > button").click();

    cy.get(".fade").contains("Suas alterações foram salvas");
    cy.wait(4000);
  });

  it("should manager scheduler from psychologist", () => {
    cy.route({
      method: "PUT",
      url: "**/calendary/update/",
      response: { n: 1, nModified: 1, ok: 1 },
    });

    cy.route({
      method: "POST",
      url: "**/calendary/update",
      response: [
        {
          _id: "5fd6ad75439ad3341c50202f",
          day: 13,
          month: 11,
          year: 2020,
          weekDay: 0,
          from: "21:05",
          to: "22:05",
          appointment: [
            {
              _id: "5fd6ad75439ad3341c502030",
              time: "21:05",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502031",
              time: "21:10",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502032",
              time: "21:15",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502033",
              time: "21:20",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502034",
              time: "21:25",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502035",
              time: "21:30",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502036",
              time: "21:35",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502037",
              time: "21:40",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502038",
              time: "21:45",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502039",
              time: "21:50",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c50203a",
              time: "21:55",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c50203b",
              time: "22:00",
              scheduled: false,
            },
          ],
          duration: 5,
        },
      ],
    });

    cy.visit("/psychologist/schedule");
    cy.get(".link").click();
    cy.get(".legend > button").click();
  });

  it("should remove scheduler from psychologist", () => {
    cy.route({
      method: "PUT",
      url: "**/calendary/update/",
      response: { n: 1, nModified: 1, ok: 1 },
    });

    cy.route({
      method: "POST",
      url: "**/calendary/update",
      response: [
        {
          _id: "5fd6ad75439ad3341c50202f",
          day: 13,
          month: 11,
          year: 2020,
          weekDay: 0,
          from: "21:05",
          to: "22:05",
          appointment: [
            {
              _id: "5fd6ad75439ad3341c502030",
              time: "21:05",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502031",
              time: "21:10",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502032",
              time: "21:15",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502033",
              time: "21:20",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502034",
              time: "21:25",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502035",
              time: "21:30",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502036",
              time: "21:35",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502037",
              time: "21:40",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502038",
              time: "21:45",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c502039",
              time: "21:50",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c50203a",
              time: "21:55",
              scheduled: false,
            },
            {
              _id: "5fd6ad75439ad3341c50203b",
              time: "22:00",
              scheduled: false,
            },
          ],
          duration: 5,
        },
      ],
    });

    cy.visit("/psychologist/schedule");
    cy.get(".schedule-item > button").click();
    cy.get(".footer > button").click();
  });
});
