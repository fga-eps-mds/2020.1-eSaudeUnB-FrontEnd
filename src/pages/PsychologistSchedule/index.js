import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import api from '../../services/api';
import NavBar from '../../components/NavBar';

import './styles.css';

export default function PsychologistSchedule() {
    const [scheduleItems, setScheduleItems] = useState([]);
    const [show, setShow] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [variant, setVariant] = useState('');
    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');

    useEffect(() => {
        api.post(
            '/calendary/update',
            {
                email: user,
            },
            { headers: { authorization: accessToken } },
        ).then((response) => {
            setScheduleItems(response.data);
        });
    }, [accessToken, user]);

    function removeScheduleItem(index) {
        const temp = [...scheduleItems];
        temp.splice(index, 1);
        setScheduleItems(temp);
    }

    async function putCalendar(event) {
        event.preventDefault();
        await api.put(
            '/calendary/update/',
            {
                email: user,
                weekDay: scheduleItems,
            },
            {
                headers: { authorization: accessToken },
            },
        );
        setShow(true);
        setVariant('success');
        setAlertText('Suas alterações foram salvas');
        setInterval(() => {
            setShow(false);
        }, 3000);
    }

    return (
        <div className="psychologistSchedule">
            <NavBar
                className="navBar"
                bond="Psychologist"
            />
            <div className="content">
                {show ? (
                    <Alert className="alert" variant={variant}>
                        {alertText}
                    </Alert>
                ) : (
                    <div></div>
                )}
                <form className="form" onSubmit={putCalendar}>
                    <div className="formContent">
                        <legend className="legend">
                            Horários Cadastrados
                            <Link
                                className="link"
                                to={{
                                    pathname: '/psychologist/calendar',
                                    state: {
                                        data: user,
                                    },
                                }}
                            >
                                + Novo Horário
                            </Link>
                        </legend>

                        <div className="schedule">
                            {scheduleItems.map((scheduleItem, index) => (
                                <div
                                    key={scheduleItem._id || scheduleItem.id}
                                    className="schedule-item"
                                >
                                    <div className="select-box">
                                        <label>Data</label>
                                        <input
                                            value={scheduleItem.day+'/'+scheduleItem.month+'/'+scheduleItem.year}
                                            name="weekDay"
                                            label="Dia da semana"
                                        />
                                    </div>

                                    <div className="input-box">
                                        <label>Das</label>
                                        <input
                                            name="from"
                                            label="Das"
                                            type="time"
                                            value={scheduleItem.from}
                                            readOnly="true"
                                        />
                                    </div>

                                    <div className="input-box">
                                        <label>Até</label>
                                        <input
                                            name="to"
                                            label="Até"
                                            type="time"
                                            value={scheduleItem.to}
                                            readOnly="true"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeScheduleItem(index)
                                        }
                                    >
                                        Remover
                                    </button>
                                </div>
                                ))}
                            </div>
                        <footer className="footer">
                            <button type="submit">
                                Salvar cadastro
                            </button>
                        </footer>
                    </div>
                </form>
            </div>
        </div>
    );
}

PsychologistSchedule.propTypes = {
    location: PropTypes.object,
};
