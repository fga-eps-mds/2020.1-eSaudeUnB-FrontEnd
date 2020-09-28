import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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

    useEffect(() => {
        async function getData() {
            const { email } = props.location.state;
            const response = await api.get(`/user/${email}`);
            setPatient(response.data);
        }
        getData();
    }, [props]);

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
        });

        history.push({
            pathname: `patient-list/${patient._id}`,
            state: { email },
        });
    }

    return (
        <div className="patientRecord">
            <div className="content">
                <NavBar className="navBar" />

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
                                    <span>{patient.phone}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="patientHistory">
                    <div className="tab">
                        <button id="voltar" className="tabLink"
                            onClick={() => history.push({
                                pathname: `/patient-list/${patient._id}`,
                                state: { email: patient.email },
                            })}
                        >Voltar</button>
                    </div>
                    <form className="form" onSubmit={sendSession}>
                        <div className="tabContent">
                            <div className="record">
                                <h2>Profissional: Xxx</h2>
                                <h2>Data: 07/SET/2020</h2>
                                <h2>Encaminhamento: Rede Interna</h2>

                                <h1>Profissional</h1>
                                <div className="recordText" id="professional">
                                    <input
                                        value={professional}
                                        onChange={(e) => setProfessional(e.target.value)}
                                        type="professional"
                                    />
                                </div>

                                <h1>Queixa Principal</h1>
                                <div className="recordText" id="mainComplaint" >
                                    <textarea
                                        onChange={(e) => setMainComplaint(e.target.value)}
                                        type="mainComplaint"
                                    />
                                </div>

                                <h1>Queixa Secundaria</h1>
                                <div className="recordText" id="secondaryComplaint">
                                    <textarea
                                        value={secondaryComplaint}
                                        onChange={(e) => setSecondaryComplaint(e.target.value)}
                                        type="secondaryComplaint"
                                    />
                                </div>

                                <h1>Evolução das queixas</h1>
                                <div className="recordText" id="complaintEvolution">
                                    <textarea
                                        value={complaintEvolution}
                                        onChange={(e) => setComplaintEvolution(e.target.value)}
                                        type="complaintEvolution"
                                    />
                                </div>

                                <button className="sendButton" type ="submit">Enviar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
