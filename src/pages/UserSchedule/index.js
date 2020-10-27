import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

import NavBar from '../../components/NavBar';

export default function UserSchedule(props) {
    const [psychologist, setPsychologist] = useState({});
    const { email } = props.match.params;
    const [selectedValue, setSelectedValue] = useState();

    const weekDays = [
        {   value: 0,
            label: 'Domingo' },
        {
            value: 1,
            label: 'Segunda-feira',
        },
        {
            value: 2,
            label: 'Terça-feira',
        },
        {
            value: 3,
            label: 'Quarta-feira',
        },
        {
            value: 4,
            label: 'Quinta-feira',
        },
        {
            value: 5,
            label: 'Sexta-feira',
        },
        { value: 6, label: 'Sábado' },
    ];

    useEffect(() => {
        async function getData() {
            const response = await api.get(`/psychologist/${email}`);
            setPsychologist(response.data);
        }
        getData();
    }, [props]);

    return (
        <div className="userScheduleContainer">
            <NavBar actualUser={props.location.state.data} />
            <div className="content">
                <form className="forms">
                    <h1>Dias de atendimento</h1>
                    <div className="times">
                        {psychologist.weekDay !== undefined && psychologist.weekDay.length > 0
                            ? psychologist.weekDay.map((workDay) => (
                                <div key={workDay.id} className="psyList">
                                    <h1>{weekDays[workDay.weekDay].label}</h1>
                                    <h2>Duração da consulta: {workDay.duration} minutos</h2>
                                    <select value={selectedValue}
                                            onChange={(e) => setSelectedValue(e.target.value)}>
                                        {workDay.appointment.map((appointment) => (
                                            <option value={appointment._id}>
                                                Horário de começo: {appointment.time}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))
                            : <div>
                                <h2>Não possui horários disponíveis</h2>
                            </div>
                        }
                    </div>
                    <button>
                        Salvar
                    </button>
                    <Link
                        to={{
                            pathname: '/psychologist/list',
                            state: {
                                data: props.location.state.data,
                            },
                        }}
                    >
                        <button>Voltar</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

UserSchedule.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
};
