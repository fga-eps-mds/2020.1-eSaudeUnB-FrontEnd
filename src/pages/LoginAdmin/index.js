import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import './styles.css';

import Input from '../../components/Input';

import api from '../../services/api';
import userIcon from '../../assets/images/userIcon.svg';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [show, setShow] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [variant, setVariant] = useState('');

    const history = useHistory();

    async function handleAdminLogin(event) {
        try {
            event.preventDefault();

            const response = await api.post('/admin/login', {
                email,
                password,
            });

            if (response.status === 404 || response.status === 400) {
                setShow(true);
                setVariant('danger');
                setAlertText('Email/Senha incorretos, digite novamente.');
            }

            if (response.status === 500) {
                setShow(true);
                setVariant('danger');
                setAlertText(
                    'Ocorreu algum erro no seu login, tente novamente.',
                );
            }

            if (response.status === 200) {
                console.log(response);
                localStorage.setItem('accessToken', response.data.accessToken);
                history.push('/admin/psychologist/list');
            }
        } catch (err) {
            setShow(true);
            setVariant('danger');
            setAlertText('Ocorreu algum erro no seu login, tente novamente.');
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
                <form className="form" onSubmit={handleAdminLogin}>
                    <img
                        className="userIcon"
                        src={userIcon}
                        alt="icone de usuario"
                    />
                    <h2 className="pageTitle">Login de Administrador</h2>
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
                </form>
            </div>
        </div>
    );
}
