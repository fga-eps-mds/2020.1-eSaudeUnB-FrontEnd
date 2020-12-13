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

 Cypress.Commands.add("loginPatient", (type = '') => {
    cy.server();
    cy.visit('/login');

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
 })

 Cypress.Commands.add("loginProfessional", () => {
    cy.server();

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
 })