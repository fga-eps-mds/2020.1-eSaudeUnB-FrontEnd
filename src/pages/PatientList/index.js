import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import './styles.css';

import Lupa from '../../assets/images/lupa.svg';

import userIcon from '../../assets/images/userIcon.svg';

import NavBar from '../../components/NavBar';
import SearchBar from '../../components/SearchBar';
import PatientTab from '../../components/PatientTab'

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
                        <PatientTab
                            key={patient.id}
                            imgSource={userIcon}
                            patient={patient}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}



