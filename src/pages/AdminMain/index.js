import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default function AdminMain() {
    const [psyArray, setPsyArray] = useState([]);

    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            const response = await api.get('/admin/psy/list');
            setPsyArray(response.data);
        }
        fetchData();
    }, []);

    const deletePsychologist = async (email) => {
        if (window.confirm('Deseja excluir esse psicólogo?')) {
            await api.delete(`/admin/psy/${email}`);
            const response = await api.get('/admin/psy/list');
            setPsyArray(response.data);
        } else {
            const response = await api.get('/admin/psy/list');
            setPsyArray(response.data);
        }
    };

    return (
        <div className="list-container">
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
                            <button onClick={() => deletePsychologist(psychologist.email)}>Excluir Psicólogo</button>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
