import React, { useState } from 'react';
import Input from '../../components/Input'
import Union from '../../assets/images/Union.svg'
import Menu from '../../components/Menu/Menu'
import userIcon from '../../assets/images/userIcon.svg'
import './styles.css'

export default function UserProfile() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [unbRegistration, setUnbRegistration] = useState('');
    return (
        <><Menu/>
        <div className="userProfileContainer">
            
            <div className="content">
                <div className="profile">
                    <img className="userIcon" src={userIcon} alt="icone de usuario" />
                </div>
                <div className="form">
                    <Input
                        placeholder="Nome"
                        value={name}
                        icon={Union}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        placeholder="Email"
                        value={email}
                        icon={Union}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="selects">

                        <select name="gender">
                            <option value="" disabled selected hidden>Gênero</option>
                            <option value="F">Feminino</option>
                            <option value="M">Masculino</option>
                            <option value="I">Não Identificar</option>
                        </select>

                        <select name="bond">
                            <option value="" disabled selected hidden>Vínculo</option>
                            <option value="graduando">Graduando</option>
                            <option value="posGraduando">Pós-Graduando</option>
                            <option value="professor">Professor</option>
                        </select>

                    </div>

                    <select className="container" name="civilStatus">
                        <option value="" disabled selected hidden>Estado Civil</option>
                        <option value="Solteiro">Solteiro</option>
                        <option value="Divorciado">Divorciado</option>
                        <option value="Casado">Casado</option>
                        <option value="Viuvo">Viuvo</option>
                    </select>
                </div>

                <div className="form">
                    <Input
                        placeholder="Sobrenome"
                        value={lastName}
                        icon={Union}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <Input
                        placeholder="Matrícula UnB"
                        value={unbRegistration}
                        icon={Union}
                        onChange={(e) => setUnbRegistration(e.target.value)}
                    />
                    <Input
                        placeholder="DDD + Telefone"
                        value={phone}
                        icon={Union}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <select className="container" name="religion">
                        <option value="" disabled selected hidden>Religião</option>
                        <option value="Solteiro">Católigo</option>
                        <option value="Divorciado">Evangélico</option>
                        <option value="Casado">Espirita</option>
                        <option value="Viuvo">Outra</option>
                    </select>
                </div>
            </div>
        </div>
        </>
    );
}
