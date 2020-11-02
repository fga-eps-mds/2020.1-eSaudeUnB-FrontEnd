import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import api from '../../services/api';
import Input from '../../components/Input';

import './styles.css';

import userIcon from '../../assets/images/userIcon.svg';

export default function PsychologistCreate() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [biography] = useState('');
    const [phone] = useState('');
    const [gender, setGender] = useState('');
    const [bond] = useState('Psychologist');
    const [show, setShow] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [variant, setVariant] = useState('');
    const history = useHistory();

    const [alertContentName, setAlertContentName] = useState(false);
    const [alertContentLastName, setAlertContentLastName] = useState(false);
    const [alertContentEmail, setAlertContentEmail] = useState(false);

    function closeAlerts() {
        setAlertContentName(false);
        setAlertContentLastName(false);
        setAlertContentEmail(false);
    }

    async function handlePsychologistCreation(event) {
        try {
            event.preventDefault();

            const user = {
                name,
                lastName,
                email,
                specialization,
                biography,
                gender,
                phone,
                bond,
            };

            if (!name || !lastName || !email || !gender || !specialization) {
                setShow(true);
                setVariant('danger');
                setAlertText('Os campos não foram preenchidos corretamente');
                setInterval(() => {
                    setShow(false);
                }, 3500);
                return history.push('/admin/psychologist/create');
            }

            const accessToken = localStorage.getItem('accessToken');
            await api.post('/psychologist', user, {
                headers: { authorization: accessToken },
            })
                .then((response) => {
                    if (response.status === 203) {
                        const { details } = response.data.error;
                        closeAlerts();

                        for (
                            let value = 0;
                            value < response.data.error.details.length;
                            value += 1
                        ) {
                            if (details[value].path[0] === 'name') {
                                setAlertContentName(true);
                            }
                            if (details[value].path[0] === 'lastName') {
                                setAlertContentLastName(true);
                            }
                            if (details[value].path[0] === 'email') {
                                setAlertContentEmail(true);
                            }
                        }

                        setInterval(() => {
                            setShow(false);
                        }, 3500);
                        return history.push('/admin/psychologist/create');
                    }

                    if (response.status === 409) {
                        setShow(true);
                        setVariant('danger');
                        setAlertText('Email já cadastrado');
                        setInterval(() => {
                            setShow(false);
                        }, 6500);
                        return history.push('/admin/psychologist/create');
                    }

                    if (response.status === 201) {
                        return history.push('/admin/psychologist/list');
                    }
                })
                .catch((err) => {
                    if (err.response.status === 401) {
                        return setTimeout(() => {
                            history.push('/admin');
                        }, 2000);
                    }
                });
        } catch (err) {
            setShow(true);
            setVariant('danger');
            setAlertText('Erro no cadastro, tente novamente');
        }
        setInterval(() => {
            setShow(false);
        }, 3500);

        return 0;
    }

    return (
        <div className="psychologist-container">
            {show ? (
                <Alert className="alert" variant={variant}>
                    {alertText}
                </Alert>
            ) : (
                <div></div>
            )}
            <div className="psychologist-create">
                <form className="form" onSubmit={handlePsychologistCreation}>
                    <img src={userIcon} alt="userIcon" />
                    <div className="psyCreate">
                        <Input
                            placeholder="Nome"
                            value={name}
                            onChange={setName}
                        />
                        {alertContentName ? (
                            <div className="alertContent">
                                <p>Nome precisa possuir mais de 2 letras.</p>
                            </div>
                        ) : (
                            <div className="alertContent">
                                <p></p>
                            </div>
                        )}

                        <Input
                            placeholder="Sobrenome"
                            value={lastName}
                            onChange={setLastName}
                        />
                        {alertContentLastName ? (
                            <div className="alertContent">
                                <p>
									Sobrenome precisa possuir mais de 2 letras.
                                </p>
                            </div>
                        ) : (
                            <div className="alertContent">
                                <p></p>
                            </div>
                        )}

                        <select
                            name="gender"
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value=""> Gênero </option>
                            <option value="F">Feminino</option>
                            <option value="M">Masculino</option>
                            <option value="I">Não Identificar</option>
                        </select>
                        <div className="alertContent">
                            <p></p>
                        </div>

                        <Input
                            placeholder="Email"
                            value={email}
                            onChange={setEmail}
                        />
                        {alertContentEmail ? (
                            <div className="alertContent">
                                <p>E-mail não foi preenchido corretamente.</p>
                            </div>
                        ) : (
                            <div className="alertContent">
                                <p></p>
                            </div>
                        )}
                        <Input
                            placeholder="Especialidade"
                            value={specialization}
                            onChange={setSpecialization}
                        />

                        <button className="button" type="submit">
							Registrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
