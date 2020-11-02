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
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        async function getData() {
            const { email } = props.location.state;
            const response = await api.get(`/user/${email}`, {
                headers: { authorization: accessToken },
            });
            setPatient(response.data);
        }
        getData();
    });

    const history = useHistory();

    async function sendSession(event) {
        event.preventDefault();

        const { email } = patient;
        await api.post('/session', {
            email,
            mainComplaint,
            secondaryComplaint,
            complaintEvolution,
            professional,
        },
        {
            headers: { authorization: accessToken },
        });

        history.push({
            pathname: `patient/list/${patient.email}`,
            state: {
                email,
                data: props.location.state.data,
            },
        });
    }

    return (
        <div className="newSession">
            <NavBar className="navBar" bond="Psychologist" actualUser={props.location.state.data} />
            <div className="content">
                <div className="patientInfo">
                    <div className="patient">
                        <img className="patientImg" src={userIcon} alt="userIcon" />
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
                                    <span>{patient.phone ? patient.phone : 'não informado'}</span>
                                </div>
                            </div>

                            <div className="hidden">
                                <span className="prop">Vinculo: </span>
                                <span>{patient.bond ? patient.bond : 'não informado'}</span>

                                <span className="prop">Matricula: </span>
                                <span>{patient.unbRegistration ? patient.unbRegistration : 'não informado'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="patientHistory">
                    <div className="tab">
                        <button id="voltar" className="tabLink"
                            onClick={() => history.push({
                                pathname: `/patient/list/${patient.email}`,
                                state: {
                                    email: patient.email,
                                    data: props.location.state.data,
                                },
                            })}
                        >Voltar</button>
                    </div>
                    <form className="form" onSubmit={sendSession}>
                        <div className="tabContent">
                            <div className="record">
                                <h2>Profissional: Xxx</h2>
                                <h2>Data: 07/SET/2020</h2>
                                <h2>Encaminhamento: Rede Interna</h2>

                                <div className="recordText" id="professional">
                                    <h1>Profissional</h1>
                                    <input
                                        value={professional}
                                        onChange={(e) => setProfessional(e.target.value)}
                                        type="professional"
                                    />
                                </div>

                                <div className="recordText" id="mainComplaint" >
                                    <h1>Queixa Principal</h1>
                                    <textarea
                                        onChange={(e) => setMainComplaint(e.target.value)}
                                        type="mainComplaint"
                                    />
                                </div>

                                <div className="recordText" id="secondaryComplaint">
                                    <h1>Queixa Secundaria</h1>
                                    <textarea
                                        value={secondaryComplaint}
                                        onChange={(e) => setSecondaryComplaint(e.target.value)}
                                        type="secondaryComplaint"
                                    />
                                </div>

                                <div className="recordText" id="complaintEvolution">
                                    <h1>Evolução das queixas</h1>
                                    <textarea
                                        value={complaintEvolution}
                                        onChange={(e) => setComplaintEvolution(e.target.value)}
                                        type="complaintEvolution"
                                    />
                                </div>

                                <button className="sendButton" type="submit">Enviar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

NewSession.propTypes = {
    location: PropTypes.object,
};
