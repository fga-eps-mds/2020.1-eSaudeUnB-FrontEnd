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

            const response = await api.post('/login', { email, password });

            if (response.status === 404) {
                alert('usuario não encontrado na base de dados');
            }

            if (response.status === 400) {
                alert('Senha incorreta, digite novamente');
            }

            if (response.status === 500) {
                alert('Ocorreu algum erro no seu login, tente novamente');
            }

            if (response.status === 200) {
                alert('Login efetuado');
                history.push('/home');
            }
        } catch (err) {
            alert('Falha no login, tente novamente');
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
                        <Link className="a" to="/registration-step01">Esqueci a minha senha</Link>
                        <Link className="a" to="/registration-step01">Ainda não possuo uma conta</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}