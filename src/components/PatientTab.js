import React from 'react';

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
