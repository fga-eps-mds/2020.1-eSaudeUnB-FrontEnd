import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../../components/NavBar';

import './styles.css';

export default function PsychologistSchedule() {
    const [scheduleItems, setScheduleItems] = useState([
        { week_day: '0', from: '', to: '' },
    ]);

    const weekDays = [
        { value: '0', label: 'Domingo' },
        {
            value: '1',
            label: 'Segunda-feira',
        },
        {
            value: '2',
            label: 'Terça-feira',
        },
        {
            value: '3',
            label: 'Quarta-feira',
        },
        {
            value: '4',
            label: 'Quinta-feira',
        },
        {
            value: '5',
            label: 'Sexta-feira',
        },
        { value: '6', label: 'Sábado' },
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

    function addNewScheduleItem() {
        setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
    }

    function test(e) {
        console.log(scheduleItems);
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
                                    <div key={index} className="schedule-item">
                                        <div className="select-box">
                                            <label>Dia da Semana</label>
                                            <select
                                                name="week_day"
                                                label="Dia da semana"
                                                onChange={(e) =>
                                                    setScheduleItemsValue(
                                                        index,
                                                        'week_day',
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    hidden
                                                >
                                                    Selecione uma opção
                                                </option>
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
                                    </div>
                                );
                            })}
                        </div>

                        <footer className="footer">
                            <Link className="link" to={'/psychology/calendar'}>
                                Configurações avançadas
                            </Link>
                            {/* <button type="submit">Salvar cadastro</button> */}
                            <button type="button" onClick={test}>
                                Salvar cadastro
                            </button>
                        </footer>
                    </div>
                </form>
            </div>
        </div>
    );
}
