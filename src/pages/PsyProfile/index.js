import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

import userIcon from '../../assets/images/userIcon.svg';

import Input from '../../components/Input';
import NavBar from '../../components/NavBar';

import api from '../../services/api';
import './styles.css';

export default function PsyProfile(props) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [gender, setGender] = useState('');
    const [bond, setBond] = useState('');
    const [bibliography, setBibliography] = useState('');

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

            const response = await api.put(`/psyUpdate/${props.location.state.data.email}`, {
                name, lastName, email, phone, specialization, gender, bond, bibliography,
            });

            if (response.status === 200) {
                history.push({
                    pathname: '/psy-profile',
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
            setAlertText('Falha na atualização dos dados, tente novamente.');
        }
        setInterval(() => {
            setShow(false);
        }, 2000);
    }

    async function renderPage(event) {
        try {
            event.preventDefault();

            const response = await api.get(`/psy/${props.location.state.data.email}`);

            if (response.status === 200) {
                setEmail(response.data.email);
                setName(response.data.name);
                setLastName(response.data.lastName);
                setPhone(response.data.phone);
                setSpecialization(response.data.specialization);
                setGender(response.data.gender);
                setBond(response.data.bond);
                setBibliography(response.data.bibliography);
            }
        } catch (err) {
            setShow(true);
            setVariant('danger');
            setAlertText('Erro ao carregar dados.');
            setInterval(() => {
                setShow(false);
            }, 2000);
        }
    }

    return (
        <>
            <NavBar />
            <div className="psyProfileContainer" onLoad={renderPage}>
                {show ? (
                    <Alert className="alert" variant={variant}>{alertText}</Alert>
                ) : (
                        <div></div>
                    )}
                <div className="content">
                    <div className="firstColumn">
                        <div className="profile">
                            <img className="userIcon" src={userIcon} alt="icone de usuario" />
                        </div>
                        <form className="form" onSubmit={updateInfos}>
                            <div className="formColumn">
                                <div>
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
                                            <option value="F" >Feminino</option>
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
                                </div>

                                <div>
                                    <Input
                                        placeholder="Sobrenome"
                                        value={lastName}
                                        onChange={setLastName}
                                    />
                                    <Input
                                        placeholder="Especialização"
                                        value={specialization}
                                        onChange={setSpecialization}
                                    />
                                    <Input
                                        placeholder="DDD + Telefone"
                                        value={phone}
                                        onChange={setPhone}
                                    />
                                </div>
                            </div>
                            <textarea
                                maxLength="300"
                                value={bibliography}
                                onChange={(e) => setBibliography(e.target.value)}
                                placeholder="Por favor adicione uma curta biografia ao seu perfil.(até 300 caracteres)"
                            />

                            <div className="buttons">
                                <button className="button-salvar" type="submit">Salvar</button>
                                <button className="button-sair" onClick={getOut}>Sair</button>
                            </div>
                        </form>
                    </div>

                    <div className="secondColumn" >
                        <Link className="link" to="/" >Configurar meu cronograma</Link>
                        <Link className="link" to="/" >Alterar Senha</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
PsyProfile.propTypes = {
    location: PropTypes.object,
};
