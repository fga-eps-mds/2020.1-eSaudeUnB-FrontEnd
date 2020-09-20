import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import userIcon from '../../assets/images/userIcon.svg';
import Union from '../../assets/images/Union.svg';

import Logo from '../../components/Logo';

export default function LandingSignUp01() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
                alert('Os campos não foram preenchidos corretamente');
                return;
            }

            if (password !== confirmPassword) {
                alert('as senhas não são iguais');
                return;
            }

            const response = await api.post('/users', user);
            const response2 = await api.get('/users/${user.email}');

            if (response.status === 201) {
                alert('Cadastro realizado com sucesso');
                alert(response2);
                history.push('/');
            }
        } catch (err) {
            alert('Erro no cadastro, tente novamente');
        }
    }


    return (
        <div className="signUp01Container">
            <div className="content">
                <Logo />

                <form className="form">
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

                        <div className="input">
                            <input
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <img src={Union} alt="icon" />
                        </div>

                        <div className="input">
                            <input
                                placeholder="DDD + Telefone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />

                            <img src={Union} alt="icon" />
                        </div>
                    </div>

                    <Link
                        className="button"
                        to={{
                            pathname: '/registration-step02',
                            state: {
                                name, lastName, email, phone,
                            },
                        }}
                    >
                      Próximo
                    </Link>
                </form>
            </div>
        </div>
    );
}