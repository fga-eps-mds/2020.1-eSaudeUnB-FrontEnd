import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import go from '../assets/images/go.svg';
import '../assets/styles/PatientTab.css';

export default function PatientTab({imgSource, patientName, patientEmail, address}) {
    return (
        <div className="patientTab">
            <div className="patientInfos">
                <img className="patientImg" src={imgSource} alt={patientName} />
                <div className="minPatient">
                    <p>{patientName}</p>
                    <p>{patientEmail}</p>
                </div>
            </div>

            <Link to={address} > <img src={go}/> </Link>
        </div>
    );
}

PatientTab.propTypes = {
    patientName: PropTypes.string,
    patientEmail: PropTypes.string,
    imgSource: PropTypes.any,
    address: PropTypes.string,
}
