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

    function getOut() {
        localStorage.removeItem("accessToken");

        history.push('/admin');
    }

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");

        api.get('/psychologists',{
            headers: {"authorization": accessToken} 
        })
            .then((response) => {
                setPsyArray(response.data);
            })
            .catch(err => {
                if(err.response.status === 401) {
                    return setTimeout(() => {
                        getOut();
                    }, 2000);
                }
            });

        try{
            const accessToken = localStorage.getItem("accessToken");

            const response = api.get('/psychologists',{
                headers: {"authorization": accessToken} 
            });
            if(response.status === 200) {
                setPsyArray(response.data);
            }
        }catch(err) {
            console.log(err);
            if(err.response.status === 401) {
                getOut();
            }
        }
    }, []);

    const showConfirmation = (email) => {
        setActualPsyEmail(email);
        setShow(true);
    };

    const deletePsychologist = async () => {
        const accessToken = localStorage.getItem("accessToken");
        
        await api.delete(`/psychologist/${actualPsyEmail}`);
        const response = await api.get('/psychologists',{
            headers: {"authorization": accessToken} 
        });
        setPsyArray(response.data);
        setShow(false);
    };

    return (
        <div className="list-container">
            {show ? (
                <header className="alert-component">
                    <Alert className="alert" variant="secondary">
                        Deseja mesmo excluir este psicólogo?
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button
                                className="react-bootstrap-button"
                                onClick={deletePsychologist}
                                variant="outline-success"
                            >
                                Sim
                            </Button>

                            <Button
                                className="react-bootstrap-button"
                                onClick={() => setShow(false)}
                                variant="outline-danger"
                            >
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
                    <button className="new-psychologist" onClick={() => history.push('/admin/psychologist/create')}>
                        Cadastrar novo Psicólogo
                    </button>
                    <div className="count">
                        <p>Psicólogos cadastrados: {psyArray.length}</p>
                    </div>
                    <button className="get-out" onClick={getOut}>
                        Sair
                    </button>
                </div>
                <div className="psychologists-cards">
                    {psyArray.map((psychologist) => (
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
                                {psychologist.specialization
                                    ? psychologist.specialization
                                    : 'Não informado'}
                            </p>
                            <button
                                onClick={() => showConfirmation(psychologist.email)
                                }
                            >
                                Excluir Psicólogo
                            </button>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
