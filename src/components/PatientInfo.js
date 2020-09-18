import React from "react";

import down from "../assets/images/down.svg";
import userIcon from "../assets/images/userIcon.svg";
import "../assets/styles/PatientInfo.css";

export default function PatientInfo({ patient }) {
    return (
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
    );
}
