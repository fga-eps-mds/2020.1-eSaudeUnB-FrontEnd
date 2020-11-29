import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { BiLoaderCircle } from 'react-icons/bi';

import api from '../../services/api';
import Input from '../../components/Input';

import './styles.css';

export default function PsychologistCreate() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [biography] = useState('');
    const [phone] = useState('');
    const [gender, setGender] = useState('');
    const [bond, setBond] = useState('');
    const [show, setShow] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [variant, setVariant] = useState('');
    const [loadingRequest, setLoadingRequest] = useState(false);
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
            setLoadingRequest(true);

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

            if (!name || !lastName || !email || !gender || !specialization || !bond) {
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
                // eslint-disable-next-line consistent-return
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
                        }, 6500);
                        setLoadingRequest(false);
                        return history.push('/admin/psychologist/create');
                    }

                    if (response.status === 409) {
                        setShow(true);
                        setVariant('danger');
                        setAlertText('Email já cadastrado');
                        setInterval(() => {
                            setShow(false);
                        }, 6500);
                        setLoadingRequest(false);
                        return history.push('/admin/psychologist/create');
                    }

                    if (response.status === 201) {
                        setLoadingRequest(false);
                        setVariant('success');
                        setAlertText('Profissional criado com sucesso!');
                        setInterval(() => {
                            setShow(false);
                        }, 6500);
                        return history.push('/admin/psychologist/list');
                    }

                    return [];
                })
                .catch((err) => {
                    if (err.response.status === 401) {
                        return setTimeout(() => {
                            history.push('/admin');
                        }, 2000);
                    }
                    return [];
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
                {
                    !loadingRequest ? (

                        <form className="form" onSubmit={handlePsychologistCreation}>
                            <h2>Cadastro de Profissionais</h2>
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
                                    className="gender_selection"
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value=""> Gênero </option>
                                    <option value="F">Feminino</option>
                                    <option value="M">Masculino</option>
                                    <option value="I">Não Identificar</option>
                                </select>
                                <select
                                    name="bond"
                                    onChange={(e) => setBond(e.target.value)}
                                >
                                    <option value=""> Vínculo </option>
                                    <option value="Psicologo">Psicólogo</option>
                                    <option value="Nutricionista">Nutricionista</option>
                                    <option value="Assistente Social">Assistente social</option>
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
                    ) : (
                        <div className="loading">
                            <BiLoaderCircle className="load-icon" color="#fff" size="4em" />
                        </div>
                    )
                }
            </div>
        </div>
    );
}
