import React, { useState, FormEvent } from 'react';
import api from '../../services/api';

import NavBar from '../../components/NavBar';

import './styles.css';

export default function PsychologistSchedule() {
    const [date, setDate] = useState(new Date());
    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' },
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
                if (index == position) {
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
                    <fieldset>
                        <legend>
                            Cadastrar horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo Horário
                            </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={index} className="schedule-item">
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
                                        <option value="" disabled hidden>
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
                            );
                        })}
                    </fieldset>

                    <footer>
                        {/* <button type="submit">Salvar cadastro</button> */}
                        <button type="button" onClick={test}>
                            test
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
}
