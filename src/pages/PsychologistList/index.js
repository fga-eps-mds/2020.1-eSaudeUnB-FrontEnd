import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
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

    function rotate() {
        var roda = 270;
        var img = document.getElementById("teste24");
        img.style.transform = "rotate(" + roda + "deg)"
    }

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
                                    <Accordion >
                                        <div key={psy.email} className="patientTab">
                                            <div className="patientInfos">
                                                <img className="patientImg" src={userIcon} alt={psy.name} />
                                                <div className="minPatient">
                                                    <p>Nome: {`${psy.name} ${psy.lastName}`}</p>
                                                    <p>email: {psy.email}</p>

                                                    <Accordion.Collapse eventKey="0">
                                                        <div className="cardToggle">
                                                            <p>
                                                                Bibliografia:{' '}
                                                                {`${psy.bibliography}`}
                                                            </p>
                                                            <button>
                                                                Agendar atendimento
                                                      </button>
                                                        </div>
                                                    </Accordion.Collapse>
                                                </div>
                                            </div>
                                            <Accordion.Toggle eventKey="0">
                                                <div className="teste">
                                                    <Link className="button" to={`#`}>
                                                        <img src={go} alt="go" />{' '}
                                                    </Link>
                                                </div>
                                            </Accordion.Toggle>
                                        </div>
                                    </Accordion>
                                )))
                            : psychologist
                                .filter((psy) => {
                                    const fullName = `${psy.name} ${psy.lastName}`;
                                    return fullName
                                        .toUpperCase()
                                        .includes(search.toUpperCase());
                                })
                                .map((psy) => (
                                    <Accordion>
                                        <div
                                            key={psy.email}
                                            className="patientTab"
                                        >
                                            <div className="patientInfos">
                                                <img
                                                    className="patientImg"
                                                    src={userIcon}
                                                    alt={psy.name}
                                                />
                                                <div className="minPatient">
                                                    <p>
                                                        Nome:{' '}
                                                        {`${psy.name} ${psy.lastName}`}
                                                    </p>
                                                    <p>email: {psy.email}</p>

                                                </div>
                                            </div>
                                            <Accordion.Toggle eventKey="0">
                                                <Link className="button" onClick={rotate} to={`#`}>
                                                    <img id="teste24" src={go} alt="go" />{' '}
                                                </Link>
                                            </Accordion.Toggle>
                                        </div>
                                    </Accordion>
                                ))
                    }
                </div>
            </div>
        </div>
    );
}
