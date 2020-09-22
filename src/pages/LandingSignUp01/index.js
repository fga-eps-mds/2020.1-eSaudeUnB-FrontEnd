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
    const [phone, setPhone] = useState('');

    return (
        <div className="signUp01Container">
            <div className="content">
                <Logo />

                <form className="form">
                    <img src={userIcon} alt="userIcon" />
                    <div className="signUp01Fields">
                        <div className="input">
                            <input
                                placeholder="Nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <img src={Union} alt="icon" />
                        </div>

                        <div className="input">
                            <input
                                placeholder="Sobrenome"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />

                            <img src={Union} alt="icon" />
                        </div>

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
