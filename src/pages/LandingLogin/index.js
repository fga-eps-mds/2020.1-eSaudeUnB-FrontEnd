import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import api from '../../services/api';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import userIcon from '../../assets/images/userIcon.svg';
import Union from '../../assets/images/Union.svg';
import lock from '../../assets/images/lock.svg';

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

            const response = await api.post('/login', { email, password });

            if (response.status === 404) {
                setShow(true);
                setVariant('danger');
                setAlertText('Usuário não encontrado na base de dados.');
            }

            if (response.status === 400) {
                setShow(true);
                setVariant('danger');
                setAlertText('Senha incorreta, digite novamente.');
            }

            if (response.status === 500) {
                setShow(true);
                setVariant('danger');
                setAlertText('Ocorreu algum erro no login, tente novamente.');
            }

            if (response.status === 200 || response.status === 201) {
                alert('Login efetuado');
                history.push({
                    pathname: '/profile',
                    state: response.data,
                });
            }
        } catch (err) {
            setShow(true);
            setVariant('danger');
            setAlertText('Falha no login, tente novamente.');
        }
    }

    return (
        <div className="loginContainer">
            {show ? (
                <Alert className="alert" variant='danger' onClose={() => setShow(false)} dismissible>{alertText}</Alert>
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
