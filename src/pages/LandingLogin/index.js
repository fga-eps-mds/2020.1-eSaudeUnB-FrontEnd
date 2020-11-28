import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import api from '../../services/api';
import './styles.css';

import Logo from '../../components/Logo';
import Input from '../../components/Input';

export default function LandingLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [show, setShow] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [variant, setVariant] = useState('');

    const history = useHistory();

    async function handleLogin(event) {
        try {
            event.preventDefault();

            const responseUser = await api.post('/login/patient', {
                email,
                password,
            });

            if (responseUser.status === 200 || responseUser.status === 201) {
                localStorage.setItem('accessToken', responseUser.data.accessToken);
                localStorage.setItem('user', email);
                history.push({
                    pathname: '/profile',
                    state: {
                        data: responseUser.data.user,
                    },
                });
                return;
            }
        } catch (err) {
            try {
                const responsePsy = await api.post('/login/psychologist', {
                    email,
                    password,
                });

                if (responsePsy.status === 200 || responsePsy.status === 201) {
                    localStorage.setItem('accessToken', responsePsy.data.accessToken);
                    localStorage.setItem('user', email);
                    history.push({
                        pathname: '/psychologist/profile',
                        state: {
                            data: responsePsy.data.user,
                        },
                    });
                }

                if (
                    err.response.status === 404
                    || err.response.status === 400
                ) {
                    setShow(true);
                    setVariant('danger');
                    setAlertText('Email/Senha incorretos, digite novamente.');
                }

                if (err.response.status === 500) {
                    setShow(true);
                    setVariant('danger');
                    setAlertText(
                        'Ocorreu algum erro no seu login, tente novamente.',
                    );
                }
            } catch (err2) {
                if (
                    err2.response.status === 404
                    || err2.response.status === 400
                ) {
                    setShow(true);
                    setVariant('danger');
                    setAlertText('Email/Senha incorretos, digite novamente.');
                }

                if (err2.response.status === 500) {
                    setShow(true);
                    setVariant('danger');
                    setAlertText(
                        'Ocorreu algum erro no seu login, tente novamente.',
                    );
                }
            }
        }
        setInterval(() => {
            setShow(false);
        }, 2000);
    }

    return (
        <div className="loginContainer">
            {show ? (
                <Alert className="alert" variant={variant}>
                    {alertText}
                </Alert>
            ) : (
                <div></div>
            )}
            <div className="content">
                <Logo />

                <form className="form" onSubmit={handleLogin}>
                    <span>Login de Usuário</span>

                    <Input
                        placeholder="Email"
                        value={email}
                        onChange={setEmail}
                    />

                    <Input
                        placeholder="Senha"
                        value={password}
                        onChange={setPassword}
                        type="password"
                    />

                    <button className="button" type="submit">
                        Entrar
                    </button>
                    <div className="forgot">
                        <Link className="a" to="/registration">
                            Esqueci a minha senha
                        </Link>
                        <Link className="a" to="/registration">
                            Ainda não possuo uma conta
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}