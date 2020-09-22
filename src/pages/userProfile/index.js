import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from '../../components/Input';
import Union from '../../assets/images/Union.svg';
import Menu from '../../components/Menu/Menu';
import userIcon from '../../assets/images/userIcon.svg';
import api from '../../services/api';
import './styles.css';

export default function UserProfile(props) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [unbRegistration, setUnbRegistration] = useState('');
    const [gender, setGender] = useState('');
    const [bond, setBond] = useState('');
    const [civilStatus, setCivilStatus] = useState('');
    const [religion, setReligion] = useState('');
    const history = useHistory();

    function getOut(event) {
        event.preventDefault();

        history.push('/');
    }

    async function updateInfos(event) {
        try {
            event.preventDefault();

            const response = await api.put(`/userUpdate/${props.location.state.email}`, {
                name, lastName, email, phone, unbRegistration, gender, bond, civilStatus, religion,
            });

            if (response.status === 200) {
                alert('Atualização efetuada');
                history.push({
                    pathname: '/profile',
                    state: response.data,
                });
                setEmail('');
                setName('');
                setLastName('');
                setPhone('');
                setUnbRegistration('');
                setGender('');
                setBond('');
                setCivilStatus('');
                setReligion('');
            }
        } catch (err) {
            alert('Falha na atualização dos dados, tente novamente');
        }
    }
    return (
        <>
            <Menu />
            <div className="userProfileContainer">

                <div className="content">
                    <div className="profile">
                        <img className="userIcon" src={userIcon} alt="icone de usuario" />
                    </div>
                    <form className="formColumn" onSubmit={updateInfos}>
                        <div className="form">
                            <Input
                                placeholder="Nome"
                                value={name}
                                icon={Union}
                                onChange={setName}
                            />
                            <Input
                                placeholder="Email"
                                value={email}
                                icon={Union}
                                onChange={setEmail}
                            />

                            <div className="selects">

                                <select name="gender" onChange={(e) => setGender(e.target.value)}>
                                    <option value="" disabled selected hidden>Gênero</option>
                                    <option value="F">Feminino</option>
                                    <option value="M">Masculino</option>
                                    <option value="I">Não Identificar</option>
                                </select>

                                <select name="bond" onChange={(e) => setBond(e.target.value)}>
                                    <option value="" disabled selected hidden>Vínculo</option>
                                    <option value="graduando">Graduando</option>
                                    <option value="posGraduando">Pós-Graduando</option>
                                    <option value="professor">Professor</option>
                                </select>

                            </div>

                            <select className="selectsLargest" name="civilStatus" onChange={(e) => setCivilStatus(e.target.value)}>
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
                                onChange={setLastName}
                            />
                            <Input
                                placeholder="Matrícula UnB"
                                value={unbRegistration}
                                icon={Union}
                                onChange={setUnbRegistration}
                            />
                            <Input
                                placeholder="DDD + Telefone"
                                value={phone}
                                icon={Union}
                                onChange={setPhone}
                            />
                            <select className="selectsLargest" name="religion" onChange={(e) => setReligion(e.target.value)}>
                                <option value="" disabled selected hidden>Religião</option>
                                <option value="Solteiro">Católico</option>
                                <option value="Divorciado">Evangélico</option>
                                <option value="Casado">Espirita</option>
                                <option value="Viuvo">Outra</option>
                            </select>
                        </div>
                        <div className="buttons">
                            <button className="button-salvar" type="submit">Salvar</button>
                            <button className="button-sair" onClick={getOut}>Sair</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
UserProfile.propTypes = {
    location: PropTypes.object,
};
