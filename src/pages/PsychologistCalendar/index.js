import React, { useState } from 'react';
import Calendar from 'react-calendar';
import api from '../../services/api';
import './styles.css';
import NavBar from '../../components/NavBar';

export default function PsychologistCalendar() {
    const [date, setDate] = useState(new Date());
    const [restricts, setRestricts] = useState([]);

    async function putRestrict() {
        await api.put('/calendary/update/', {
            email: localStorage.getItem('user'),
            restrict: [...restricts],
        });
        window.location.reload();
    }

    function updateRestricts() {
        setRestricts([
            ...restricts,
            {
                year: date.getFullYear(),
                day: date.getDate(),
                month: date.getMonth(),
            },
        ]);
    }

    async function handleRestrict() {
        const Restricts = await api.post('/calendary/restrict', {
            email: localStorage.getItem('user'),
        });
        setRestricts(Restricts.data);
    }
    window.onload = handleRestrict;

    function removeRestrict(index) {
        let temp = [...restricts];
        temp.splice(index, 1);
        setRestricts(temp);
    }

    return (
        <div className="psychologistcalendar">
            <NavBar className="navBar" />
            <div className="content">
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
                        <h1>Horários de atendimento:</h1>
                        <div className="schedules">
                            {restricts.map((restrict, index) => {
                                return (
                                    <div
                                        // eslint-disable-next-line no-underscore-dangle
                                        key={index}
                                        className="schedule-box"
                                    >
                                        <span>{`restrição dia ${restrict.day}/${
                                            restrict.month < 10
                                                ? `0${restrict.month}`
                                                : restrict.month
                                        }/${restrict.year}`}</span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeRestrict(index)
                                            }
                                        >
                                            Remover
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                        <button type="button" onClick={() => updateRestricts()}>
                            {`Adicionar Restrição ao dia ${date.getDate()}`}
                        </button>
                        <button type="button" onClick={() => putRestrict()}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
