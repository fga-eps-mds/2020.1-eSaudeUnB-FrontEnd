import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';

import api from '../../services/api';
import './styles.css';

export default function AdminMain() {
    const [psyArray, setPsyArray] = useState([]);
    const [actualPsyEmail, setActualPsyEmail] = useState('');
    const [show, setShow] = useState(false);

    const history = useHistory();

    //Esse useEffect está recebendo causando um erro na página Admin/psy/list
    //Como chegar ao erro:
    //                      -1. Crie um psicólogo válido, que ao ser redirecionado para a página
    //                      Admin/psy/list o erro estará no console

    useEffect(() => {
        async function fetchData() {
            const response = await api.get('/admin/psy/list');
            setPsyArray(response.data);
        }
        fetchData();
    }, []);

    const showConfirmation = (email) => {
        setActualPsyEmail(email);
        setShow(true);
    };

    const deletePsychologist = async () => {
        await api.delete(`/admin/psy/${actualPsyEmail}`);
        const response = await api.get('/admin/psy/list');
        setPsyArray(response.data);
        setShow(false);
    };

    return (
        <div className="list-container">
            {show ? (
                <header className="alert-component">
                    <Alert className="alert" variant='secondary'>
                        Deseja mesmo excluir este psicólogo?
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button className="react-bootstrap-button" onClick={deletePsychologist} variant="outline-success">
                                Sim
                            </Button>

                            <Button className="react-bootstrap-button" onClick={() => setShow(false)} variant="outline-danger">
                                Não
                            </Button>
                        </div>
                    </Alert>
                </header>
            ) : (
                    <div></div>
                )}
            <div className="psychologist-list">
                <div className="nav">
                    <button className="new-psychologist" onClick={() => history.push('/admin/psy/create')}>
                        Cadastrar novo Psicólogo
                    </button>
                    <div className="count">
                        <p>
                            Psicólogos cadastrados: {psyArray.length}
                        </p>
                    </div>
                    <button className="get-out" onClick={() => history.push('/admin/login')}>
                        Sair
                    </button>
                </div>
                <div className="psychologists-cards">
                    {psyArray.map((psychologist) => (
                        <article key={psychologist.email}>
                            <p><strong>Nome: </strong>{`${psychologist.name} ${psychologist.lastName}`}</p>
                            <p><strong>E-mail:</strong> {psychologist.email}</p>
                            <p>
                                <strong>Especialização:</strong> {psychologist.specialization ? (psychologist.specialization) : ('Não informado')}
                            </p>
                            <p>
                                <strong>Biografia:</strong> {psychologist.bibliography ? (psychologist.bibliography) : ('Não informado')}
                            </p>
                            <button onClick={() => showConfirmation(psychologist.email)}>Excluir Psicólogo</button>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
