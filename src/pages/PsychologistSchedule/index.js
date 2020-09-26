import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import NavBar from '../../components/NavBar';

import './styles.css';

export default function PsychologistSchedule() {
    const [scheduleItems, setScheduleItems] = useState([]);

    async function handleSchedule() {
        const Days = await api.post('/calendary/update', {
            email: localStorage.getItem('user'),
        });
        console.log(Days);
        setScheduleItems(Days.data);
    }
    window.onload = handleSchedule;

    const weekDays = [
        { value: 0, label: 'Domingo' },
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

    function setScheduleItemsValue(position, field, value) {
        const updatedScheduleItems = scheduleItems.map(
            (scheduleItem, index) => {
                if (index === position) {
                    return { ...scheduleItem, [field]: value };
                }

                return scheduleItem;
            }
        );

        setScheduleItems(updatedScheduleItems);
    }

    function handleId(scheduleItems) {
        let newID = 0;
        scheduleItems.forEach((item) => {
            if (item.id >= newID) {
                newID = item.id + 1;
            }
        });
        return newID;
    }

    function addNewScheduleItem() {
        const ID = scheduleItems.length > 0 ? handleId(scheduleItems) : 0;

        setScheduleItems([
            ...scheduleItems,
            { weekDay: 0, from: '', to: '', id: ID },
        ]);
    }

    function removeScheduleItem(index) {
        let temp = [...scheduleItems];
        temp.splice(index, 1);
        setScheduleItems(temp);
    }

    async function putCalendar() {
        await api.put('/calendary/update/', {
            email: localStorage.getItem('user'),
            weekDay: scheduleItems,
        });
    }

    return (
        <div className="psychologistSchedule">
            <div className="content">
                <NavBar className="navBar" />
                <form className="form">
                    <div className="formContent">
                        <legend className="legend">
                            Cadastrar horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo Horário
                            </button>
                        </legend>

                        <div className="schedule">
                            {scheduleItems.map((scheduleItem, index) => {
                                return (
                                    <div
                                        key={scheduleItem.id}
                                        className="schedule-item"
                                    >
                                        <div className="select-box">
                                            <label>Dia da Semana</label>
                                            <select
                                                value={scheduleItem.weekDay}
                                                name="weekDay"
                                                label="Dia da semana"
                                                onChange={(e) =>
                                                    setScheduleItemsValue(
                                                        index,
                                                        'weekDay',
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                {weekDays.map((option) => {
                                                    return (
                                                        <option
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>

                                        <div className="input-box">
                                            <label>Das</label>
                                            <input
                                                name="from"
                                                label="Das"
                                                type="time"
                                                value={scheduleItem.from}
                                                onChange={(e) =>
                                                    setScheduleItemsValue(
                                                        index,
                                                        'from',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="input-box">
                                            <label>Até</label>
                                            <input
                                                name="to"
                                                label="Até"
                                                type="time"
                                                value={scheduleItem.to}
                                                onChange={(e) =>
                                                    setScheduleItemsValue(
                                                        index,
                                                        'to',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeScheduleItem(index)
                                            }
                                        >
                                            Remover
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        <footer className="footer">
                            <Link className="link" to={'/psychology/calendar'}>
                                Configurações avançadas
                            </Link>
                            {/* <button type="submit">Salvar cadastro</button> */}
                            <button type="button" onClick={() => putCalendar()}>
                                Salvar cadastro
                            </button>
                        </footer>
                    </div>
                </form>
            </div>
        </div>
    );
}
