import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import api from '../../services/api';
import './styles.css';
import NavBar from '../../components/NavBar';

export default function PsychologistCalendar(props) {
    const [date, setDate] = useState(new Date());
    const [restricts, setRestricts] = useState([]);

    const history = useHistory();

    async function putRestrict() {
        await api.put('/calendary/update/', {
            header: localStorage.getItem('acessToken'),
            email: localStorage.getItem('user'),
            restrict: [...restricts],
        });
        window.location.reload();
    }

    function checkRepeat() {
        // eslint-disable-next-line no-restricted-syntax
        for (const item of restricts) {
            if (
                date.getDate() === item.day
                && date.getMonth() === item.month
                && date.getFullYear() === item.year
            ) {
                return false;
            }
        }
        return true;
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
        const Restricts = await api.post('/calendary/restrict', {
            email: localStorage.getItem('user'),
        });
        setRestricts(Restricts.data);
    }
    window.onload = handleRestrict;

    function removeRestrict(index) {
        const temp = [...restricts];
        temp.splice(index, 1);
        setRestricts(temp);
    }

    return (
        <div className="psychologistcalendar">
            <NavBar className="navBar" bond="Psychologist" actualUser={props.location.state.data} />
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
                                <div
                                    // eslint-disable-next-line no-underscore-dangle
                                    key={index}
                                    className="schedule-box"
                                >
                                    <span>{`restrição dia ${restrict.day}/${restrict.month + 1 < 10
                                        ? `0${restrict.month + 1}`
                                        : `${restrict.month + 1}`
                                    }/${restrict.year}`}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeRestrict(index)}
                                    >
                                        Remover
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={() => updateRestricts()}>
                            {`Adicionar Restrição ao dia ${date.getDate()}`}
                        </button>
                        <button type="button" onClick={() => putRestrict()}>
                            Salvar
                        </button>
                        <button
                            type="button"
                            onClick={
                                () => {
                                    history.push({
                                        pathname: '/psychologist/schedule',
                                        state: {
                                            data: props.location.state.data,
                                        },
                                    });
                                }
                            }>
                            Voltar
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}

PsychologistCalendar.propTypes = {
    location: PropTypes.object,
};
