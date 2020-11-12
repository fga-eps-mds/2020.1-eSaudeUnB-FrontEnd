import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

import Input from '../../components/Input';

import Logo from '../../components/Logo';

export default function LandingSignUp() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [show, setShow] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [variant, setVariant] = useState('');
    const [alertContentName, setAlertContentName] = useState(false);
    const [alertContentLastName, setAlertContentLastName] = useState(false);
    const [alertContentEmail, setAlertContentEmail] = useState(false);
    const [alertContentPassword, setAlertContentPassword] = useState(false);
    const [
        alertContentConfirmPassword,
        setAlertContentConfirmPassword,
    ] = useState(false);

    const history = useHistory();

    function closeAlerts() {
        setAlertContentName(false);
        setAlertContentLastName(false);
        setAlertContentEmail(false);
        setAlertContentPassword(false);
        setAlertContentConfirmPassword(false);
    }

    async function handleSign(event) {
        try {
            event.preventDefault();

            const user = {
                name,
                lastName,
                email,
                password,
            };

            if (!name || !lastName || !email || !password) {
                setShow(true);
                setVariant('danger');
                return setAlertText(
                    'Os campos não foram preenchidos corretamente.',
                );
            }

            const response = await api.post('/users', user);

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
                    if (details[value].path[0] === 'password') {
                        setAlertContentPassword(true);
                    }
                    if (password !== confirmPassword) {
                        return setAlertContentConfirmPassword(true);
                    }
                }

                setInterval(() => {
                    setShow(false);
                }, 3500);
                return history.push('/registration');
            }

            if (response.status === 409) {
                setShow(true);
                setVariant('danger');
                setAlertText('Email já cadastrado');
                setInterval(() => {
                    setShow(false);
                }, 6500);
                return history.push('/registration');
            }

            if (response.status === 201) {
                return history.push({
                    pathname: '/login',
                    state: {
                        data: response.data,
                    },
                });
            }
        } catch (err) {
            setShow(true);
            setVariant('danger');
            setAlertText('Erro no cadastro, tente novamente.');
        }
        setInterval(() => {
            setShow(false);
        }, 2000);

        return 0;
    }

    return (
        <div className="signUp01Container">
            {show ? (
                <Alert className="alert" variant={variant}>
                    {alertText}
                </Alert>
            ) : (
                <div></div>
            )}

            <div className="content">
                <Logo />

                <form className="form" onSubmit={handleSign}>
                    <span>Registro de usuário</span>
                    <div className="signUp01Fields">
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
                            placeholder="Senha"
                            value={password}
                            onChange={setPassword}
                            type="password"
                        />
                        {alertContentPassword ? (
                            <div className="alertContent">
                                <p>
                                    A senha deve conter no mínimo 8 caracteres,
                                    sem dígitos especiais.
                                </p>
                            </div>
                        ) : (
                            <div className="alertContent">
                                <p></p>
                            </div>
                        )}
                        <Input
                            placeholder="Confirmar senha"
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            type="password"
                        />
                        {alertContentConfirmPassword ? (
                            <div className="alertContent">
                                <p>As senhas não são iguais.</p>
                            </div>
                        ) : (
                            <div className="alertContent">
                                <p></p>
                            </div>
                        )}
                    </div>
                    <button className="button" type="submit">
                        Registrar
                    </button>
                    <div className="back">
                        <Link className="a" to="/">
                            Voltar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
