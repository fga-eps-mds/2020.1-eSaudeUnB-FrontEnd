import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

import MagnifyingGlass from '../../assets/images/lupa.svg';
import go from '../../assets/images/go.svg';

import userIcon from '../../assets/images/userIcon.svg';

import NavBar from '../../components/NavBar';
import SearchBar from '../../components/SearchBar';

export default function PsychologistList() {
    const [search, setSearch] = useState('');
    const [psychologist, setPsychologist] = useState([]);

    useEffect(() => {
        api.get('/admin/psy/list').then((response) => {
            setPsychologist(response.data);
        });
    }, []);

    return (
        <div className="psychologistListContainer">
            <div className="content">
                <NavBar className="navBar" />
                <SearchBar
                    className="searchBar"
                    value={search}
                    onChange={setSearch}
                    icon={MagnifyingGlass}
                />

                <div className="psy">
                    {
                        !search ? (
                            psychologist
                                .map((psy) => (
                                    <div key={psy.email} className="patientTab">
                                        <div className="patientInfos">
                                            <img className="patientImg" src={userIcon} alt={psy.name} />
                                            <div className="minPatient">
                                                <p>{`${psy.name} ${psy.lastName}`}</p>
                                                <p>{psy.email}</p>
                                            </div>
                                        </div>

                                        <Link className="button" to={`#`}>
                                            <img src={go} alt="go" />{' '}
                                        </Link>
                                    </div>
                                ))
                        ) : (
                            psychologist
                                .filter((psy) => {
                                    const fullName = `${psy.name} ${psy.lastName}`;
                                    return fullName.toUpperCase().includes(search.toUpperCase());
                                })
                                .map((psy) => (
                                    <div key={psy.email} className="patientTab">
                                        <div className="patientInfos">
                                            <img className="patientImg" src={userIcon} alt={psy.name} />
                                            <div className="minPatient">
                                                <p>{`${psy.name} ${psy.lastName}`}</p>
                                                <p>{psy.email}</p>
                                            </div>
                                        </div>

                                        <Link className="button" to={`#`}>
                                            <img src={go} alt="go" />{' '}
                                        </Link>
                                    </div>
                                ))
                        )
                    }
                </div>
            </div>
        </div>
    );
}
