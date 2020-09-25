import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

import MagnifyingGlass from '../../assets/images/lupa.svg';
import go from '../../assets/images/go.svg';

import userIcon from '../../assets/images/userIcon.svg';

import NavBar from '../../components/NavBar';
import SearchBar from '../../components/SearchBar';

export default function PatientList() {
    const [search, setSearch] = useState('');
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        api.get('/users').then((response) => {
            setPatients(response.data);
        });
    }, []);

    async function findPatients() {
        try {
            const response = await api.get(`/user/${search}`);

            console.log(response);

            if (response.status === 200) {
                if (response.data) {
                    setPatients(response.data);
                }
            }
        } catch (err) {
            alert('Falha ao buscar paciente, tente novamente');
        }

        setSearch('');
    }

    return (
        <div className="patientListContainer">
            <div className="content">
                <NavBar className="navBar" />
                <SearchBar
                    className="searchBar"
                    value={search}
                    onChange={setSearch}
                    icon={MagnifyingGlass}
                    onClick={findPatients}
                />

                <div className="patients">
                    {patients.map((patient) => (
                        <div key={patient.email} className="patientTab">
                            <div className="patientInfos">
                                <img className="patientImg" src={userIcon} alt={patient.name} />
                                <div className="minPatient">
                                    <p>{`${patient.name} ${patient.lastName}`}</p>
                                    <p>{patient.email}</p>
                                </div>
                            </div>

                            <Link className="button" to={`patient-list/${patient.email}`}>
                                <img src={go} alt="go" />{' '}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
