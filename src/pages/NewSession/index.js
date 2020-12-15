import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';
import NavBar from '../../components/NavBar';
import userIcon from '../../assets/images/userIcon.svg';

import './styles.css';

export default function NewSession(props) {
    const [patient, setPatient] = useState({});
    const [mainComplaint, setMainComplaint] = useState('');
    const [secondaryComplaint, setSecondaryComplaint] = useState('');
    const [complaintEvolution, setComplaintEvolution] = useState('');
    const [professional, setProfessional] = useState('');

    const today = new Date();
    const [date, SetDate] = useState(today.toISOString().slice(0, 10));
    const [hour, SetHour] = useState(
        `${today.getHours()}:${today.getMinutes()}`,
    );

    useEffect(() => {
        async function getData() {
            const { email } = props.location.state;
            const accessToken = localStorage.getItem('accessToken');
            const psy = await api.get(
                `/psychologist/${localStorage.getItem('user')}`,
                {
                    headers: { authorization: accessToken },
                },
            );
            const response = await api.get(`/user/${email}`, {
                headers: { authorization: accessToken },
            });
            setPatient(response.data);
            setProfessional(psy.data);
        }

        getData();
    }, [props.location.state]);

    const history = useHistory();

    async function sendSession(event) {
        event.preventDefault();

        const { email } = patient;
        const accessToken = localStorage.getItem('accessToken');
        const dia = Date.parse(`${date}T${hour}`);
        await api.post(
            '/session',
            {
                email,
                mainComplaint,
                secondaryComplaint,
                date: dia,
                complaintEvolution,
                professional: `${professional.name} ${professional.lastName}`,
            },
            {
                headers: { authorization: accessToken },
            },
        );
        history.push({
            pathname: `patient/list/${patient.email}`,
            state: {
                email,
            },
        });
    }

    return (
        <>
            <NavBar className="navBar" bond="Professional" />
            <div className="newSession">
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
                                    <span className="prop">Vinculo: </span>
                                    <span>
                                        {patient.bond
                                            ? patient.bond
                                            : 'não informado'}
                                    </span>

                                    <span className="prop">Matricula: </span>
                                    <span>
                                        {patient.unbRegistration
                                            ? patient.unbRegistration
                                            : 'não informado'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="patientHistory">
                        <div className="tab">
                            <button
                                id="voltar"
                                className="tabLink"
                                onClick={() => history.push({
                                    pathname: `/patient/list/${patient.email}`,
                                    state: {
                                        email: patient.email,
                                        data: props.location.state.data,
                                    },
                                })
                                }
                            >
                                Voltar
                            </button>
                        </div>
                        <form className="form" onSubmit={sendSession}>
                            <div className="tabContent">
                                <div className="record">
                                    <div className="infos">
                                        <div className="professional">
                                            <p>Profissional:&nbsp;</p>
                                            <span>
                                                {' '}
                                                {professional.name}{' '}
                                                {professional.lastName}
                                            </span>
                                        </div>

                                        <div className="infoInputs">
                                            <div className="input-box">
                                                <label>Data</label>
                                                <input
                                                    type="date"
                                                    defaultValue={today
                                                        .toISOString()
                                                        .slice(0, 10)}
                                                    onChange={(e) => SetDate(e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="input-box">
                                                <label>Horário</label>
                                                <input
                                                    type="time"
                                                    defaultValue={`${today.getHours()}:${today.getMinutes()}`}
                                                    onChange={(e) => SetHour(e.target.value)
                                                    }
                                                />
                                                {/* 2020-01-29-12:50Z */}
                                            </div>
                                        </div>
                                        {/* <>Encaminhamento: SELECT</> */}
                                    </div>

                                    <div
                                        className="recordText"
                                        id="mainComplaint"
                                    >
                                        <h1>Queixa Principal</h1>
                                        <textarea
                                            onChange={(e) => setMainComplaint(e.target.value)
                                            }
                                            type="mainComplaint"
                                        />
                                    </div>

                                    <div
                                        className="recordText"
                                        id="secondaryComplaint"
                                    >
                                        <h1>Queixa Secundaria</h1>
                                        <textarea
                                            value={secondaryComplaint}
                                            onChange={(e) => setSecondaryComplaint(
                                                e.target.value,
                                            )
                                            }
                                            type="secondaryComplaint"
                                        />
                                    </div>

                                    <div
                                        className="recordText"
                                        id="complaintEvolution"
                                    >
                                        <h1>Evolução das queixas</h1>
                                        <textarea
                                            value={complaintEvolution}
                                            onChange={(e) => setComplaintEvolution(
                                                e.target.value,
                                            )
                                            }
                                            type="complaintEvolution"
                                        />
                                    </div>

                                    <button
                                        className="sendButton"
                                        type="submit"
                                    >
                                        Enviar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

NewSession.propTypes = {
    location: PropTypes.object,
};
