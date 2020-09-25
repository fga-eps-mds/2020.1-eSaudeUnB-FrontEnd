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
                            <strong>
                                {psychologist.name}
                                {' '}
                                {psychologist.lastName}
                            </strong>
                            <p>{psychologist.email}</p>
                            <p>{psychologist.specialization}</p>
                            <p>{psychologist.bibliography}</p>
                            <button onClick={() => deletePsychologist(psychologist.email)}>Excluir Psicólogo</button>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
