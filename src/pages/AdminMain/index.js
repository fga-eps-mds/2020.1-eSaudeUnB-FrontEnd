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

    useEffect(() => {
        async function fetchData() {
            const response = await api.get('/admin/psy/list');
            setPsyArray(response.data);
        }
        fetchData();
    }, []);

    // const deletePsychologist = async (email) => {
    //     setShow(true);
    //     if (del) {
    //         await api.delete(`/admin/psy/${email}`);
    //         const response = await api.get('/admin/psy/list');
    //         setPsyArray(response.data);
    //         setShow(false);

    //     } else {
    //         const response = await api.get('/admin/psy/list');
    //         setPsyArray(response.data);
    //         setShow(false);
    //     }
    // };

    const showConfirmation = (email) => {
        setActualPsyEmail(email);
        setShow(true);
    }

    const deletePsychologist = async () => {
        await api.delete(`/admin/psy/${actualPsyEmail}`);
        const response = await api.get('/admin/psy/list');
        setPsyArray(response.data);
        setShow(false);
    }

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
                        <article key={psychologist.id}>
                            <p>
                                <strong>Nome: </strong>{`${psychologist.name} ${psychologist.lastName}`}
                            </p>
                            <p><strong>E-mail:</strong> {psychologist.email}</p>
                            <p>
                                <strong>Especialização:</strong> {psychologist.specialization ? (psychologist.specialization) : (`Não informado`)}
                            </p>
                            <p>
                                <strong>Bibliografia:</strong> {psychologist.bibliography ? (psychologist.bibliography) : (`Não informado`)}
                            </p>
                            <button onClick={() => showConfirmation(psychologist.email)}>Excluir Psicólogo</button>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
