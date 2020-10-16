import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';
import './styles.css';

import MagnifyingGlass from '../../assets/images/lupa.svg';
import go from '../../assets/images/go.svg';

import userIcon from '../../assets/images/userIcon.svg';

import NavBar from '../../components/NavBar';
import SearchBar from '../../components/SearchBar';

export default function PatientList(props) {
    const [search, setSearch] = useState('');
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        api.get('/users').then((response) => {
            setPatients(response.data);
        });
    }, []);

    return (
        <div className="patientListContainer">
            <NavBar className="navBar" bond="Psychologist" actualUser={props.location.state.data} />
            <div className="content">
                <SearchBar
                    className="searchBar"
                    value={search}
                    onChange={setSearch}
                    icon={MagnifyingGlass}
                />

                <div className="patients">
                    {
                        patients.length === 0 ? (
                            <div className="patientTab noPatients">Não há pacientes cadastrados</div>
                        ) : (
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
                                                        data: props.location.state.data,
                                                    },
                                                }}
                                            >
                                                <img src={go} alt="go" />{' '}
                                            </Link>
                                        </div>
                                    ))
                            ) : (
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

                                                    <Link className="button" to={`/patient/list/${patient.email}`}>
                                                        <img src={go} alt="go" />{' '}
                                                    </Link>
                                                </div>
                                            ))
                                    ) : (
                                        <div className="patientTab noPatients">
                                                    Não há pacientes cadastrados com esse nome
                                        </div>
                                    )
                            )
                        )
                    }
                </div>
            </div>
        </div>
    );
}

PatientList.propTypes = {
    location: PropTypes.object,
};
