import React, { useState, useEffect } from "react";

import api from '../../services/api';

import down from "../../assets/images/down.svg";
import userIcon from "../../assets/images/userIcon.svg";

import NavBar from "../../components/NavBar";
import PatientHistory from "../../components/PatientHistory"

import "./styles.css";

export default function PatientRecord(props) {
    const [patient, setPatient] = useState({});

    useEffect(() => {
        api.get(`/users/${props.match.params.id}`)
            .then(response => {
                setPatient(response.data[0]);
            })
    }, []);

    return (
        <div className="patientRecord">
            <div className="content">
                <NavBar className="navBar" />

                <div className="patientInfo">
                    <div className="patient">
                        <img className="patientImg" src={userIcon} />
                        <div className="info">
                            <div className="name">
                                <span className="prop">Nome: </span>
                                <span>{patient.name}</span>
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

                            <label htmlFor="toggle">
                                <img src={down} alt="expandir" />
                            </label>
                            <input type="checkbox" id="toggle"></input>

                            <div className="hidden">
                                <span className="prop">Vinculo: </span>
                                <span>{patient.bond}</span>

                                <span className="prop">Matricula: </span>
                                <span>{patient.unbRegistration}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <PatientHistory />
            </div>
        </div>
    );
}
