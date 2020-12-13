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
    cy.get('.content .patientTab').should('have.length', 2);
  });
});
