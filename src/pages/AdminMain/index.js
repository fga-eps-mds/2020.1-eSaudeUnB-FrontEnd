/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import { FaTimesCircle } from 'react-icons/fa';

import api from '../../services/api';
import './styles.css';
import SearchBar from '../../components/SearchBar';
import MagnifyingGlass from '../../assets/images/lupa.svg';

// import RealizeSearch from '../../components/RealizeSearch';

export default function AdminMain() {
    const [psychologists, setPsychologists] = useState([]);
    const [currentPsychologyEmail, setCurrentPsychologyEmail] = useState('');
    const [show, setShow] = useState(false);
    const [queryValue, setQueryValue] = useState('');

    const history = useHistory();

    function getOut() {
        localStorage.removeItem('accessToken');
        history.push('/admin');
    }

    const loadPsychologists = async () => {
        const accessToken = localStorage.getItem('accessToken');

        try {
            const response = await api.get('/psychologists', {
                headers: { authorization: accessToken },
            });

            let recoverPsychology = response.data;

            if (queryValue !== '') {
                recoverPsychology = response.data.filter(
                    (psychologist) => psychologist.name.toLowerCase().includes(
                        queryValue.toLowerCase(),
                    ) || psychologist.lastName.toLowerCase().includes(
                        queryValue.toLowerCase(),
                    ),
                );
            }

            setPsychologists(recoverPsychology);
        } catch (error) {
            if (error.response.status === 401) {
                return setTimeout(() => {
                    localStorage.removeItem('accessToken');
                    history.push('/admin');
                }, 2000);
            }
        }
    };

    useEffect(() => {
        const loadProfessionals = async () => {
            const accessToken = localStorage.getItem('accessToken');

            try {
                const responseProfessional = await api.get('/psychologists', {
                    headers: { authorization: accessToken },
                });

                setPsychologists(responseProfessional.data);
            } catch (error) {
                const { status } = error.response;
                if (status === 401) {
                    return setTimeout(() => {
                        localStorage.removeItem('accessToken');
                        history.push('/admin');
                    }, 2000);
                }
            }
        };

        loadProfessionals();
    }, [history]);

    useEffect(() => () => {
        setPsychologists([]);
    }, []);

    const showConfirmation = (email) => {
        setCurrentPsychologyEmail(email);
        setShow(true);
    };

    const deletePsychologist = async () => {
        const accessToken = localStorage.getItem('accessToken');

        await api.delete(`/psychologist/${currentPsychologyEmail}`,
            { headers: { authorization: accessToken } });
        const response = await api.get('/psychologists', {
            headers: { authorization: accessToken },
        });
        setPsychologists(response.data);
        setShow(false);
    };

    return (
        <div className="list-container">
            {show ? (
                <header className="alert-component">
                    <Alert className="alert" variant="secondary">
                        Deseja mesmo excluir este profissional?
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button
                                className="react-bootstrap-button success-button"
                                onClick={() => deletePsychologist()}
                            >
                                Sim
                            </Button>

                            <Button
                                className="react-bootstrap-button danger-button"
                                onClick={() => setShow(false)}
                            >
                                Não
                            </Button>
                        </div>
                    </Alert>
                </header>
            ) : (
                    <></>
                )}
            <div className="psychologist-list">
                <div className="nav">
                    <button className="new-psychologist" onClick={() => history.push('/admin/psychologist/create')}>
                        Cadastrar novo Profissional
                    </button>
                    <div className="count">
                        <p><strong>Profissionais cadastrados:</strong> {psychologists.length}</p>
                    </div>
                    <button className="get-out" onClick={() => getOut()}>
                        Sair
                    </button>
                </div>
                <div className="psychologists-wrapper">
                    <div className="search-psychologists">
                        <SearchBar
                            placeholder="Pesquisar"
                            className="searchBar"
                            value={queryValue}
                            onChange={setQueryValue}
                            icon={MagnifyingGlass}
                            triggerQuery={loadPsychologists}
                        />
                    </div>
                    {
                        psychologists.length !== 0 ? (
                            <div className="psychologists-cards">
                                {psychologists.map((psychologist) => (
                                    <article key={psychologist.email}>
                                        <p>
                                            <strong>Nome: </strong>
                                            {`${psychologist.name} ${psychologist.lastName}`}
                                        </p>

                                        <p>
                                            <strong>E-mail:</strong> {psychologist.email}
                                        </p>

                                        <p>
                                            <strong>Especialização:</strong>
                                            {' '}{psychologist.specialization
                                                ? psychologist.specialization
                                                : 'Não informado'}
                                        </p>
                                        <button
                                            onClick={() => showConfirmation(psychologist.email)}
                                        >
                                            Excluir Profissional
                                        </button>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="message-warning">
                                <FaTimesCircle color="#0459AE" size="2em" /> <span>Nenhum profissional foi encontrado</span>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
