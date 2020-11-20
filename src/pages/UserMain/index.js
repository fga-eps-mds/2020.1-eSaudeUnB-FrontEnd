import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import api from '../../services/api';
import './styles.css';
import NavBar from '../../components/NavBar';

export default function UserMain() {
    const [date, setDate] = useState(new Date());
    const [psychologists, setPsychologists] = useState([]);
    const [userSelected, setUserSelected] = useState({});
    const [show, setShow] = useState(false);
    const [selectedValue, setSelectedValue] = useState();
    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');

    useEffect(() => {
        api.get('/psychologists', {
            headers: { authorization: accessToken },
        }).then((response) => {
            setPsychologists(response.data);
        });
    });

    function dateCheck(weekDay) {
        if (weekDay === date.getDay()) {
            return true;
        }
        return false;
    }

    async function saveAppointment(event) {
        event.preventDefault();
        const response = await api.get(`/user/${user}`, {
            headers: { authorization: accessToken },
        });
        const userPatient = response.data;

        userSelected.weekDay.map((workDay) => {
            workDay.appointment.map((appointment) => {
                if (appointment._id === selectedValue) {
                    appointment.scheduled = true;
                    appointment.user = userPatient._id;
                    appointment.name = `${userPatient.name} ${userPatient.lastName}`;

                    userPatient.appointments.push({
                        psychologist_id: userSelected._id,
                        psychologistName: `${userSelected.name} ${userSelected.lastName}`,
                        weekDay: workDay.weekDay,
                        time: appointment.time,
                        duration: workDay.duration,
                    });
                }
            });
        });

        const { email, weekDay } = userSelected;
        const { appointments } = userPatient;

        await api.put('/calendary/update',
            {
                email,
                weekDay,
            }, {
            headers: { authorization: accessToken },
        });

        await api.put(`/user/schedule/${userPatient.email}`, { appointments }, {
            headers: { authorization: accessToken },
        });

        window.location.reload();
    }

    return (
        <div className="usercalendar">
            <NavBar className="navBar" bond="Patient" />
            <div className="content">
                <div className="tabela">
                    <div className="calendar">
                        <Calendar
                            onChange={(currentDate) => {
                                setDate(currentDate);
                                setUserSelected('');
                            }}
                            value={date}
                            next2Label={null}
                            prev2Label={null}
                        />
                    </div>
                    <div className="table-right">
                        <h1>{`Horários disponíveis em ${date.getDate()}/${date.getMonth() + 1}`}</h1>
                        <div className="schedules">
                            {psychologists.map((psychologist, index) => (
                                <div
                                    key={index}
                                    className="schedule-box"
                                >
                                    {psychologist.weekDay.map((workDay, index) => (
                                        dateCheck(workDay.weekDay)
                                            ? <div className="testecalendar" key={index}>
                                                {show ? setShow(false) : ''}
                                                <div className="psy-card"
                                                    key={index}

                                                >
                                                    <button onClick={() => setUserSelected(psychologist)}>
                                                        <h3>Profissional: {psychologist.name} {psychologist.lastName}</h3>
                                                    </button>

                                                </div>
                                            </div>
                                            : <div key={index}>{!show ? setShow(true) : ''}</div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
                {userSelected.weekDay !== undefined
                    ? <div className="dropDown-calendar">
                        <div className="column1">
                            <h3>{userSelected.name} {userSelected.lastName}</h3>
                            <h3>{userSelected.biography}</h3>
                        </div>
                        <div className="column2">
                            <h3>{'Horários Disponíveis:'}</h3>
                            <form onSubmit={saveAppointment}>
                                <div className="hours-disponibility">
                                    {userSelected.weekDay !== undefined
                                        ? userSelected.weekDay.map((workDay) => (
                                            dateCheck(workDay.weekDay)
                                                ? workDay.appointment.map((appointment) => (
                                                    appointment.scheduled === false ? (
                                                        <label >
                                                            <input type="radio" name="hour" key={appointment._id} value={appointment._id}
                                                                onChange={() => setSelectedValue(appointment._id)} />
                                                            {appointment.time}
                                                        </label>
                                                    )
                                                        : ''
                                                ))
                                                : <div></div>))
                                        : <div></div>
                                    }
                                </div>
                                <div className="schedule-buttons">
                                    <button type="submit">Agendar</button>
                                    <button className="cancelSchedule" onClick={() => setUserSelected('')}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div> : ''
                }
                <div>
                    {show
                        ? <div className="noHours">
                            <h3>
                                Desculpe, não temos horários disponíveis em {date.getDate()}/{date.getMonth() + 1}
                            </h3>
                        </div>
                        : <div></div>
                    }
                </div>
            </div>
        </div >
    );
}

UserMain.propTypes = {
    location: PropTypes.object,
};
