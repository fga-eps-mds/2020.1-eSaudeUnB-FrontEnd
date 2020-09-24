import React, { useState } from 'react';
import Calendar from 'react-calendar';

import './styles.css';
import NavBar from '../../components/NavBar';

export default function PsychologistCalendar() {
    const [date, setDate] = useState(new Date());
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
                            <div className="schedule-box">
                                <span>{`asdasd ${date} asd`}</span>
                                <button type="button">Remover</button>
                            </div>
                            <div className="schedule-box">
                                <span>{`asdasd ${date} asd`}</span>
                                <button type="button">Remover</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
