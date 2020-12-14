import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Alert, Modal, Button } from 'react-bootstrap';
import api from '../../services/api';
import './styles.css';
import '../../assets/styles/Calendar.css';
import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';

export default function UserMain() {
    const [date, setDate] = useState(new Date());
    const [psychologists, setPsychologists] = useState([]);
    const [userSelected, setUserSelected] = useState({});
    const [show, setShow] = useState(false);
    const [selectedValue, setSelectedValue] = useState();
    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');

    const [waitingList, setWaitingList] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [variant, setVariant] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState('');
    const [actualUser, setActualUser] = useState({});

    useEffect(() => {
        api.get('/psychologists', {
            headers: { authorization: accessToken },
        }).then((response) => {
            setPsychologists(response.data);
        });

        api.get('/waitingList', {
            headers: { authorization: accessToken },
        }).then((response) => {
            setWaitingList(response.data);
        });

        api.get(`/user/${user}`, {
            headers: { authorization: accessToken },
        }).then((response) => {
            setActualUser(response.data);
        });
    }, [accessToken, user]);

    function dateCheck(weekDay) {
        if (weekDay === date.getDay()) {
            return true;
        }
        return false;
    }

    function openModal(buttonAction, event) {
        event.preventDefault();

        if (buttonAction === 'register') {
            setAction('register');
        } else if (buttonAction === 'getOut') {
            setAction('getOut');
        }
        setShowModal(true);
    }

    async function doAction(event) {
        event.preventDefault();
        if (action === 'register') {
            if (!actualUser.canSchedule) {
                setShowAlert(true);
                setVariant('danger');
                setAlertText('Complete o seu cadastro antes de entrar em uma lista de espera.');
                setTimeout(() => {
                    setShowAlert(false);
                }, 2000);
                setShowModal(false);
                setUserSelected('');
                return;
            }
            if (
                waitingList.find((element) => element.emailPatient === user)
            ) {
                setShowAlert(true);
                setVariant('danger');
                setAlertText('Só é possível entrar uma vez na lista de espera.');
                setTimeout(() => {
                    setShowAlert(false);
                }, 2000);
                setShowModal(false);
                setUserSelected('');
                return;
            }

            await api.post('/waitingList', {
                emailPatient: user,
                patientScore: actualUser.score,
            },
            { headers: { authorization: accessToken } });

            setShowModal(false);
            setUserSelected('');
        } else if (action === 'getOut') {
            await api.delete(`/waitingList/${user}`, {
                headers: { authorization: accessToken },
            });

            setShowModal(false);
            setUserSelected('');
            window.location.reload();
        }
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
                return [];
            });
            return [];
        });

        const { email, weekDay } = userSelected;
        const { appointments } = userPatient;

        await api.put(
            '/calendary/update',
            {
                email,
                weekDay,
            },
            {
                headers: { authorization: accessToken },
            },
        );

        await api.put(
            `/user/schedule/${userPatient.email}`,
            { appointments },
            {
                headers: { authorization: accessToken },
            },
        );

        setUserSelected('');
    }

    return (
        <>
            <NavBar className="navBar" bond="Patient" actualUser={user} />
            <div className="usercalendar">
                {showAlert ? (
                    <Alert className="alert" variant={variant}>
                        {alertText}
                    </Alert>
                ) : (
                    <div></div>
                )}
                <SideBar className="sidebar" bond="Patient" actualUser={user} />
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
                            <div className="calendar-title">
                                <h1>{`Horários disponíveis em ${date.getDate()}/${date.getMonth() + 1
                                }`}</h1>
                            </div>
                            <div className="schedules">
                                {psychologists.map((psychologist, i) => (
                                    <div key={i} className="schedule-box">
                                        {psychologist.weekDay.map(
                                            (workDay, index) => (dateCheck(workDay.weekDay) ? (
                                                <div
                                                    className="testecalendar"
                                                    key={index}
                                                >
                                                    {show
                                                        ? setShow(false)
                                                        : ''}
                                                    <div
                                                        className="psy-card"
                                                        key={index}
                                                    >
                                                        <button
                                                            onClick={
                                                                /* eslint-disable max-len */
                                                                () => setUserSelected(
                                                                    psychologist,
                                                                )
                                                            }
                                                        >
                                                            <a href="#dropDown">
                                                                <h3>
                                                                    {
                                                                        psychologist.bond
                                                                    }
                                                                :
                                                                    {
                                                                        psychologist.name
                                                                    }{' '}
                                                                    {
                                                                        psychologist.lastName
                                                                    }
                                                                </h3>
                                                            </a>
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div key={index}>
                                                    {!show
                                                        ? setShow(true)
                                                        : ''}
                                                </div>
                                            )),
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {userSelected.weekDay !== undefined ? (
                        <div id="dropDown" className="dropDown-calendar">
                            <div className="column1">
                                <h3>
                                    {userSelected.name} {userSelected.lastName}
                                </h3>
                                <h3>{userSelected.biography}</h3>
                            </div>
                            <div className="column2">
                                <h3>{'Horários Disponíveis:'}</h3>
                                <form onSubmit={saveAppointment}>
                                    <div className="hours-disponibility">
                                        {userSelected.weekDay !== undefined ? (
                                            userSelected.weekDay.map(
                                                (workDay) => (dateCheck(
                                                    workDay.weekDay,
                                                )
                                                    ? (
                                                        workDay.appointment.map(
                                                            (appointment, index) => (appointment.scheduled
                                                                === false ? (
                                                                    <label key={index}>
                                                                        <input
                                                                            type="radio"
                                                                            name="hour"
                                                                            key={
                                                                                appointment._id
                                                                            }
                                                                            value={
                                                                                appointment._id
                                                                            }
                                                                            onChange={
                                                                                () => setSelectedValue(
                                                                                    appointment._id,
                                                                                )
                                                                            }
                                                                        />
                                                                        {
                                                                            appointment.time
                                                                        }
                                                                    </label>
                                                                ) : (
                                                                    ''
                                                                )),
                                                        )
                                                    ) : (
                                                        <div></div>
                                                    )),
                                            )
                                        ) : (
                                            <div></div>
                                        )}
                                    </div>
                                    <div className="schedule-buttons">
                                        <div className="row1">
                                            <button type="submit">Agendar</button>
                                            <button
                                                className="cancelSchedule"
                                                onClick={() => setUserSelected('')}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                        <div className="row2">
                                            <button className="waitingListButton waiting-list" onClick={(event) => openModal('register', event)}>Entrar para a lista de espera</button>
                                            <button className="getOutOfWLButton waiting-list" onClick={(event) => openModal('getOut', event)}>Sair da lista de espera</button>
                                            <Modal
                                                show={showModal}
                                                onHide={() => setShowModal(false)}
                                                backdrop="static"
                                                size="lg"
                                                aria-labelledby="contained-modal-title-vcenter"
                                                centered
                                            >
                                                <Modal.Header closeButton>
                                                    <Modal.Title className="modalTitle" id="contained-modal-title-vcenter">
                                                        Confirmar ação
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    {action === 'register' ? (
                                                        <div className="modalFormDiv">
                                                            <p className="modalLabel">Realmente deseja entrar para a lista de espera?</p>
                                                        </div>
                                                    ) : (
                                                        <div className="modalFormDiv">
                                                            <p className="modalLabel">Realmente deseja sair da lista de espera?</p>
                                                        </div>
                                                    )}
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button className="buttonYes" onClick={doAction}>sim</Button>
                                                    <Button className="buttonNo" onClick={() => setShowModal(false)}>não</Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                    {show ? (
                        <div className="noHours">
                            <h3>
                                Desculpe, não temos horários disponíveis em{' '}
                                {date.getDate()}/{date.getMonth() + 1}
                            </h3>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </>
    );
}
