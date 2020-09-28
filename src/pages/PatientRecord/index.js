import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';

import userIcon from '../../assets/images/userIcon.svg';

import NavBar from '../../components/NavBar';

import './styles.css';

export default function PatientRecord(props) {
    const [patient, setPatient] = useState({});

    useEffect(() => {
        api.get(`/user/${props.match.params.email}`).then((response) => {
            setPatient(response.data);
        });
    });

    return (
        <div className="patientRecord">
            <div className="content">
                <NavBar className="navBar" />

                <div className="patientInfo">
                    <div className="patient">
                        <img
                            className="patientImg"
                            src={userIcon}
                            alt="userIcon"
                        />
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

                            <div className="hidden">
                                <span className="prop">Vinculo: </span>
                                <span>{patient.bond}</span>

                                <span className="prop">Matricula: </span>
                                <span>{patient.unbRegistration}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="patientHistory">
                    <div className="tab">
                        <button className="tabLink">Mostrar Todos</button>
                        <button className="tabLink">17/08/2020</button>
                        <button className="tabLink">21/08/2020</button>
                        <button className="tabLink">31/08/2020</button>
                        <button className="tabLink">07/09/2020</button>
                        <button className="tabLink">Novo atendimento</button>
                    </div>

                    <div className="tabContent">
                        <div className="record">
                            <h2>Profissional: Dr. Hilmer Rodrigues</h2>
                            <h2>Data: 07/SET/2020</h2>
                            <h2>Encaminhamento: Rede Interna</h2>

                            <div className="recordText">
                                <h1>Queixa Principal</h1>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Maecenas mattis sed risus ac lobortis. Etiam vehicula tortor
                                    urna. Nullam venenatis mi nec libero tempus, vitae venenatis
                                    lacus tincidunt. Donec consequat mauris in accumsan suscipit.
                                    Curabitur cursus blandit bibendum.
                                </p>
                            </div>
                            <div className="recordText">
                                <h1>Queixa Secundaria</h1>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Maecenas mattis sed risus ac lobortis. Etiam vehicula tortor
                                    urna. Nullam venenatis mi nec libero tempus, vitae venenatis
                                    lacus tincidunt. Donec consequat mauris in accumsan suscipit.
                                    Curabitur cursus blandit bibendum.
                                </p>
                            </div>
                            <div className="recordText">
                                <h1>Evolução das queixas</h1>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Maecenas mattis sed risus ac lobortis. Etiam vehicula tortor
                                    urna. Nullam venenatis mi nec libero tempus, vitae venenatis
                                    lacus tincidunt. Donec consequat mauris in accumsan suscipit.
                                    Curabitur cursus blandit bibendum.
                                </p>
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
    email: PropTypes.string,
};
