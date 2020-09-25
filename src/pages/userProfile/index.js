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
                    }
                });

                setShow(true);
                setVariant('success');
                setAlertText('Dados atualizados com sucesso.');
            }
        } catch (err) {
            setShow(true);
            setVariant('danger');
            setAlertText('Falha na atualização dos dados, tente novamente');
        }
        setInterval(() => {
            setShow(false);
        }, 2000);
    }

    async function renderPage(event) {
        try {
            event.preventDefault();

            const response = await api.get(`/user/${props.location.state.data.email}`);

            if (response.status === 200) {
                setEmail(response.data.email);
                setName(response.data.name);
                setLastName(response.data.lastName);
                setPhone(response.data.phone);
                setReligion(response.data.religion);
                setUnbRegistration(response.data.unbRegistration);
                setGender(response.data.gender);
                setBond(response.data.bond);
                setCivilStatus(response.data.civilStatus);
            }
        } catch (err) {
            setShow(true);
            setVariant('danger');
            setAlertText('Erro ao carregar dados');
        }
        setInterval(() => {
            setShow(false);
        }, 2000);
    }

    return (
        <>
            <NavBar />
            <div onLoad={renderPage} className="userProfileContainer">
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
                                onChange={setName}
                            />
                            <Input
                                placeholder="Email"
                                value={email}
                                onChange={setEmail}
                            />

                            <div className="selects">

                                <select name="gender" onChange={(e) => setGender(e.target.value)}>
                                    <option value="">Gênero</option>
                                    <option value="F">Feminino</option>
                                    <option value="M">Masculino</option>
                                    <option value="I">Não Identificar</option>
                                </select>

                                <select name="bond" onChange={(e) => setBond(e.target.value)}>
                                    <option value="">Vínculo</option>
                                    <option value="graduando">Graduando</option>
                                    <option value="posGraduando">Pós-Graduando</option>
                                    <option value="professor">Professor</option>
                                </select>

                            </div>

                            <select className="selectsLargest" name="civilStatus" onChange={(e) => setCivilStatus(e.target.value)}>
                                <option value="">Estado Civil</option>
                                <option value="Solteiro(a)">Solteiro</option>
                                <option value="Divorciado(a)">Divorciado</option>
                                <option value="Casado(a)">Casado</option>
                                <option value="Viuvo(a)">Viuvo</option>
                            </select>
                        </div>

                        <div className="form">
                            <Input
                                placeholder="Sobrenome"
                                value={lastName}
                                onChange={setLastName}
                            />
                            <Input
                                placeholder="Matrícula UnB"
                                value={unbRegistration}
                                onChange={setUnbRegistration}
                            />
                            <Input
                                placeholder="DDD + Telefone"
                                value={phone}
                                onChange={setPhone}
                            />
                            <select className="selectsLargest" name="religion" onChange={(e) => setReligion(e.target.value)}>
                                <option value="">Religião</option>
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
