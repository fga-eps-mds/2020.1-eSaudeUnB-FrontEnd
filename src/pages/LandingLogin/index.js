import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import api from '../../services/api';
import './styles.css';

import userIcon from '../../assets/images/userIcon.svg';
import Union from '../../assets/images/Union.svg';
import lock from '../../assets/images/lock.svg';

import Logo from '../../components/Logo';
import Input from '../../components/Input';

export default function LandingLogin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [show, setShow] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [variant, setVariant] = useState('');

    const history = useHistory();

    function haveAlert(event) {
        event.preventDefault();
        if (props.location.state) {
            setShow(props.location.state.alert.show);
            setVariant(props.location.state.alert.variant);
            setAlertText(props.location.state.alert.alertText);
        }
        setInterval(() => {
            setShow(false);
        }, 4000);
    }

    async function handleLogin(event) {
        try {
            event.preventDefault();

            const responseUser = await api.post('/loginUser', { email, password });

            if (responseUser.status === 200 || responseUser.status === 201) {
                history.push({
                    pathname: '/profile',
                    state: {
                        data: response.data,
                        alert: {
                            show: true,
                            variant: 'success',
                            alertText: 'Login efetuado com sucesso.',
                        },
                    },
                });
            }
        } catch (err) {
            try {
                const responsePsy = await api.post('/loginPsy', { email, password });

                if (responsePsy.status === 200 || responsePsy.status === 201) {
                    alert('Login efetuado');
                    history.push({
                        pathname: '/psy-profile',
                        state: responsePsy.data,
                    });
                    return;
                }

                if (err.response.status === 404 || err.response.status === 400) {
                    setShow(true);
                    setVariant('danger');
                    setAlertText('Email/Senha incorretos, digite novamente.');
                }

                if (err.response.status === 500) {
                    setShow(true);
                    setVariant('danger');
                    setAlertText('Ocorreu algum erro no seu login, tente novamente.');
                }
            } catch (err2) {
                if (err2.response.status === 404 || err2.response.status === 400) {
                    setShow(true);
                    setVariant('danger');
                    setAlertText('Email/Senha incorretos, digite novamente.');
                }

                if (err2.response.status === 500) {
                    setShow(true);
                    setVariant('danger');
                    setAlertText('Ocorreu algum erro no seu login, tente novamente.');
                }
            }
            setInterval(() => {
                setShow(false);
            }, 4000);

        }
    }

    return (
        <div onLoad={haveAlert} className="loginContainer">
            {show ? (
                <Alert className="alert" variant={variant}>{alertText}</Alert>
            ) : (
                    <div></div>
                )}
            <div className="content">
                <Logo />

                <form className="form" onSubmit={handleLogin}>
                    <img className="userIcon" src={userIcon} alt="icone de usuario" />

                    <Input
                        placeholder="Email"
                        value={email}
                        onChange={setEmail}
                        icon={Union}
                    />

                    <Input
                        placeholder="Senha"
                        value={password}
                        onChange={setPassword}
                        icon={lock}
                        type="password"
                    />

                    <button className="button" type="submit">Entrar</button>
                    <div className="forgot">
                        <Link className="a" to="/registration">Esqueci a minha senha</Link>
                        <Link className="a" to="/registration">Ainda não possuo uma conta</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
