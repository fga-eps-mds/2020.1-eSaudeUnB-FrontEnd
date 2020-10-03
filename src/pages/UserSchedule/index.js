import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

import NavBar from '../../components/NavBar';

export default function UserSchedule(props) {
    const [psychologist, setPsychologist] = useState({});
    const { email } = props.match.params;
    const weekDays = [
        { value: 0, label: 'Domingo' },
        {
            value: 1,
            label: 'Segunda-feira',
        },
        {
            value: 2,
            label: 'Terça-feira',
        },
        {
            value: 3,
            label: 'Quarta-feira',
        },
        {
            value: 4,
            label: 'Quinta-feira',
        },
        {
            value: 5,
            label: 'Sexta-feira',
        },
        { value: 6, label: 'Sábado' },
    ];
    useEffect(() => {
        async function getData() {
            const response = await api.get(`/psy/${email}`);
            setPsychologist(response.data);
        }
        getData();
    }, [props]);
    return (
        <div className="userScheduleContainer">
            <div className="content">
                <NavBar />
                <form className="forms">
                    <div className="times">
                        {psychologist.weekDay &&
                            psychologist.weekDay.map((Day) => (
                                <div key={Day.id} className="psyList">
                                    <p>
                                        Dia da semana :{' '}
                                        {`${weekDays[Day.weekDay].label} `}
                                        Atendendo de : {`${Day.from} `}
                                        Até : {`${Day.to} `}
                                    </p>
                                </div>
                            ))}
                    </div>
                </form>
            </div>
        </div>
    );
}
