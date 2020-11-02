import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import api from '../../services/api';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import './styles.css';
import NavBar from '../../components/NavBar';
import { Alert } from 'react-bootstrap';

export default function UserMain() {
    const [date, setDate] = useState(new Date());
    const [psychologists, setPsychologists] = useState([]);
    const [userSelected, setUserSelected] = useState({});
    const [show, setShow] = useState(false);
    let anyDate = false;

    useEffect(() => {
        api.get('/psychologists').then((response) => {
            setPsychologists(response.data);
        });
    }, []);

    function dateCheck(weekDay) {
        if (weekDay === date.getDay()) {
            return true;
        }
        else {
            return false;
        }
    }

    return (
        <div className="usercalendar">
            <NavBar className="navBar" bond="Patient" actualUser={'user'} />
            <div className="content">
                <div className="tabela">
                    <div className="calendar">
                        <Calendar
                            onChange={(currentDate) => {
                                setDate(currentDate);
                                setUserSelected("")
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
                                    // eslint-disable-next-line no-underscore-dangle
                                    key={index}
                                    className="schedule-box"
                                >
                                    {psychologist.weekDay.map((workDay, index) => (
                                        dateCheck(workDay.weekDay) ?
                                            <div className="testecalendar" key={index}>
                                                {show ? setShow(false) : ""}
                                                <div className="psy-card"
                                                    // eslint-disable-next-line no-underscore-dangle
                                                    key={index}

                                                >
                                                    <button onClick={() => setUserSelected(psychologist)}>
                                                        <h3>Profissional: {psychologist.name} {psychologist.lastName}</h3>
                                                    </button>

                                                </div>
                                            </div>
                                            : <div key={index}>{!show ? setShow(true) : ""}</div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
                {userSelected.weekDay !== undefined ?
                    <div className="dropDown-calendar">
                        <div className="column1">
                            <h3>{userSelected.name} {userSelected.lastName}</h3>
                            <h3>{userSelected.biography}</h3>
                        </div>
                        <div className="column2">
                            <h3>Horários Disponíveis:</h3>
                            <form>
                                <div className="hours-disponibility">
                                    {userSelected.weekDay !== undefined
                                        ? userSelected.weekDay.map((workDay) => (
                                            workDay.appointment.map((appointment) => (

                                                appointment.scheduled === false ? (
                                                    <label >
                                                        <input type="radio" name="hour" id ={appointment._id}  value={appointment.time} />
                                                        {appointment.time}
                                                    </label>
                                                )
                                                    :
                                                    ""
                                            ))
                                        ))
                                        : <div></div>
                                    }
                                </div>
                                <div className="schedule-buttons">
                                    <button>Agendar</button>
                                    <button className="cancelSchedule" onClick={() => setUserSelected("")}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div> :
                    show ?
                        <div className="noHours">
                            <h3>
                                Desculpe, não temos horários disponíveis em {date.getDate()}/{date.getMonth() + 1}
                            </h3>
                        </div>
                        : <div></div>

                }
            </div>
        </div >
    );
}

UserMain.propTypes = {
    location: PropTypes.object,
};
