import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';

import up from '../../assets/images/up.svg';
import down from '../../assets/images/down.svg';
import userIcon from '../../assets/images/userIcon.svg';

import NavBar from '../../components/NavBar';

import './styles.css';

export default function PatientRecord(props) {
    const [patient, setPatient] = useState({});
    const [expand, setExpand] = useState(false);
    const [arrow, setArrow] = useState(true);
    const [sessions, setSessions] = useState([]);
    const [mainComplaint, setMainComplaint] = useState('');
    const [secondaryComplaint, setSecondaryComplaint] = useState('');
    const [complaintEvolution, setComplaintEvolution] = useState('');
    const [professional, setProfessional] = useState('');

    useEffect(() => {
        async function getData(){
            const {email} = props.location.state;
            const response = await api.get(`/user/${email}`);
            setPatient(response.data);
            const responseSessions = await api.get(`/session/${email}`);
            setSessions(responseSessions.data);
        }
        getData();
        
    }, [props]);
    
    function changeSession(index){

        setMainComplaint(sessions[index].mainComplaint);
        setSecondaryComplaint(sessions[index].secondaryComplaint);
        setComplaintEvolution(sessions[index].complaintEvolution);
        setProfessional(sessions[index].professional);
    }

    function handleSession(){
        
    }


    function handleExpand() {
        if (expand === true) {
            setExpand(false);
            setArrow(true);
        } else {
            setExpand(true);
            setArrow(false);
        }
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

                            {expand ? (
                                <div className="hidden">
                                    <span className="prop">Vinculo: </span>
                                    <span>{patient.bond}</span>

                                    <span className="prop">Matricula: </span>
                                    <span>{patient.unbRegistration}</span>
                                </div>
                            ) : (
                                <div className="hidden"></div>
                            )}

                            <button className="expand" onClick={handleExpand}>
                                {arrow ? (
                                    <img src={down} alt="expandir" />
                                ) : (
                                    <img src={up} alt="expandir" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="patientHistory">
                    <div className="tab">
                        <button className="tabLink">Mostrar Todos</button>
                        {sessions.map((session, index) => (
                            <div className="buttons">
                                <button className="tabLink" 
                                onClick={() => changeSession(index)}>{index}</button>
                            </div>
                        ))}
                        <button className="tabLink" onClick={handleSession}>Novo atendimento</button>
                    </div>

                    <div className="tabContent">
                        <div className="record">
                            <h2>Profissional: {`${professional}`}</h2>
                            <h2>Data: 07/SET/2020</h2>
                            <h2>Encaminhamento: Rede Interna</h2>

                            <h1>Queixa Principal</h1>
                            <div className="recordText" id="mainComplaint">
                                <p>{`${mainComplaint}`}</p>
                            </div>
                            <h1>Queixa Secundaria</h1>
                            <div className="recordText" id="secondaryComplaint">
                                <p>{`${secondaryComplaint}`}</p>
                            </div>
                            <h1>Evolução das queixas</h1>
                            <div className="recordText" id="complaintEvolution">
                                <p>{`${complaintEvolution}`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

PatientRecord.propTypes = {
    match: PropTypes.object,
    id: PropTypes.string,
};
