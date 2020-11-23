import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';
import './styles.css';

import MagnifyingGlass from '../../assets/images/lupa.svg';

import NavBar from '../../components/NavBar';
import SearchBar from '../../components/SearchBar';
import RealizeSearch from '../../components/RealizeSearch';

export default function PatientList(props) {
    const [search, setSearch] = useState('');
    const [patients, setPatients] = useState([]);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        api.get('/users', {
            headers: { authorization: accessToken },
        }).then((response) => {
            setPatients(response.data);
        });
    });

    return (
        <>
            <NavBar
                className="navBar"
                bond="Psychologist"
            />
            <div className="patientListContainer">
                <div className="content">
                    <SearchBar
                        placeholder="Pesquisar"
                        className="searchBar"
                        value={search}
                        onChange={setSearch}
                        icon={MagnifyingGlass}
                    />
                    <div className="patients">
                        {patients.length === 0 ? (
                            <div className="patientTab noPatients">
                                Não há pacientes cadastrados
                            </div>
                        ) : (
                            <RealizeSearch
                                patients={patients}
                                location={props.location}
                                src={MagnifyingGlass}
                                search={search}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

PatientList.propTypes = {
    location: PropTypes.object,
};
