import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import api from '../../services/api';
import './styles.css';
import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';

export default function PsychologistEvents() {
    const [date, setDate] = useState(new Date());
    const [psychologist, setPsychologist] = useState({});

    const user = localStorage.getItem('user');

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        api.get(`/psychologist/${user}`, {
            headers: { authorization: accessToken },
        }).then((response) => {
            setPsychologist(response.data);
        });
    }, [user]);

    function dateCheck(workday) {
        if (workday.weekDay === date.getDay()) {
            return true;
        }

        return false;
    }

    return (
        <div className="psyEventsCalendar">
            <NavBar
                className="navBar"
                bond="Professional"
            />
            <SideBar
                className="sidebar"
                bond="Professional"
            />
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
                        <div className="calendar-title">
                            <h1>{'Próximos Eventos'}</h1>
                        </div>
                        <div className="schedules">
                            {psychologist.weekDay
                                && psychologist.weekDay.length > 0 ? (
                                    psychologist.weekDay.map((workDay, index) => (
                                        dateCheck(workDay) ? (
                                            <div key={index}>
                                                {workDay.appointment.map(
                                                    (appointment, i) => (appointment.scheduled ? (
                                                        <div
                                                            className="testeTotal"
                                                            key={i}
                                                        >
                                                            <h3>{`- ${appointment.time}`}</h3>
                                                            <h3>
                                                            Atendimento com{' '}
                                                                {
                                                                    appointment.name
                                                                }
                                                            </h3>
                                                        </div>
                                                    ) : (
                                                        <div key={i}></div>
                                                    )),
                                                )}
                                            </div>
                                        ) : (
                                            <div key={index}></div>
                                        )))
                                ) : (
                                    <div></div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// PsychologistEvents.propTypes = {
//     location: PropTypes.object,
// };
