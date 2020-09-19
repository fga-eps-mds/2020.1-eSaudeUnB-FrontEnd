import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

import './styles.css';

import Input from '../../components/Input';

import Union from '../../assets/images/Union.svg';
import lock from '../../assets/images/lock.svg';
import api from '../../services/api';
import userIcon from '../../assets/images/userIcon.svg';

export default function AdminLogin(){
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const history = useHistory();

    async function handleAdminLogin(event){
        try {
            event.preventDefault();

            const response = await api.post('/admin/login', { email, password });

            if (response.status === 404) {
                alert('usuario não encontrado na base de dados');
            }

            if (response.status === 400) {
                alert('Senha incorreta, digite novamente');
            }

            if (response.status === 500) {
                alert('Ocorreu algum erro no seu login, tente novamente');
            }

            if (response.status === 201) {
                alert('Login efetuado');
                history.push('/admin/psy/list');
            }
        } catch (err) {
            alert('Falha no login, tente novamente');
        }
    }

    return(
        <div className="loginContainer">
            <div className="content">

                <form className="form" onSubmit={handleAdminLogin}>
                    <img className="userIcon" src={userIcon} alt="icone de usuario" />
                    <h2 className="pageTitle">Login de Administrador</h2>
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
                    type="password"   
                    icon={lock}             
                />

                <button className="button" type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );

}