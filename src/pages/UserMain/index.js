import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './styles.css';
import NavBar from '../../components/NavBar';

export default function UserMain(props) {
    const [date, setDate] = useState(new Date());
    const [psychologists, setPsychologists] = useState([]);

    useEffect(() => {
        api.get('/psychologists').then((response) => {
            setPsychologists(response.data);
        });
    }, []);

    function dateCheck(weekDay){
        if(weekDay === date.getDay()){
            return true;
        }
        else return false;
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
                            }}
                            value={date}
                            next2Label={null}
                            prev2Label={null}
                        />
                    </div>
                    <div className="table-right">
                        <h1>{`Horários disponíveis em ${date.getDate()}/${date.getMonth()+1}`}</h1>
                        <div className="schedules">
                            {psychologists.map((psychologist, index) => (
                                <div
                                    // eslint-disable-next-line no-underscore-dangle
                                    key={index}
                                    className="schedule-box"
                                > 
                                {psychologist.weekDay.map((workDay, index) => (
                                    dateCheck(workDay.weekDay) ?
                                    <div className="psy-card"
                                        // eslint-disable-next-line no-underscore-dangle
                                        key={index}
                                       
                                    >   
                                         <Link to={{
                                             pathname: `/psychologist/list/schedule/${psychologist.email}`,
                                             state: { data: psychologist,
                                                        weekDay: workDay.weekDay}
                                         }}
                                        >
                                            <h3>Profissional: {psychologist.name} {psychologist.lastName}</h3>
                                            <h3>Das {workDay.from} até as {workDay.to}</h3>
                                        </Link>
                                    </div>
                                : <div></div>
                                ))}
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={() => {}}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}

UserMain.propTypes = {
    location: PropTypes.object,
};
