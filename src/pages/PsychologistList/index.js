import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import api from '../../services/api';
import './styles.css';

import MagnifyingGlass from '../../assets/images/lupa.svg';
import go from '../../assets/images/go.svg';

import userIcon from '../../assets/images/userIcon.svg';

import NavBar from '../../components/NavBar';
import SearchBar from '../../components/SearchBar';

export default function PsychologistList(props) {
    const [search, setSearch] = useState('');
    const [psychologist, setPsychologist] = useState([]);
    const [actualUser, setActualUser] = useState({});

    useEffect(() => {
        api.get('/psychologists').then((response) => {
            setPsychologist(response.data);
        });
        setActualUser(props.location.state.data);
    }, []);

    return (
        <div className="psychologistListContainer">
            <NavBar className="navBar" actualUser={actualUser} />
            <div className="content">
                <SearchBar
                    className="searchBar"
                    value={search}
                    onChange={setSearch}
                    icon={MagnifyingGlass}
                />

                <div className="psy">
                    {!search
                        ? psychologist.map((psy) => (
                            <Accordion key={psy.email}>
                                <div className="patientTab">
                                    <div className="patientInfos">
                                        {psy.userImage != null ? (
                                            <img
                                                className="patientImg"
                                                src={atob(Buffer.from(psy.userImage, 'binary').toString('base64'))}
                                                alt={psy.name}
                                            />
                                        ) :
                                            (
                                                <img
                                                    className="patientImg"
                                                    src={userIcon}
                                                    alt={psy.name}
                                                />
                                            )}

                                        <div className="minPatient">
                                            <p className="cardName">
                                                Nome:{' '}
                                                {`${psy.name} ${psy.lastName}`}
                                            </p>
                                            <p>email: {psy.email}</p>

                                            <Accordion.Collapse eventKey="0">
                                                <div className="cardToggle">
                                                    <p>
                                                        Biografia:{' '}
                                                        {`${psy.biography}`}
                                                    </p>
                                                    <Link
                                                        to={{
                                                            pathname: `/psychologist/list/schedule/${psy.email}`,
                                                            state: {
                                                                data: actualUser,
                                                            },
                                                        }}
                                                    >
                                                        <button>
                                                            Agendar
                                                            atendimento
                                                        </button>
                                                    </Link>
                                                </div>
                                            </Accordion.Collapse>
                                        </div>
                                    </div>
                                    <Accordion.Toggle eventKey="0">
                                        <Link
                                            className='button'
                                            to={'#'}
                                        >
                                            <img src={go} alt="go" />{' '}
                                        </Link>
                                    </Accordion.Toggle>
                                </div>
                            </Accordion>
                        ))
                        : psychologist
                            .filter((psy) => {
                                const fullName = `${psy.name} ${psy.lastName}`;
                                return fullName
                                    .toUpperCase()
                                    .includes(search.toUpperCase());
                            })
                            .map((psy) => (
                                <Accordion key={psy.email}>
                                    <div
                                        className="patientTab"
                                    >
                                        <div className="patientInfos">
                                            {psy.userImage != null ? (
                                                <img
                                                    className="patientImg"
                                                    src={atob(Buffer.from(psy.userImage, 'binary').toString('base64'))}
                                                    alt={psy.name}
                                                />
                                            ) :
                                                (
                                                    <img
                                                        className="patientImg"
                                                        src={userIcon}
                                                        alt={psy.name}
                                                    />
                                                )}
                                            <div className="minPatient">
                                                <p className="cardName">
                                                    Nome:{' '}
                                                    {`${psy.name} ${psy.lastName}`}
                                                </p>
                                                <p>email: {psy.email}</p>

                                                <Accordion.Collapse eventKey="0">
                                                    <div className="cardToggle">
                                                        <p>
                                                            Bibliografia:{' '}
                                                            {`${psy.bibliography}`}
                                                        </p>
                                                        <Link
                                                            to={{
                                                                pathname: `/psychologist/list/schedule/${psy.email}`,
                                                                state: {
                                                                    data: actualUser,
                                                                },
                                                            }}
                                                        >
                                                            <button>
                                                                Agendar
                                                                atendimento
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </Accordion.Collapse>
                                            </div>
                                        </div>
                                        <Accordion.Toggle eventKey="0">
                                            <Link className='button' to={'#'}>
                                                <img src={go} alt="go" />{' '}
                                            </Link>
                                        </Accordion.Toggle>
                                    </div>
                                </Accordion>
                            ))}
                </div>
            </div>
        </div>
    );
}

PsychologistList.propTypes = {
    location: PropTypes.object,
};
