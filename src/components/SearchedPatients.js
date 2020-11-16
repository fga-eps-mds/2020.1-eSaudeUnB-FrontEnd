import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import go from '../assets/images/go.svg';
import userIcon from '../assets/images/userIcon.svg';

export default function SearchedPatients(props) {
    const {
        patients, search, location,
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
                                <img className="patientImg" src={userIcon} alt={patient.name} />
                                <div className="minPatient">
                                    <p>{`${patient.name} ${patient.lastName}`}</p>
                                    <p>{patient.email}</p>
                                </div>
                            </div>

                            <Link
                                className="button"
                                to={{
                                    pathname: `/patient/list/${patient.email}`,
                                    state: {
                                        data: location.state.data,
                                    },
                                }}>
                                <img src={go} alt="go" />{' '}
                            </Link>
                        </div>
                    ))
            ) : (
                <div className="patientTab noPatients">
                    Não há pacientes cadastrados com esse nome
                </div>
            )
    );
}

SearchedPatients.propTypes = {
    patients: PropTypes.array,
    search: PropTypes.string,
    location: PropTypes.object,
};
