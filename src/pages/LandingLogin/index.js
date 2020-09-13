import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

import userIcon from '../../assets/images/userIcon.svg';
import Union from '../../assets/images/Union.svg';
import lock from '../../assets/images/lock.svg';

import Logo from '../../components/Logo';
import Input from '../../components/Input';

export default function LandingLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleLogin() {
    try {
      const response = await api.get('/users', { email, senha });

      if (!response) {
        throw () => {
          alert('usuario não encontrado na base de dados');
        };
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
            value={senha}
            onChange={setSenha}
            icon={lock}
            type="password"
          />

          <button className="button" type="submit">Entrar</button>
          <div className="forgot">
            <a href="">Esqueci a minha senha</a>
            <Link className="a" to="/registration-step01">Ainda não possuo uma conta</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
