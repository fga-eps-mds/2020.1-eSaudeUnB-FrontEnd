import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
                    <h1>Dias de atendimento</h1>
                    <div className="times">
                        {psychologist.weekDay !== undefined && psychologist.weekDay.length > 0
                            ? psychologist.weekDay.map((Day) => (
                                <div key={Day.id} className="psyList">
                                    <h2>
                                        {`${weekDays[Day.weekDay].label} `}
                                        Atendendo de : {`${Day.from} `}
                                        até {`${Day.to} `}
                                    </h2>
                                </div>
                            ))
                            : <div>
                                <h2>Não possui horários disponíveis</h2>
                            </div>
                        }
                    </div>
                    <Link to = '/psy-list'>
                        <button>Voltar</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

UserSchedule.propTypes = {
    match: PropTypes.object,
};
