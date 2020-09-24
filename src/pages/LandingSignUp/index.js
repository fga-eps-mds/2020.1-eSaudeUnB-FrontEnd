import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import api from '../../services/api';

import './styles.css';

import userIcon from '../../assets/images/userIcon.svg';
import Input from '../../components/Input';
import Union from '../../assets/images/Union.svg';

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
                setVariant('warning');
                setAlertText('Os campos não foram preenchidos corretamente.');
                return;
            }

            if (password !== confirmPassword) {
                setShow(true);
                setVariant('warning');
                setAlertText('As senhas não são iguais.');
                return;
            }

            const response = await api.post('/users', user);

            if (response.status === 201) {
                history.push({
                    pathname: '/login',
                    state: {
                        data: response.data,
                        alert: {
                            show: true,
                            variant: 'success',
                            alertText: 'Cadastro realizado com sucesso.',
                        },
                    },
                });
            }
        } catch (err) {
            setShow(true);
            setVariant('danger');
            setAlertText('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="signUp01Container">
            {show ? (
                <Alert className="alert" variant={variant}>{alertText}</Alert>
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
                            icon={Union}
                        />
                        <Input
                            placeholder="Sobrenome"
                            value={lastName}
                            onChange={setLastName}
                            icon={Union}
                        />
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
                            icon={Union}
                            type="password"
                        />
                        <Input
                            placeholder="Confirmar senha"
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            icon={Union}
                            type="password"
                        />
                    </div>
                    <button className="button" type="submit">Registrar</button>
                </form>
            </div>
        </div>
    );
}
