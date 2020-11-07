import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';
import './styles.css';
import NavBar from '../../components/NavBar';

export default function WaitingList(props) {
    // const [waitingList, setWaitingList] = useState([]);

    const history = useHistory();

    // useEffect(() => {
    //     setWaitingList();
    // }, []);

    function registerOnWaitingList() {
        alert('teste');
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
                        teste
                        {/* {waitingList} */}
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
