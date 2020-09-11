import React, { useState } from 'react';

import api from '../../services/api';
import '../LandingRegis/styles.css';

import eSaude from '../../assets/images/logo.svg';
import userIcon from '../../assets/images/userIcon.svg';
import Union from '../../assets/images/Union.svg';
import lock from '../../assets/images/lock.svg';

import Logo from '../../components/Logo';

export default function LandingRegis() {
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
        <div className='regisContainer'>
            <div className="content">
                <Logo />

                <form className="form" onSubmit={handleRegistration}>
                    <img src={userIcon} alt="userIcon" />
                    <div className="regisFields">
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
                                placeholder="Matrícula UnB"
                                value={unbRegistration}
                                onChange={e=> setUnbRegistration(e.target.value)}
                            />
                            
                            <img src={Union} alt="icon" />
                        </div>
                        
                        <div className="selects">

                            <select name="gender">
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                                <option value="naoIdentificar">Não Identificar</option>
                            </select>

                            <select name="vinculo">
                                <option value="graduando">Graduando</option>
                                <option value="posGraduando">Pós-Graduando</option>
                                <option value="professor">Professor</option>
                            </select>

                        </div>


                        <div className="input">
                            <input 
                                placeholder="DDD + Telefone"
                                value={phone}
                                onChange={e=> setPhone(e.target.value)}
                            />
                            
                            <img src={Union} alt="icon" />
                        </div>

                        <div className="input">
                            <input 
                                placeholder="Senha"
                                value={password}
                                onChange={e=> setPassword(e.target.value)}
                            />
                            
                            <img src={lock} alt="icon" />
                        </div>

                        <div className="input">
                            <input 
                                placeholder="Confirmar Senha"
                                value={confirmPassword}
                                onChange={e=> setConfirmPassword(e.target.value)}
                            />
                            
                            <img src={lock} alt="icon" />
                        </div>
                    </div>

                    <button className="button" type="submit">Registrar</button>
                </form>
            </div>
        </div>
    );
}