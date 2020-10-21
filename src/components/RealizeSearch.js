import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import go from '../assets/images/go.svg';
import userIcon from '../assets/images/userIcon.svg';

import SearchedPatients from './SearchedPatients';

export default function RealizeSearch(props) {
    const { search, location, patients } = props;

    return (
        !search ? (
            patients
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
                            }}
                        >
                            <img src={go} alt="go" />{' '}
                        </Link>
                    </div>
                ))
        ) : (
            <SearchedPatients patients={patients} location={location} search={search} />
        )
    );
}

RealizeSearch.propTypes = {
    location: PropTypes.object,
    search: PropTypes.string,
    patients: PropTypes.array,
};
