import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import go from '../assets/images/go.svg';
import '../assets/styles/PatientTab.css';

export default function PatientTab({ imgSource, patient }) {
    return (
        <div className="patientTab">
            <div className="patientInfos">
                <img className="patientImg" src={imgSource} alt={patient.name} />
                <div className="minPatient">
                    <p>{patient.name}</p>
                    <p>{patient.email}</p>
                </div>
            </div>

            <Link
                className="button"
                to={`patient-list/${patient.id}`}
            >              {" "}
                <img src={go} />{" "}
            </Link>
        </div>
    );
}

PatientTab.propTypes = {
    patient: PropTypes.object,
    imgSource: PropTypes.any,
}
