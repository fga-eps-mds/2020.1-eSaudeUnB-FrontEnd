import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

import api from '../../services/api';
import './styles.css';

import Union from '../../assets/images/Union.svg';
import NavBar from '../../components/NavBar';
import userIcon from '../../assets/images/userIcon.svg';

import Input from '../../components/Input';

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

    const [show, setShow] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [variant, setVariant] = useState('');

    const history = useHistory();

    function haveAlert(event) {
        event.preventDefault();
        if (props.location.state) {
            setShow(props.location.state.alert.show);
            setVariant(props.location.state.alert.variant);
            setAlertText(props.location.state.alert.alertText);
        }
        setInterval(() => {
            setShow(false);
        }, 4000);
    }

    function getOut(event) {
        event.preventDefault();

        history.push('/');
    }

    async function updateInfos(event) {
        try {
            event.preventDefault();

            const response = await api.put(`/userUpdate/${props.location.state.data.email}`, {
                name, lastName, email, phone, unbRegistration, gender, bond, civilStatus, religion,
            });

            if (response.status === 200) {
                history.push({
                    pathname: '/profile',
                    state: {
                        data: response.data,
                        alert: {
                            show: true,
                            variant: 'success',
                            alertText: 'Atualização efetuada.',
                        },
                    },
                });

                setEmail(response.data.email);
                setName(response.data.name);
                setLastName(response.data.lastName);
                setPhone(response.data.phone);
                setUnbRegistration(response.data.unbRegistration);
                setGender(response.data.gender);
                setBond(response.data.bond);
                setCivilStatus(response.data.civilStatus);
                setReligion(response.data.religion);
            }
        } catch (err) {
            alert('Falha na atualização dos dados, tente novamente');
        }
    }
    return (
        <>
            <Menu />
            <div onLoad={haveAlert} className="userProfileContainer">
                {show ? (
                    <Alert className="alert" variant={variant}>{alertText}</Alert>
                ) : (
                        <div></div>
                    )}
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
                                    {/* <option value="" disabled selected hidden>Gênero</option> */}
                                    <option value="F">Feminino</option>
                                    <option value="M">Masculino</option>
                                    <option value="I">Não Identificar</option>
                                </select>

                                <select name="bond" onChange={(e) => setBond(e.target.value)}>
                                    {/* <option value="" disabled selected hidden>Vínculo</option> */}
                                    <option value="graduando">Graduando</option>
                                    <option value="posGraduando">Pós-Graduando</option>
                                    <option value="professor">Professor</option>
                                </select>

                            </div>

                            <select className="selectsLargest" name="civilStatus" onChange={(e) => setCivilStatus(e.target.value)}>
                                {/* <option value="" disabled selected hidden>Estado Civil</option> */}
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
                                {/* <option value="" disabled selected hidden>Religião</option> */}
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
