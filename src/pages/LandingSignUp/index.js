import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import api from '../../services/api';

import './styles.css';

import userIcon from '../../assets/images/userIcon.svg';
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

    const history = useHistory();

    function handleWrongField(field) {
        setShow(true);
        setVariant('danger');

        if (field === 'name') {
            return setAlertText('O campo "Nome" não está preenchido corretamente.');
        }
        if (field === 'lastName') {
            return setAlertText('O campo "Sobrenome" não está preenchido corretamente.');
        }
        if (field === 'email') {
            return setAlertText('O campo "Email" não está preenchido corretamente.');
        }
        if (field === 'password') {
            return setAlertText('A senha deve conter no mínimo 8 caracteres, sem dígitos especiais.');
        }
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
                return setAlertText('Os campos não foram preenchidos corretamente.');
            }

            if (password !== confirmPassword) {
                setShow(true);
                setVariant('danger');
                return setAlertText('As senhas não são iguais.');
            }

            const response = await api.post('/users', user);

            if (response.status === 203) {
                const field = response.data.error.details[0].path[0];
                handleWrongField(field);
                setInterval(() => {
                    setShow(false);
                }, 3500);
                return history.push('/registration');
            }

            if (response.status === 200) {
                setShow(true);
                setVariant('danger');
                setAlertText('Email já cadastrado');
                setInterval(() => {
                    setShow(false);
                }, 3500);
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
    }

    return (
        <div className="signUp01Container">
            {show ? (
                <Alert
                    className="alert"
                    variant={variant}
                >
                    {alertText}
                </Alert>
            ) : (
                    <div></div>
                )}

            <div className="content">
                <Logo />

                <form className="form" onSubmit={handleSign}>
                    <img src={userIcon} alt="userIcon" />
                    <div className="signUp01Fields">
                        <Input
                            placeholder="Nome"
                            value={name}
                            onChange={setName}
                        />
                        <Input
                            placeholder="Sobrenome"
                            value={lastName}
                            onChange={setLastName}
                        />
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
                        <Input
                            placeholder="Confirmar senha"
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            type="password"
                        />
                    </div>
                    <button className="button" type="submit">Registrar</button>
                </form>
            </div>
        </div>
    );
}
