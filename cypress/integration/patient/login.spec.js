describe('Login Patient User', () => {
    beforeEach(() => {
        cy.server();
    });

    it('should render Landing Page', () => {
        cy.visit('/');
        cy.get('.logo-container > h1').contains('e-Saúde');
        cy.get('.title').contains('Sobre');
        cy.get('#how-it-work > h1').contains('Como funciona');
        cy.get('#who-behind > h1').contains('Nossa equipe');
    });

    it('should remove scheduler from psychologist', () => {
        cy.visit('/psychologist/events');
    });

    it('should list psychologist', () => {
        cy.route({
            method: 'GET',
            url: '**/psychologists',
            response: [
                {
                    _id: '5fcc82789cbfe53a70867380',
                    name: 'usuário',
                    lastName: 'sobrenome',
                    email: 'test@esaude.com',
                    gender: 'M',
                    bond: 'Psicologo',
                    ForgetPassword: false,
                    phone: '',
                    specialization: 'testt',
                    biography: '',
                    weekDay: [],
                    restrict: [],
                    __v: 0,
                },
            ],
        });

        cy.visit('/psychologist/list');
    });

    it('should filter psychologist', () => {
        cy.route({
            method: 'GET',
            url: '**/psychologists',
            response: [
                {
                    _id: '5fcc82789cbfe53a70867380',
                    name: 'usuário',
                    lastName: 'sobrenome',
                    email: 'test@esaude.com',
                    gender: 'M',
                    bond: 'Psicologo',
                    ForgetPassword: false,
                    phone: '',
                    specialization: 'testt',
                    biography: '',
                    weekDay: [],
                    restrict: [],
                    __v: 0,
                },
            ],
        });

        cy.visit('/psychologist/list');
        cy.get('input').type('usuário');
    });

    it('should return error when user is not authenticated', () => {
        cy.route({
            method: 'GET',
            url: '**/psychologists',
            status: 401,
            response: {},
        });

        cy.visit('/psychologist/list');
        cy.wait(3000);
    });

    it('should list events from patients', () => {
        const currentDate = new Date();
        cy.route({
            method: 'GET',
            url: '**/psychologists',
            response: [
                {
                    _id: '5fcc82789cbfe53a70867380',
                    name: 'test',
                    lastName: 'sobrenome',
                    email: 'test@esaude.com',
                    gender: 'M',
                    bond: 'Psicologo',
                    password: 'Zgrqab_P',
                    ForgetPassword: false,
                    phone: '',
                    specialization: 'testt',
                    biography: '',
                    weekDay: [
                        {
                            _id: '5fd6d0d3439ad3341c50203c',
                            day: currentDate.getDay(),
                            month: currentDate.getMonth(),
                            year: currentDate.getFullYear(),
                            weekDay: 1,
                            from: '05:40',
                            to: '07:40',
                            appointment: [
                                {
                                    _id: '5fd6d0d3439ad3341c50203d',
                                    time: '05:40',
                                    scheduled: false,
                                },
                                {
                                    _id: '5fd6d0d3439ad3341c50203e',
                                    time: '06:45',
                                    scheduled: false,
                                },
                                {
                                    _id: '5fd6d0d3439ad3341c50203f',
                                    time: '07:50',
                                    scheduled: false,
                                },
                            ],
                            duration: 60,
                        },
                    ],
                    restrict: [],
                    __v: 0,
                },
            ],
        });

        cy.route({
            method: 'GET',
            url: '**/user/**',
            response: {
                phone: null,
                gender: null,
                unbRegistration: null,
                bond: 'user',
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
                name: 'teste',
                lastName: 'test',
                email: 'test@gmail.com',
                ForgetPassword: 1,
                appointments: [],
                __v: 0,
            },
        });

        cy.visit('/events');
        cy.wait(3000);
    });

    it('should return error when inputs are wrong', () => {
        cy.loginPatient();

        cy.get('#page1 > .form > .formRight > :nth-child(1) > .input > input').type('160128013');
        cy.get('#page1 > .form > .formRight > :nth-child(3) > .input > input').type('61991257884');
        cy.get(':nth-child(5) > .arrowButton').click();
        cy.get('.formLeft > :nth-child(1) > .selectsLargest').select('Não possuo filha(o)/filhas(os)');
        cy.get('.formLeft > :nth-child(2) > .selectsLargest').select('Solteiro');
        cy.get('.formLeft > :nth-child(3) > .selectsLargest').select('Parda(o)');
        cy.get('.formLeft > :nth-child(4) > .selectsLargest').select('Não');
        cy.get(':nth-child(5) > .input > input').type('Não');
        cy.get('.formRight > :nth-child(1) > .selectsLargest').select('Homem');
        cy.get('#page2 > .form > .formRight > :nth-child(2) > .selectsLargest').select('Heterossexual');
        cy.get('.formRight > :nth-child(3) > .selectsLargest').select('Não');
        cy.get('.formRight > :nth-child(4) > .selectsLargest').select('Nunca fiz');
        cy.get(':nth-child(5) > .selectsLargest').select('Ansiedade');
        cy.get(':nth-child(5) > .arrowButton').click();
        cy.get(':nth-child(4) > input').type('Arnaldo');
        cy.get(':nth-child(8) > input').type('61991067698');
        cy.get(':nth-child(12) > input').type('Primo');
        cy.get('#page3 > .form > .formRight > :nth-child(1) > .input > input').type('Marlene Aparecida');
        cy.get('.formRight > :nth-child(2) > .input > input').type('Antonio Rodrigues');
        cy.get('#page3 > .form > .formRight > :nth-child(3) > .input > input').type('61991235124');
        cy.get(':nth-child(5) > .arrowButton').click();

        cy.get('.button-salvar').click();

        cy.get('.fade').contains('Falha na atualização dos dados, tente novamente');
        cy.wait(2000);
    });

    it('should return error when inputs are wrong', () => {
        cy.route({
            method: 'PUT',
            url: '**/user/**',
            response: {
                phone: null,
                gender: null,
                unbRegistration: null,
                bond: 'user',
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
                name: 'teste',
                lastName: 'test',
                email: 'test@gmail.com',
                ForgetPassword: 1,
                appointments: [],
                __v: 0,
            },
        });

        cy.loginPatient();

        cy.get('#page1 > .form > .formRight > :nth-child(1) > .input > input').type('160128013');
        cy.get('#page1 > .form > .formRight > :nth-child(3) > .input > input').type('61991257884');
        cy.get(':nth-child(5) > .arrowButton').click();
        cy.get('.formLeft > :nth-child(1) > .selectsLargest').select('Não possuo filha(o)/filhas(os)');
        cy.get('.formLeft > :nth-child(2) > .selectsLargest').select('Solteiro');
        cy.get('.formLeft > :nth-child(3) > .selectsLargest').select('Parda(o)');
        cy.get('.formLeft > :nth-child(4) > .selectsLargest').select('Não');
        cy.get(':nth-child(5) > .input > input').type('Não');
        cy.get('.formRight > :nth-child(1) > .selectsLargest').select('Homem');
        cy.get('#page2 > .form > .formRight > :nth-child(2) > .selectsLargest').select('Heterossexual');
        cy.get('.formRight > :nth-child(3) > .selectsLargest').select('Não');
        cy.get('.formRight > :nth-child(4) > .selectsLargest').select('Nunca fiz');
        cy.get(':nth-child(5) > .selectsLargest').select('Ansiedade');
        cy.get(':nth-child(5) > .arrowButton').click();
        cy.get(':nth-child(4) > input').type('Arnaldo');
        cy.get(':nth-child(8) > input').type('61991067698');
        cy.get(':nth-child(12) > input').type('Primo');
        cy.get('#page3 > .form > .formRight > :nth-child(1) > .input > input').type('Marlene Aparecida');
        cy.get('.formRight > :nth-child(2) > .input > input').type('Antonio Rodrigues');
        cy.get('#page3 > .form > .formRight > :nth-child(3) > .input > input').type('61991235124');
        cy.get(':nth-child(5) > .arrowButton').click();

        cy.get('.button-salvar').click();

        cy.wait(2000);
    });

    it('should return error when inputs are wrong', () => {
        cy.route({
            method: 'PUT',
            url: '**/user/**',
            status: 203,
            response: {
                value: {
                    name: 'user',
                    lastName: 'user',
                    email: 'user@esaude.com',
                    password: 'teste',
                },
                error: {
                    _original: {
                        name: 'user',
                        lastName: 'user',
                        email: 'user@esaude.com',
                        password: 'teste',
                    },
                    details: [
                        {
                            path: ['name'],
                        },
                        {
                            path: ['lastName'],
                        },
                        {
                            path: ['email'],
                        },
                        {
                            path: ['phone'],
                        },
                        {
                            path: ['unbRegistration'],
                        },
                        {
                            path: ['gender'],
                        },
                        {
                            path: ['bond'],
                        },
                        {
                            path: ['civilStatus'],
                        },
                        {
                            path: ['race'],
                        },
                        {
                            path: ['sexualOrientation'],
                        },
                        {
                            path: ['emergencyContactName'],
                        },
                        {
                            path: ['emergencyContactPhone'],
                        },
                        {
                            path: ['emergencyContactBond'],
                        },
                        {
                            path: ['motherName'],
                        },
                        {
                            path: ['fatherName'],
                        },
                        {
                            path: ['psychiatricFollowUp'],
                        },
                        {
                            path: ['mainComplaint'],
                        },
                    ],
                },
            },
        });

        cy.loginPatient();

        cy.get('#page1 > .form > .formRight > :nth-child(1) > .input > input').type('160128013');
        cy.get('#page1 > .form > .formRight > :nth-child(3) > .input > input').type('61991257884');
        cy.get(':nth-child(5) > .arrowButton').click();
        cy.get('.formLeft > :nth-child(1) > .selectsLargest').select('Não possuo filha(o)/filhas(os)');
        cy.get('.formLeft > :nth-child(2) > .selectsLargest').select('Solteiro');
        cy.get('.formLeft > :nth-child(3) > .selectsLargest').select('Parda(o)');
        cy.get('.formLeft > :nth-child(4) > .selectsLargest').select('Não');
        cy.get(':nth-child(5) > .input > input').type('Não');
        cy.get('.formRight > :nth-child(1) > .selectsLargest').select('Homem');
        cy.get('#page2 > .form > .formRight > :nth-child(2) > .selectsLargest').select('Heterossexual');
        cy.get('.formRight > :nth-child(3) > .selectsLargest').select('Não');
        cy.get('.formRight > :nth-child(4) > .selectsLargest').select('Nunca fiz');
        cy.get(':nth-child(5) > .selectsLargest').select('Ansiedade');
        cy.get(':nth-child(5) > .arrowButton').click();
        cy.get(':nth-child(4) > input').type('Arnaldo');
        cy.get(':nth-child(8) > input').type('61991067698');
        cy.get(':nth-child(12) > input').type('Primo');
        cy.get('#page3 > .form > .formRight > :nth-child(1) > .input > input').type('Marlene Aparecida');
        cy.get('.formRight > :nth-child(2) > .input > input').type('Antonio Rodrigues');
        cy.get('#page3 > .form > .formRight > :nth-child(3) > .input > input').type('61991235124');
        cy.get(':nth-child(5) > .arrowButton').click();

        cy.get('.button-salvar').click();

        cy.wait(2000);
    });

    it('should render userSchedule', () => {
        cy.loginPatient();
        cy.visit('/main');
        cy.get('.closebtn').click();
        cy.get('#openbtn').click();
    });
});
