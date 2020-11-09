import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import api from '../../services/api';
import './styles.css';
import NavBar from '../../components/NavBar';

export default function WaitingList(props) {
    const [waitingList, setWaitingList] = useState([]);

    const history = useHistory();

    useEffect(() => {
        api.get(`/waitingList/${props.location.state.psychologist.email}`)
            .then((response) => {
                setWaitingList(response.data);
            });
    }, []);

    async function registerOnWaitingList() {
        const response = await api.post('/waitingList', {
            email: props.location.state.psychologist.email,
            emailPatient: props.location.state.data.email,
            namePatient: props.location.state.data.name + " " + props.location.state.data.lastName
        });
        window.location.reload();
    }

    return (
        <div className="waiting-list-container">
            <NavBar className="navBar" bond="Patient" actualUser={props.location.state.data} />
            <div className="content">
                <div className="list">
                    <div className="list-title">
                        <h1>Lista de Espera</h1>
                    </div>
                    <div className="list-content">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Posição</th>
                                    <th>Nome</th>
                                    <th>Data da requisição</th>
                                </tr>
                            </thead>
                            <tbody>
                                {waitingList.map((item, index) => {
                                    return (
                                        <tr className="waiting-list-item">
                                            <td>{`${index + 1}º`}</td>
                                            <td>{`${item.namePatient}`}</td>
                                            <td>{`${item.createdAt}`}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                    <div className="wl-buttons">
                        <button className="waitingListButton" onClick={() => registerOnWaitingList()}>Entrar para a lista de espera</button>
                        <button
                            className="goBackButton"
                            onClick={() => history.push({
                                pathname: `/main`,
                                state: {
                                    data: props.location.state.data,
                                },
                            })}
                        >
                            Voltar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
