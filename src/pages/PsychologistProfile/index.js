import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

import userIcon from '../../assets/images/userIcon.svg';

import Input from '../../components/Input';
import NavBar from '../../components/NavBar';

import api from '../../services/api';
import './styles.css';

export default function PsychologistProfile(props) {
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

    const [alertContentName, setAlertContentName] = useState(false);
    const [alertContentLastName, setAlertContentLastName] = useState(false);
    const [alertContentEmail, setAlertContentEmail] = useState(false);
    const [alertContentSpecialization, setAlertContentSpecialization] = useState(false);
    const [alertContentBiography, setAlertContentBiography] = useState(false);
    const [alertContentGender, setAlertContentGender] = useState(false);
    const [alertContentPhone, setAlertContentPhone] = useState(false);
    const [alertContentBond, setAlertContentBond] = useState(false);

    function closeAlerts() {
        setAlertContentName(false);
        setAlertContentLastName(false);
        setAlertContentEmail(false);
        setAlertContentSpecialization(false);
        setAlertContentBiography(false);
        setAlertContentGender(false);
        setAlertContentPhone(false);
        setAlertContentBond(false);
    }

    function getOut(event) {
        event.preventDefault();

        history.push('/');
    }

    async function updateInfos(event) {
        try {
            event.preventDefault();

            const response = await api.put(`/psyUpdate/${props.location.state.data.email}`, {
                name, lastName, email, phone, specialization, gender, bond, biography,
            });

            if (response.status === 203) {
                const { details } = response.data.error;
                closeAlerts();

                for (let value = 0; value < response.data.error.details.length; value += 1) {
                    if (details[value].path[0] === 'name') {
                        setAlertContentName(true);
                    }
                    if (details[value].path[0] === 'lastName') {
                        setAlertContentLastName(true);
                    }
                    if (details[value].path[0] === 'email') {
                        setAlertContentEmail(true);
                    }
                    if (details[value].path[0] === 'phone') {
                        setAlertContentPhone(true);
                    }
                    if (details[value].path[0] === 'specialization') {
                        setAlertContentSpecialization(true);
                    }
                    if (details[value].path[0] === 'biography') {
                        setAlertContentBiography(true);
                    }
                    if (details[value].path[0] === 'gender') {
                        setAlertContentGender(true);
                    }
                    if (details[value].path[0] === 'bond') {
                        setAlertContentBond(true);
                    }
                }

                return history.push({
                    pathname: '/psychologist/profile',
                    state: {
                        data: response.data.value,
                    },
                });
            }

            if (response.status === 200) {
                history.push({
                    pathname: '/psychologist/profile',
                    state: {
                        data: response.data,
                    },
                });

                closeAlerts();

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

        return 0;
    }

    async function renderPage(event) {
        try {
            event.preventDefault();

            const response = await api.get(`/psychologist/${props.location.state.data.email}`);

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
                                    {alertContentName ? (
                                        <div className="alertContent">
                                            <p>Nome precisa possuir mais de 2 letras.</p>
                                        </div>
                                    ) : (
                                        <div className="alertContent">
                                            <p></p>
                                        </div>
                                    )}

                                    <Input
                                        placeholder="Email"
                                        value={email}
                                        onChange={setEmail}
                                    />
                                    {alertContentEmail ? (
                                        <div className="alertContent">
                                            <p>E-mail não foi preenchido corretamente.</p>
                                        </div>
                                    ) : (
                                        <div className="alertContent">
                                            <p></p>
                                        </div>
                                    )}

                                    <div className="selects">

                                        <select name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                            <option value="" disabled>Gênero</option>
                                            <option value="F" >Feminino</option>
                                            <option value="M">Masculino</option>
                                            <option value="I">Não Identificar</option>
                                        </select>
                                        {alertContentGender ? (
                                            <div className="alertContent">
                                                <p>Selecione um gênero.</p>
                                            </div>
                                        ) : (
                                            <div className="alertContent">
                                                <p></p>
                                            </div>
                                        )}

                                        <select name="bond" value={bond} onChange={(e) => setBond(e.target.value)}>
                                            <option value="" disabled>Vínculo</option>
                                            <option value="graduando">Graduando</option>
                                            <option value="posGraduando">Pós-Graduando</option>
                                            <option value="professor">Professor</option>
                                        </select>
                                        {alertContentBond ? (
                                            <div className="alertContent">
                                                <p>Selecione um vínculo.</p>
                                            </div>
                                        ) : (
                                            <div className="alertContent">
                                                <p></p>
                                            </div>
                                        )}

                                    </div>
                                </div>

                                <div>
                                    <Input
                                        placeholder="Sobrenome"
                                        value={lastName}
                                        onChange={setLastName}
                                    />
                                    {alertContentLastName ? (
                                        <div className="alertContent">
                                            <p>
                                                Sobrenome precisa possuir mais de 2 letras.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="alertContent">
                                            <p></p>
                                        </div>
                                    )}

                                    <Input
                                        placeholder="Especialização"
                                        value={specialization}
                                        onChange={setSpecialization}
                                    />
                                    {alertContentSpecialization ? (
                                        <div className="alertContent">
                                            <p>
                                                Informe a Especialização.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="alertContent">
                                            <p></p>
                                        </div>
                                    )}

                                    <Input
                                        placeholder="DDD + Telefone"
                                        value={phone}
                                        onChange={setPhone}
                                    />
                                    {alertContentPhone ? (
                                        <div className="alertContent">
                                            <p>Insira um telefone válido.</p>
                                        </div>
                                    ) : (
                                        <div className="alertContent">
                                            <p></p>
                                        </div>
                                    )}

                                </div>
                            </div>
                            <textarea
                                maxLength="300"
                                value={biography}
                                onChange={(e) => setBiography(e.target.value)}
                                placeholder="Por favor adicione uma curta biografia ao seu perfil.(até 300 caracteres)"
                            />
                            {alertContentBiography ? (
                                <div className="alertContent">
                                    <p>A biografia deve conter no máximo 300 caracteres.</p>
                                </div>
                            ) : (
                                <div className="alertContent">
                                    <p></p>
                                </div>
                            )}

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
                                pathname: '/psychologist/schedule',
                                state: {
                                    data: props.location.state.data,
                                },
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
PsychologistProfile.propTypes = {
    location: PropTypes.object,
};
