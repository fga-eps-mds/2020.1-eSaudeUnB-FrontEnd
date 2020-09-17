import React from 'react';
import PropTypes from 'prop-types';

import go from '../assets/images/go.svg';
import '../assets/styles/PatientTab.css';

export default function ({imgSource, patientName, patientEmail}) {
    return (
        <div className="patientTab">
            <div className="patientInfos">
                <img className="patientImg" src={imgSource} alt={patientName} />
                <div className="minPatient">
                    <p>{patientName}</p>
                    <p>{patientEmail}</p>
                </div>
            </div>

            <button> <img src={go} /> </button>
        </div>
    );
}

PatientTab.propTypes = {
    patientName: PropTypes.string,
    patientEmail: PropTypes.string,
    imgSource: PropTypes.any,
}
