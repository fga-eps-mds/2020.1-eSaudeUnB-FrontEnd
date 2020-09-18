import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

import Lupa from '../../assets/images/lupa.svg';
import go from '../../assets/images/go.svg';

import userIcon from '../../assets/images/userIcon.svg';

import NavBar from '../../components/NavBar';
import SearchBar from '../../components/SearchBar';

export default function PatientList() {
    const [search, setSearch] = useState("");
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        api.get("/users")
            .then(response => {
                setPatients(response.data);
            })
    }, []);

    return (
        <div className="patientListContainer">
            <div className="content">
                <NavBar className="navBar" />

                <SearchBar
                    className="searchBar"
                    value={search}
                    onChange={setSearch}
                    icon={Lupa}
                />

                <div className="patients">
                    {patients.map((patient) => (
                        <div className="patientTab">
                            <div className="patientInfos">
                                <img className="patientImg" src={userIcon} alt={patient.name} />
                                <div className="minPatient">
                                    <p>{patient.name}</p>
                                    <p>{patient.email}</p>
                                </div>
                            </div>

                            <Link
                                className="button"
                                to={`patient-list/${patient.id}`}
                            >
                                <img src={go} />{" "}
                            </Link>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
}



