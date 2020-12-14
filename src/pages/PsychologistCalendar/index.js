import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import Calendar from 'react-calendar';
import api from '../../services/api';
import './styles.css';
import NavBar from '../../components/NavBar';

export default function PsychologistCalendar() {
    const [date, setDate] = useState(new Date());
    const accessToken = localStorage.getItem('accessToken');
    const [scheduleItems, setScheduleItems] = useState([]);
    const [show, setShow] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [variant, setVariant] = useState('');
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
                day: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear(),
                weekDay: date.getDay(),
                from: '',
                to: '',
                id: ID,
                appointment: [],
            },
        ]);
    }

    function verifyCalendarData() {
        let minutes;
        for (let i = 0; i < scheduleItems.length; i++) {
            if (scheduleItems[i].from > scheduleItems[i].to) {
                setShow(true);
                setVariant('danger');
                setAlertText(
                    'O horario de término não pode ser menor que o de ínicio',
                );
                setTimeout(() => {
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
                setTimeout(() => {
                    setShow(false);
                }, 3500);
                return false;
            }

            if (scheduleItems[i].duration <= 0) {
                setShow(true);
                setVariant('danger');
                setAlertText(
                    'A duração da consulta deve ser maior que 0 minutos',
                );
                setTimeout(() => {
                    setShow(false);
                }, 3500);
                return false;
            }
            // function to be edited earlier
            minutes = calculateAttendance(scheduleItems[i].from,
                scheduleItems[i].to, scheduleItems[i].duration);

            if (minutes > 0) {
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
            const value = appointmentHours(scheduleItems[i].from,
                scheduleItems[i].to, scheduleItems[i].duration);
            scheduleItems[i].appointment = value;
        }

        return true;
    }

    function calculateAttendance(start, end, duration) {
        start = parseInt(start.substring(0, 2)) * 60 + parseInt(start.substring(3, 5));
        end = parseInt(end.substring(0, 2)) * 60 + parseInt(end.substring(3, 5));
        duration = parseInt(duration);

        const number = (end - start);
        let minutesRemaining = 0;
        if (number % duration !== 0) {
            minutesRemaining = number % duration;
        }
        return minutesRemaining;
    }

    function appointmentHours(start, end, duration) {
        let actualHour = parseInt(start.substring(0, 2));
        let actualMinutes = parseInt(start.substring(3, 5));
        duration = parseInt(duration);
        let hour = {};
        const hours = [{}];
        hours[0] = {
            time: `${start}`,
            scheduled: false,
        };

        do {
            if (actualMinutes + duration >= 60) {
                actualHour += 1;
                actualMinutes = 60 - (actualMinutes + duration);
            } else {
                actualMinutes += duration;
            }
            hour = {
                time: `${actualHour >= 10 ? actualHour : `0${actualHour}`}:${actualMinutes >= 10 ? actualMinutes : `0${actualMinutes}`}`,
                scheduled: false,
            };
            if (hour.time !== end) {
                hours.push(hour);
            }
        } while (hour.time !== end);
        return hours;
    }

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

    function removeScheduleItem(index) {
        const temp = [...scheduleItems];
        temp.splice(index, 1);
        setScheduleItems(temp);
    }

    async function putCalendar(event) {
        event.preventDefault();
        if (verifyCalendarData()) {
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
            setTimeout(() => {
                setShow(false);
            }, 3000);
        }
    }

    return (
        <div className="psychologistcalendar">
            <NavBar
                className="navBar"
                bond="Professional"
            />
            <div className="content">
                {show ? (
                    <Alert className="alert" variant={variant}>
                        {alertText}
                    </Alert>
                ) : (
                        <div></div>
                    )}
                <div className="tabela">
                    <div className="calendar">
                        <Calendar
                            onChange={(currentDate) => {
                                setDate(currentDate);
                            }}
                            value={date}
                            next2Label={null}
                            prev2Label={null}
                        />
                    </div>
                    <div className="table-right">
                        <h1>Seus horários dia {date.getDate()}/{date.getMonth() + 1}:</h1>
                        <form className="form" onSubmit={putCalendar}>
                            <div className="formContent">
                                <legend className="legend">
                                    Cadastrar horários disponíveis
                                    <button type="button" onClick={addNewScheduleItem}>
                                        + Novo Horário
                                    </button>
                                </legend>

                                <div className="schedule">
                                    {scheduleItems.map((scheduleItem, index) => (
                                        scheduleItem.day === date.getDate()
                                            && scheduleItem.month === date.getMonth()
                                            && scheduleItem.year === date.getFullYear()
                                            ? <div
                                                key={scheduleItem._id || scheduleItem.id}
                                                className="schedule-item"
                                            >
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
                                            : ''
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
            </div>
        </div>
    );
}

PsychologistCalendar.propTypes = {
    location: PropTypes.object,
};
