import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

import userIcon from '../../assets/images/userIcon.svg';
import Union from '../../assets/images/Union.svg';
import lock from '../../assets/images/lock.svg';

import Logo from '../../components/Logo';
import Input from '../../components/Input';

export default function LandingLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleLogin(event) {
        try {
            event.preventDefault();

            const response = await api.post('/loginUser', { email, password });

            if (response.status === 404) {
                alert('usuario não encontrado na base de dados');
            }

            if (response.status === 400) {
                alert('Senha incorreta, digite novamente');
            }

            if (response.status === 500) {
                alert('Ocorreu algum erro no seu login, tente novamente');
            }

            if (response.status === 200 || response.status === 201) {
                alert('Login efetuado');
                history.push({
                    pathname: '/profile',
                    state: response.data,
                });
            }
        } catch (err) {
            try {
                const responsePsy = await api.post('/loginPsy', { email, password });

                if (responsePsy.status === 404) {
                    alert('usuario não encontrado na base de dados');
                }

                if (responsePsy.status === 400) {
                    alert('Senha incorreta, digite novamente');
                }

                if (responsePsy.status === 500) {
                    alert('Ocorreu algum erro no seu login, tente novamente');
                }

                if (responsePsy.status === 200 || responsePsy.status === 201) {
                    alert('Login efetuado');
                    history.push({
                        pathname: '/psy-profile',
                        state: responsePsy.data,
                    });
                }
            } catch (err2) {
                alert('Falha no login, tente novamente');
            }
        }
    }

    return (
        <div className="loginContainer">
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
