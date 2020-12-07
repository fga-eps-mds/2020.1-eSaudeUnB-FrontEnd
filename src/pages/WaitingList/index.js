import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import api from '../../services/api';
import './styles.css';
import NavBar from '../../components/NavBar';

export default function WaitingList(props) {
    const [waitingList, setWaitingList] = useState([]);

    const [show, setShow] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [variant, setVariant] = useState('');

    const history = useHistory();
    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');

    useEffect(() => {
        api.get('/waitingList', {
            headers: { authorization: accessToken },
        }).then((response) => {
            setWaitingList(response.data);
        });
    }, [accessToken]);

    async function getOutOfWaitingList() {
        await api.delete(`/waitingList/${user}`, {
            headers: { authorization: accessToken },
        });

        window.location.reload();
    }

    async function registerOnWaitingList() {
        if (
            waitingList.find((element) => element.emailPatient === user)
        ) {
            setShow(true);
            setVariant('danger');
            setAlertText('Só é possível entrar uma vez na lista de espera.');
            setInterval(() => {
                setShow(false);
            }, 2000);
            return;
        }

        await api.post('/waitingList', {
            emailPatient: user,
        },
        { headers: { authorization: accessToken } });
        window.location.reload();
    }

    return (
        <div className="waiting-list-container">
            <NavBar className="navBar" bond="Patient" actualUser={props.location.state.data} />
            {show ? (
                <Alert className="alert" variant={variant}>
                    {alertText}
                </Alert>
            ) : (
                <div></div>
            )}
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
                                </tr>
                            </thead>
                            <tbody>
                                {waitingList.map((item, index) => (
                                    <tr key={index} className="waiting-list-item">
                                        <td>{`${index + 1}º`}</td>
                                        <td>{`${item.namePatient}`}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div className="wl-buttons">
                        <button className="waitingListButton" onClick={() => registerOnWaitingList()}>Entrar para a lista de espera</button>
                        <button className="getOutOfWLButton" onClick={() => getOutOfWaitingList()}>Sair da lista de espera</button>
                        <button
                            className="goBackButton"
                            onClick={() => history.push({
                                pathname: '/main',
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

WaitingList.propTypes = {
    location: PropTypes.object,
};
