import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import go from '../assets/images/go.svg';
import userIcon from '../assets/images/userIcon.svg';

export default function SearchedPatients(props) {
    const {
        patients, search,
    } = props;

    return (
        patients
            .filter((patient) => {
                const fullName = `${patient.name} ${patient.lastName}`;
                return fullName
                    .toUpperCase()
                    .includes(search.toUpperCase());
            }).length !== 0 ? (
                patients
                    .filter((patient) => {
                        const fullName = `${patient.name} ${patient.lastName}`;
                        return fullName
                            .toUpperCase()
                            .includes(search.toUpperCase());
                    })
                    .map((patient) => (
                        <div key={patient.email} className="patientTab">
                            <div className="patientInfos">
                                {patient.userImage != null ? (
                                    <img
                                        className="patientImg"
                                        src={atob(Buffer.from(patient.userImage, 'binary').toString('base64'))}
                                        alt={patient.name}
                                    />
                                )
                                    : (
                                        <img
                                            className="patientImg"
                                            src={userIcon}
                                            alt={patient.name}
                                        />)}
                                <div className="minPatient">
                                    <p>{`${patient.name} ${patient.lastName}`}</p>
                                    <p>{patient.email}</p>
                                </div>
                            </div>

                            <Link
                                className="button"
                                to={{
                                    pathname: `/patient/list/${patient.email}`,
                                }}>
                                <img src={go} alt="go" />{' '}
                            </Link>
                        </div>
                    ))
            ) : (
                <div className="warningLabel">
                    <div className="noPatients">
                        Não foram encontrados pacientes.
                    </div>
                </div>
            )
    );
}

SearchedPatients.propTypes = {
    patients: PropTypes.array,
    search: PropTypes.string,
    location: PropTypes.object,
};
