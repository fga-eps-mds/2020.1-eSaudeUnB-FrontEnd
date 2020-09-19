import React from 'react';

import '../assets/styles/PatientHistory.css';

export default function PatientHistory(props) {
    return (
        <div className="patientHistory">
            <div className="tab">
                <button className="tabLink" onClick="openHistory(event, test)">test</button>
            </div>
            <div className="content">
                <div id="test" className="tabContent">
                    <h2>Profissional: Dr. Hilmer Rodrigues Data: 07/SET/2020 Encaminhamento: Rede Interna</h2>
                    <h1>Queixa Principal</h1>
                </div>
            </div>
        </div>
    );
}
