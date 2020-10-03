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
    const [biography, setBiography] = useState('');

    const [show, setShow] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [variant, setVariant] = useState('');

    const history = useHistory();

    function getOut(event) {
        event.preventDefault();

        history.push('/');
    }

    function handleWrongField(field) {
        setShow(true);
        setVariant('danger');

        if (field === 'name') {
            return setAlertText('O campo "Nome" não está preenchido corretamente.');
        }
        if (field === 'lastName') {
            return setAlertText('O campo "Sobrenome" não está preenchido corretamente.');
        }
        if (field === 'email') {
            return setAlertText('O campo "Email" não está preenchido corretamente.');
        }
        if (field === 'specialization') {
            return setAlertText('O campo "Especialização" não está preenchido corretamente.');
        }
        if (field === 'biography') {
            return setAlertText('O campo "Biografia" não está preenchido corretamente.');
        }
        if (field === 'gender') {
            return setAlertText('O campo "Gênero" não está preenchido corretamente.');
        }
        if (field === 'phone') {
            return setAlertText('O campo "Telefone" não está preenchido corretamente.');
        }
        if (field === 'bond') {
            return setAlertText('O campo "Vínculo" não está preenchido corretamente.');
        }
    }

    async function updateInfos(event) {
        try {
            event.preventDefault();

            const response = await api.put(`/psyUpdate/${props.location.state.data.email}`, {
                name, lastName, email, phone, specialization, gender, bond, biography,
            });

            if (response.status === 203) {
                const field = response.data.error.details[0].path[0];
                handleWrongField(field);
                setInterval(() => {
                    setShow(false);
                }, 3500);
                return history.push({
                    pathname: '/psy-profile',
                    state: {
                        data: response.data.value,
                    },
                });
            }

            if (response.status === 200) {
                history.push({
                    pathname: '/psy-profile',
                    state: {
                        data: response.data,
                    },
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
                setBiography(response.data.biography);
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
            <NavBar bond="Psychologist" actualUser={props.location.state.data} />
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

                                        <select name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                            <option value="" disabled>Gênero</option>
                                            <option value="F" >Feminino</option>
                                            <option value="M">Masculino</option>
                                            <option value="I">Não Identificar</option>
                                        </select>

                                        <select name="bond" value={bond} onChange={(e) => setBond(e.target.value)}>
                                            <option value="" disabled>Vínculo</option>
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
                                value={biography}
                                onChange={(e) => setBiography(e.target.value)}
                                placeholder="Por favor adicione uma curta biografia ao seu perfil.(até 300 caracteres)"
                            />

                            <div className="buttons">
                                <button className="button-salvar" type="submit">Salvar</button>
                                <button className="button-sair" onClick={getOut}>Sair</button>
                            </div>
                        </form>
                    </div>

                    <div className="secondColumn" >
                        <Link
                            className="link"
                            to={{
                                pathname: "/psychology/schedule",
                                state: {
                                    data: props.location.state.data,
                                }
                            }}
                        >
                            Configurar meu cronograma
                        </Link>
                        {/* <Link className="link" to="/" >Alterar Senha</Link> */}
                    </div>
                </div>
            </div>
        </>
    );
}
PsyProfile.propTypes = {
    location: PropTypes.object,
};
