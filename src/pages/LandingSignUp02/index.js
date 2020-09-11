import React, { useState } from 'react';

import userIcon from '../../assets/images/userIcon.svg';
import Union from '../../assets/images/Union.svg';
import lock from '../../assets/images/lock.svg';

import Logo from '../../components/Logo';
import './styles.css';

export default function LandingSignUp02() {
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [unbRegistration, setUnbRegistration] = useState("");

    return(
        <div className="signUp02Container">
            <div className="content">
                <Logo />

                <form className="form">
                    <img src={userIcon} alt="userIcon" />

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
                            placeholder="Matrícula UnB"
                            value={unbRegistration}
                            onChange={e=> setUnbRegistration(e.target.value)}
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

                    <button className='button' type='submit'>Registrar</button>
                </form>
            </div>
        </div>
    );
}