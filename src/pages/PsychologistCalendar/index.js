import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import api from '../../services/api';
import './styles.css';
import NavBar from '../../components/NavBar';

export default function PsychologistCalendar() {
    const [date, setDate] = useState(new Date());
    const [restricts, setRestricts] = useState([]);
    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');

    async function putRestrict() {
        await api.put('/calendary/update/', {
            email: user,
            restrict: [...restricts],
        },
        { headers: { authorization: accessToken } });
        window.location.reload();
    }

    function checkRepeat() {
        let repeat = true;
        restricts.forEach((item) => {
            if (
                date.getDate() === item.day
                && date.getMonth() === item.month
                && date.getFullYear() === item.year
            ) {
                repeat = false;
            }
        });

        return repeat;
    }

    function updateRestricts() {
        if (checkRepeat()) {
            setRestricts([
                ...restricts,
                {
                    year: date.getFullYear(),
                    day: date.getDate(),
                    month: date.getMonth(),
                },
            ]);
        }
    }

    async function handleRestrict() {
        const Restricts = await api.post(
            '/calendary/restrict',
            {
                email: user,
            },
            {
                headers: { authorization: accessToken },
            },
        );
        setRestricts(Restricts.data);
    }

    function removeRestrict(index) {
        const temp = [...restricts];
        temp.splice(index, 1);
        setRestricts(temp);
    }

    return (
        <>
            <NavBar className="navBar" bond="Psychologist" actualUser={user} />
            <div className="psychologistcalendar" onLoad={handleRestrict}>
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
                            <h1>Suas Restrições:</h1>
                            <div className="schedules">
                                {restricts.map((restrict, index) => (
                                    <div key={index} className="schedule-box">
                                        <span>{`restrição dia ${restrict.day}/${
                                            restrict.month + 1 < 10
                                                ? `0${restrict.month + 1}`
                                                : `${restrict.month + 1}`
                                        }/${restrict.year}`}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeRestrict(index)
                                            }
                                        >
                                            Remover
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={() => updateRestricts()}
                            >
                                {`Adicionar Restrição ao dia ${date.getDate()}`}
                            </button>
                            <button type="button" onClick={() => putRestrict()}>
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

PsychologistCalendar.propTypes = {
    location: PropTypes.object,
};
