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

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        api.get('/users', {
            headers: { authorization: accessToken },
        }).then((response) => {
            setPatients(response.data);
        });
    }, []);

    return (
        <>
            <NavBar
                className="navBar"
                bond="Psicologo"
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
                    <>
                        {patients.length === 0 ? (
                            <div className="warningLabel">
                                <div className="noPatients">
                                    Não há pacientes cadastrados
                                </div>
                            </div>
                        ) : (
                            <RealizeSearch
                                patients={patients}
                                location={props.location}
                                src={MagnifyingGlass}
                                search={search}
                            />
                        )}
                    </>
                </div>
            </div>
        </>
    );
}

PatientList.propTypes = {
    location: PropTypes.object,
};
