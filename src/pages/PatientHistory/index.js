import React from 'react';

import './styles.css';

export default function PatientHistory(props) {

    return(
        <div className="PatientHistoryContainer">
            <div className="content">
                <p>{props.match.params.id}</p>
            </div>
        </div>
    );
}