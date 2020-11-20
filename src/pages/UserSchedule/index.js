import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';
import './styles.css';

import NavBar from '../../components/NavBar';

export default function UserSchedule(props) {
    const [psychologist, setPsychologist] = useState({});
    const email = localStorage.getItem('user');
    const [selectedValue, setSelectedValue] = useState();
    const accessToken = localStorage.getItem('accessToken');

    const weekDays = [
        {
            value: 0,
            label: 'Domingo',
        },
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
            const response = await api.get(`/psychologist/${props.location.state.data}`, {
                headers: { authorization: accessToken },
            });
            setPsychologist(response.data);
        }
        getData();
    }, [props]);

    async function saveAppointment(event) {
        event.preventDefault();
        const response = await api.get(`/user/${email}`, {
            headers: { authorization: accessToken },
        });
        console.log(response)
        const { _id, name, lastName } = response.data;

        psychologist.weekDay.map((workDay) => {
            workDay.appointment.map((appointment) => {
                if (appointment._id === selectedValue) {
                    appointment.scheduled = true;
                    appointment.user = _id;
                    appointment.name = `${name} ${lastName}`;
                    console.log(name, lastName, appointment._id, psychologist)
                }
            });
        });

        await api.put('/calendary/update',
            {
                email: psychologist.email,
                weekDay: psychologist.weekDay,
            }, {
            headers: { authorization: accessToken },
        });
    }

    return (
        <div className="userScheduleContainer">
            <NavBar className="navBar" bond="Patient" />
            <div className="content">
                <form className="forms" onSubmit={saveAppointment}>
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
                    <button type="submit">Salvar</button>

                </form>
            </div>
        </div>
    );
}

UserSchedule.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
};
