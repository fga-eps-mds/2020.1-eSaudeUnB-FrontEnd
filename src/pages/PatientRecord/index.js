import React, { useState, useEffect } from "react";

import api from '../../services/api';

import NavBar from "../../components/NavBar";
import PatientInfo from "../../components/PatientInfo";
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
                <PatientInfo patient={patient} />
                <PatientHistory />
            </div>
        </div>
    );
}
