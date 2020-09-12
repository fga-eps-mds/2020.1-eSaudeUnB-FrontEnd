import React, { useState } from 'react';

import api from '../../services/api';

import userIcon from '../../assets/images/userIcon.svg';
import Union from '../../assets/images/Union.svg';
import lock from '../../assets/images/lock.svg';

import Logo from '../../components/Logo';
import './styles.css';

export default function LandingSignUp02(props) {
    const [gender, setGender] = useState("");
    const [bond, setBond] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [unbRegistration, setUnbRegistration] = useState("");

    function handleSignUp02() {
        try {
            const user = {
                name: props.location.state.name,
                lastName: props.location.state.lastName,
                email: props.location.state.email,
                phone: props.location.state.phone,
                password,
                unbRegistration,
                gender,
                bond,
            }

            api.post('/users', user);
        } catch(err) {
            alert("Erro no cadastro, tente novamente");
        }
    }

    return(
        <div className="signUp02Container">
            <div className="content">
                <Logo />

                <form className="form" onSubmit={handleSignUp02}>
                    <img src={userIcon} alt="userIcon" />

                    <div className="selects">

                        <select name="gender" onChange={e => setGender(e.target.value)}>
                            <option value="feminino">Feminino</option>
                            <option value="masculino">Masculino</option>
                            <option value="naoIdentificar">Não Identificar</option>
                        </select>

                        <select name="bond" onChange={e => setBond(e.target.value)} >
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