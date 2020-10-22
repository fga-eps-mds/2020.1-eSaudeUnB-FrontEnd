import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import api from '../../services/api';
import NavBar from '../../components/NavBar';

import './styles.css';

export default function PsychologistSchedule(props) {
    const [scheduleItems, setScheduleItems] = useState([]);

    const [show, setShow] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [variant, setVariant] = useState('');

    useEffect(() => {
        api.post('/calendary/update', {
            email: localStorage.getItem('user'),
        }).then((response) => {
            setScheduleItems(response.data);
        });
    }, []);

    const weekDays = [
        { 
            value: 0, 
            label: 'Domingo' 
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
        { 
            value: 6, 
            label: 'Sábado' 
        },
    ];

    function setScheduleItemsValue(position, field, value) {
        const updatedScheduleItems = scheduleItems.map(
            (scheduleItem, index) => {
                if (index === position) {
                    return { ...scheduleItem, [field]: value };
                }

                return scheduleItem;
            },
        );

        setScheduleItems(updatedScheduleItems);
    }

    function handleId() {
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
            {
                weekDay: 0, from: '', to: '', id: ID,
            },
        ]);
    }

    function removeScheduleItem(index) {
        const temp = [...scheduleItems];
        temp.splice(index, 1);
        setScheduleItems(temp);
    }

    async function verifyCalendarData() {
        let minutes;
        for (let i = 0; i < scheduleItems.length; i += 1) {
            if (scheduleItems[i].from > scheduleItems[i].to) {
                setShow(true);
                setVariant('danger');
                setAlertText(
                    'O horario de término não pode ser menor que o de ínicio',
                );
                setInterval(() => {
                    setShow(false);
                }, 3500);
                return false;
            }

            if (!scheduleItems[i].from || !scheduleItems[i].to) {
                setShow(true);
                setVariant('danger');
                setAlertText(
                    'Todos os campos devem ser preenchidos, alterações não foram salvas',
                );
                setInterval(() => {
                    setShow(false);
                }, 3500);
                return false;
            }

            if(scheduleItems[i].duration <= 0){
                setShow(true);
                setVariant('danger');
                setAlertText(
                    'A duração da consulta deve ser maior que 0 minutos',
                );
                setInterval(() => {
                    setShow(false);
                }, 3500);
                return false;
            }
            //function to be edited earlier
            minutes = await calculateAttendance(scheduleItems[i].from,scheduleItems[i].to,scheduleItems[i].duration);
 
            if(minutes > 0){
                setShow(true);
                setVariant('danger');
                setAlertText(
                    `Voce possui ${minutes} minutos que não se encaixarão em atendimentos`,
                );
                setInterval(() => {
                    setShow(false);
                }, 3500);
                return false;
            }
        }
        return true;
    }

    async function putCalendar() {
        if (await verifyCalendarData()) {
            await api.put('/calendary/update/', {
                email: localStorage.getItem('user'),
                weekDay: scheduleItems,
            });
            setShow(true);
            setVariant('success');
            setAlertText('Suas alterações foram salvas');
            setInterval(() => {
                setShow(false);
            }, 3000);
        }
    }

    async function calculateAttendance(start,end,duration){
        start = parseInt(start.substring(0, 2))*60 + parseInt(start.substring(3, 5))
        end = parseInt(end.substring(0, 2))*60 + parseInt(end.substring(3, 5))
        duration = parseInt(duration)

        let number = (end-start)
        let minutesRemaining = 0;
        if(number % duration != 0){
            minutesRemaining = number % duration
        }
        return minutesRemaining;
    }

    return (
        <div className="psychologistSchedule">
            <NavBar className="navBar" bond="Psychologist" actualUser={props.location.state.data} />
            <div className="content">
                {show ? (
                    <Alert className="alert" variant={variant}>
                        {alertText}
                    </Alert>
                ) : (
                    <div></div>
                )}
                <form className="form">
                    <div className="formContent">
                        <legend className="legend">
                            Cadastrar horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo Horário
                            </button>
                        </legend>

                        <div className="schedule">
                            {scheduleItems.map((scheduleItem, index) => (
                                <div
                                    key={
                                        scheduleItem._id || scheduleItem.id
                                    }
                                    className="schedule-item"
                                >
                                    <div className="select-box">
                                        <label>Dia da Semana</label>
                                        <select
                                            value={scheduleItem.weekDay}
                                            name="weekDay"
                                            label="Dia da semana"
                                            onChange={(e) => setScheduleItemsValue(
                                                index,
                                                'weekDay',
                                                e.target.value,
                                            )
                                            }
                                        >
                                            {weekDays.map((option) => (
                                                <option
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="input-box">
                                        <label>Das</label>
                                        <input
                                            name="from"
                                            label="Das"
                                            type="time"
                                            value={scheduleItem.from}
                                            onChange={(e) => setScheduleItemsValue(
                                                index,
                                                'from',
                                                e.target.value,
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
                                            onChange={(e) => setScheduleItemsValue(
                                                index,
                                                'to',
                                                e.target.value,
                                            )
                                            }
                                        />
                                    </div>
                                    
                                    <div className="input-box">
                                        <label>Duração da consulta (minutos)</label>
                                        <input
                                            name="duration"
                                            label="duration"
                                            type="number"
                                            min="0"
                                            value={scheduleItem.duration}
                                            onChange={(e) => setScheduleItemsValue(
                                                index,
                                                'duration',
                                                e.target.value,
                                            )
                                            }
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
                            <Link
                                className="link"
                                to={{
                                    pathname: '/psychologist/calendar',
                                    state: {
                                        data: props.location.state.data,
                                    },
                                }}
                            >
                                Configurações avançadas
                            </Link>
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

PsychologistSchedule.propTypes = {
    location: PropTypes.object,
};
