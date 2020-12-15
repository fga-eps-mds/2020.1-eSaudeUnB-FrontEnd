import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import go from '../../assets/images/go.svg';

import userIcon from '../../assets/images/userIcon.svg';

import NavBar from '../../components/NavBar';

import './styles.css';

export default function PatientRecord(props) {
    const [patient, setPatient] = useState({});
    const [sessions, setsessions] = useState([]);
    const [allSessions, setAllSessions] = useState([]);
    const [mainComplaint, setMainComplaint] = useState('');
    const [secondaryComplaint, setSecondaryComplaint] = useState('');
    const [complaintEvolution, setComplaintEvolution] = useState('');
    const [professional, setProfessional] = useState('');
    const [tabContent, setTabContent] = useState(true);
    const [dia, SetDate] = useState('');
    const accessToken = localStorage.getItem('accessToken');

    const history = useHistory();

    useEffect(() => {
        async function getData() {
            const { email } = props.match.params;
            const response = await api.get(`/user/${email}`, {
                headers: { authorization: accessToken },
            });
            setPatient(response.data);
            const responsesessions = await api.get(`/session/${email}`, {
                headers: { authorization: accessToken },
            });
            setsessions(responsesessions.data);
            const responseAllsessions = await api.get(`/sessions/${email}`, {
                headers: { authorization: accessToken },
            });
            setAllSessions(responseAllsessions.data);
        }
        getData();
    }, [accessToken, props]);

    function haddleDate(session) {
        const data = session.date.split(/[-T]/, 3);
        return `${data[2]}/${data[1]}/${data[0]}`;
    }

    async function changeSession(index) {
        setTabContent(false);
        setMainComplaint(sessions[index].mainComplaint);
        setSecondaryComplaint(sessions[index].secondaryComplaint);
        setComplaintEvolution(sessions[index].complaintEvolution);
        setProfessional(sessions[index].professional);
        const data = sessions[index].date.split(/[-T]/, 3);
        SetDate(`${data[2]}/${data[1]}/${data[0]}`);
    }

    async function changeAllSession(index) {
        setTabContent(false);
        setMainComplaint(allSessions[index].mainComplaint);
        setSecondaryComplaint(allSessions[index].secondaryComplaint);
        setComplaintEvolution(allSessions[index].complaintEvolution);
        setProfessional(allSessions[index].professional);
        const data = allSessions[index].date.split(/[-T]/, 3);
        SetDate(`${data[2]}/${data[1]}/${data[0]}`);
    }

    function openShowAll() {
        setTabContent(true);
    }

    return (
        <>
            <NavBar className="navBar" bond="Professional" />
            <div className="patientRecord">
                <div className="content">
                    <div className="patientInfo">
                        <div className="patient">
                            {patient.userImage != null ? (
                                <img
                                    className="patientImg"
                                    src={atob(
                                        Buffer.from(
                                            patient.userImage,
                                            'binary',
                                        ).toString('base64'),
                                    )}
                                    alt={patient.name}
                                />
                            ) : (
                                <img
                                    className="patientImg"
                                    src={userIcon}
                                    alt={patient.name}
                                />
                            )}
                            <div className="info">
                                <div className="name">
                                    <span className="prop">Nome: </span>
                                    <span>{`${patient.name} ${patient.lastName}`}</span>
                                </div>

                                <div className="emailAndPhone">
                                    <div className="email">
                                        <span className="prop">Email: </span>
                                        <span>{patient.email}</span>
                                    </div>

                                    <div className="phone">
                                        <span className="prop">Telefone: </span>
                                        <span>
                                            {patient.phone
                                                ? patient.phone
                                                : 'não informado'}
                                        </span>
                                    </div>
                                </div>

                                <div className="hidden">
                                    <div className="bond">
                                        <span className="prop">Vinculo: </span>
                                        <span>
                                            {patient.bond
                                                ? patient.bond
                                                : 'não informado'}
                                        </span>
                                    </div>

                                    <div className="enrollment">
                                        <span className="prop">
                                            Matricula:{' '}
                                        </span>
                                        <span>
                                            {patient.unbRegistration
                                                ? patient.unbRegistration
                                                : 'não informado'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="patientHistory">
                        <div className="tab">
                            <button
                                id="mostrarTodos"
                                className="tabLink"
                                onClick={() => openShowAll()}
                            >
                                Mostrar Todos
                            </button>
                            {sessions.map((session, index) => (
                                <div key={session._id} className="buttons">
                                    <button
                                        id={`button${index}`}
                                        className="tablink"
                                        onClick={() => changeSession(index)}
                                    >
                                        {haddleDate(session)}
                                    </button>
                                </div>
                            ))}
                            <button
                                id="novoAtendimento"
                                className="tabLink"
                                onClick={() => history.push({
                                    pathname: '/new-session',
                                    state: {
                                        email: patient.email,
                                    },
                                })
                                }
                            >
                                Novo atendimento
                            </button>
                        </div>

                        <div className="tabContent">
                            {tabContent ? (
                                <div className="sessions">
                                    {allSessions.length === 0 && (
                                        <p className="noSession">
                                            O paciente não possui atendimentos
                                            anteriores
                                        </p>
                                    )}
                                    {allSessions.map((session, index) => (
                                        <div
                                            key={session._id}
                                            className="sessionTab"
                                        >
                                            <div className="sessionInfos">
                                                <div className="minSession">
                                                    <p>
                                                        Data:{' '}
                                                        {haddleDate(session)}{' '}
                                                    </p>
                                                    <p className="info">
                                                        Profissional:{' '}
                                                        {session.professional}
                                                    </p>
                                                    {/* <p className="info">
                                                        Encaminhamento: Rede Interna
                                                    </p> */}
                                                </div>
                                            </div>

                                            <Link
                                                className="button"
                                                to={''}
                                                onClick={(event) => {
                                                    changeAllSession(index);
                                                    event.preventDefault();
                                                }}
                                            >
                                                <img src={go} alt="go" />{' '}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="record">
                                    <h2>Profissional: {`${professional}`}</h2>
                                    <h2>Data: {`${dia}`}</h2>
                                    {/* <h2>Encaminhamento: Rede Interna</h2> */}

                                    <div
                                        className="recordText"
                                        id="mainComplaint"
                                    >
                                        <h1>Queixa Principal</h1>
                                        <p>{`${mainComplaint}`}</p>
                                    </div>
                                    <div
                                        className="recordText"
                                        id="secondaryComplaint"
                                    >
                                        <h1>Queixa Secundaria</h1>
                                        <p>{`${secondaryComplaint}`}</p>
                                    </div>
                                    <div
                                        className="recordText"
                                        id="complaintEvolution"
                                    >
                                        <h1>Evolução das queixas</h1>
                                        <p>{`${complaintEvolution}`}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

PatientRecord.propTypes = {
    match: PropTypes.object,
    email: PropTypes.string,
    location: PropTypes.object,
};
