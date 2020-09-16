import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import userIcon from '../../assets/images/userIcon.svg';
import Union from '../../assets/images/Union.svg';
import lock from '../../assets/images/lock.svg';

import Logo from '../../components/Logo';
import Input from '../../components/Input';
import './styles.css';

export default function LandingSignUp02(props) {
    const [gender, setGender] = useState('F');
    const [bond, setBond] = useState('graduando');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [unbRegistration, setUnbRegistration] = useState('');

    const history = useHistory();

    async function handleSignUp02(event) {
        try {
            event.preventDefault();

            const {
                name, lastName, email, phone,
            } = props.location.state;

            const user = {
                name,
                lastName,
                email,
                phone,
                password,
                unbRegistration,
                gender,
                bond,
            };

            if (!name || !lastName || !email || !phone || !password || !unbRegistration || !gender || !bond) {
                alert('Os campos não foram preenchidos corretamente');
                history.push('/registration-step01');
                return;
            }

            if (password !== confirmPassword) {
                alert('as senhas não são iguais');
                return;
            }

            const response = await api.post('/users', user);

            if (response.status === 201) {
                alert('Cadastro realizado com sucesso');
                history.push('/');
            }
        } catch (err) {
            alert('Erro no cadastro, tente novamente');
        }
    }

    return (
      <div className="signUp02Container">
          <div className="content">
              <Logo />
              <form className="form" onSubmit={handleSignUp02}>
                  <img src={userIcon} alt="userIcon" />

                  <div className="selects">

                      <select name="gender" onChange={(e) => setGender(e.target.value)}>
                          <option value="F">Feminino</option>
                          <option value="M">Masculino</option>
                          <option value="I">Não Identificar</option>
                        </select>

                      <select name="bond" onChange={(e) => setBond(e.target.value)}>
                          <option value="graduando">Graduando</option>
                          <option value="posGraduando">Pós-Graduando</option>
                          <option value="professor">Professor</option>
                        </select>

                    </div>

                  <Input
                      placeholder="Matrícula UnB"
                      value={unbRegistration}
                      onChange={setUnbRegistration}
                      icon={Union}
                    />

                  <Input
                      placeholder="Senha"
                      value={password}
                      onChange={setPassword}
                      icon={lock}
                      type="password"
                    />

                  <Input
                      placeholder="Confirmar Senha"
                      value={confirmPassword}
                      onChange={setConfirmPassword}
                      icon={lock}
                      type="password"
                    />

                  <button className="button" type="submit">Registrar</button>
                </form>
            </div>
        </div>
    );
}
