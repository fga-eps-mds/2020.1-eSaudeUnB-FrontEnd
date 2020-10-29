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
    const [userSelected, setUserSelected] = useState([]);
    const [show, setShow] = useState(false);

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

    function checkAnyDate(){
        let anyDate = false;
        psychologists.map((psychologist) => {
            psychologist.weekDay.map((workDay) => {
                if(workDay.weekDay === date.getDay()){
                    anyDate = true;
                }
            });
        });

        setShow(!anyDate);
    }
    function teste(psychologist){
        console.log(psychologist)
        setUserSelected(psychologist)
    }
    return (
        <div className="usercalendar">
            <NavBar className="navBar" bond="Patient" actualUser={'user'} />
            <div className="content">
                <Accordion>
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
                                                    <div className="psy-card"
                                                        // eslint-disable-next-line no-underscore-dangle
                                                        key={index}

                                                    >
                                                        <Accordion.Toggle eventKey="0">
                                                            <button onClick={() => teste(psychologist)}>
                                                                <h3>Profissional: {psychologist.name} {psychologist.lastName}</h3>
                                                            </button>
                                                        </Accordion.Toggle>

                                                    </div>
                                                </div>
                                                : <div key={index}></div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    <Accordion.Collapse eventKey="0">
                        <div className="dropDown-calendar">
                            <div className="column1">
                                <h3>{userSelected.name}</h3>
                                <h3>{userSelected.biography}</h3>
                            </div>
                            <div className="column2">
                                <h3>Horários Disponíveis:</h3>
                                <button>Agendar</button>
                            </div>
                        </div>
                    </Accordion.Collapse>
                </Accordion>
            </div>
            <div className="alert">
            {show? 
                <Alert variant="danger">
                    Não há horários cadastrados
                </Alert>
            : <div></div>
            }
            </div>
        </div >
    );
}

UserMain.propTypes = {
    location: PropTypes.object,
};
