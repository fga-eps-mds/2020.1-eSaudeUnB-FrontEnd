import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import '../LandingSignUp01/styles.css';

import userIcon from '../../assets/images/userIcon.svg';
import Union from '../../assets/images/Union.svg';
import lock from '../../assets/images/lock.svg';

import Logo from '../../components/Logo';

export default function LandingSignUp01() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [unbRegistration, setUnbRegistration] = useState("");
    const [phone, setPhone] = useState("");

    async function handleRegistration() {
        const data = { 
            name,
            lastName,
            email,
            unbRegistration,
            gender,
            phone,
            password
        };

        try {
            if(password !== confirmPassword) {
                throw(err) => {
                    alert("as senhas não são iguais.");
                }
            }
            const response = await api.post("/users", data);
              
        } catch(err) {
            alert("Erro no cadastro, tente novamente");
        }
    }

    return (
        <div className='signUp01Container'>
            <div className="content">
                <Logo />

                <form className="form" onSubmit={handleRegistration}>
                    <img src={userIcon} alt="userIcon" />
                    <div className="signUp01Fields">
                        <div className="input">
                            <input 
                                placeholder="Nome"
                                value={name}
                                onChange={e=> setName(e.target.value)}
                            />
                            <img src={Union} alt="icon" />
                        </div>

                        <div className="input">
                            <input 
                                placeholder="Sobrenome"
                                value={lastName}
                                onChange={e=> setLastName(e.target.value)}
                            />

                            <img src={Union} alt="icon" />
                        </div>

                        <div className="input">
                            <input 
                                placeholder="Email"
                                value={email}
                                onChange={e=> setEmail(e.target.value)}
                            />
                            
                            <img src={Union} alt="icon" />
                        </div>

                        <div className="input">
                            <input 
                                placeholder="DDD + Telefone"
                                value={phone}
                                onChange={e=> setPhone(e.target.value)}
                            />
                            
                            <img src={Union} alt="icon" />
                        </div>
                    </div>
                    
                    <Link className="button" to="/registration-step02">Próximo</Link>
                </form>
            </div>
        </div>
    );
}