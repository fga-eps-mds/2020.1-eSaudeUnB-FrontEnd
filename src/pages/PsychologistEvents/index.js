import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import api from '../../services/api';
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

    function dateCheck(workday){
        if(workday.weekDay === date.getDay()){
            return true;
        }
        else return false;
    }

    return (
        <div className="psyEventsCalendar">
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
                        <div className="calendar-title">
                        <h1>{`Próximos Eventos`}</h1>
                        </div>
                        <div className="schedules">
                            {psychologists.map((psychologist, index) => (
                                <div
                                    // eslint-disable-next-line no-underscore-dangle
                                    key={index}
                                    className="schedule-box"
                                > 
                                {psychologist.weekDay.map((workDay, index) => (
                                    dateCheck(workDay) ?
                                    <div
                                        // eslint-disable-next-line no-underscore-dangle
                                        key={index}
                                       
                                    >   
                                            {workDay.appointment.map((appointment) => (
                                                appointment.scheduled ?
                                                <div className="testeTotal">
                                                    <h3>{`- ${appointment.time}`}</h3>
                                                    <h3>Atendimento com Peter Park</h3>
                                                </div>
                                                :
                                                <div></div>
                                            ))}
                                    </div>
                                : <div></div>
                                ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

UserMain.propTypes = {
    location: PropTypes.object,
};
