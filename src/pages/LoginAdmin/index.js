import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import './styles.css';

import Input from '../../components/Input';

import api from '../../services/api';

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

            if (response.status === 200) {
                localStorage.setItem('accessToken', response.data.accessToken);
                return history.push('/admin/psychologist/list');
            }
        } catch (err) {
            if (err.response.status === 404 || err.response.status === 400) {
                setShow(true);
                setVariant('danger');
                setAlertText('Email/Senha incorretos, digite novamente.');
            } else {
                setShow(true);
                setVariant('danger');
                setAlertText(
                    'Ocorreu algum erro no seu login, tente novamente.',
                );
            }
        }

        return setInterval(() => {
            setShow(false);
        }, 5000);
    }

    return (
        <div className="loginAdminContainer">
            {show ? (
                <Alert className="alert" variant={variant}>
                    {alertText}
                </Alert>
            ) : (
                <div></div>
            )}
            <div className="content">
                <form className="form" onSubmit={handleAdminLogin}>
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
