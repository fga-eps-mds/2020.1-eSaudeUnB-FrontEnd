import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import api from '../../services/api';
import './styles.css';
import NavBar from '../../components/NavBar';

export default function UserEvents() {
    const [date, setDate] = useState(new Date());
    const [user, setUser] = useState({});
    const accessToken = localStorage.getItem('accessToken');
    const email = localStorage.getItem('user');

    useEffect(() => {
        api.get(`user/${email}`, {
            headers: { authorization: accessToken },
        }).then((response) => {
            setUser(response.data);
        });
    }, [accessToken, email]);

    function dateCheck(weekDay) {
        if (weekDay === date.getDay()) {
            return true;
        }
        return false;
    }

    return (
        <div className="usrEventsCalendar">
            <NavBar className="navBar" bond="Patient" />
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
                            {
                                user.appointments
                                    && user.appointments.length > 0
                                    ? user.appointments.map((appointment, index) => (
                                        dateCheck(appointment.weekDay)
                                            ? <div
                                                // eslint-disable-next-line no-underscore-dangle
                                                key={index}
                                                className="marked-schedule"
                                            >
                                                <h3 className="time-schedule">{`- ${appointment.time}`}</h3>
                                                <h3>
                                                    Atendimento com {appointment.psychologistName}
                                                </h3>
                                            </div>
                                            : <div key={index}></div>
                                    ))
                                    : <div ></div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

UserEvents.propTypes = {
    location: PropTypes.object,
};
