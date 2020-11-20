import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Alert, Modal, Button,
} from 'react-bootstrap';

import api from '../../services/api';
import './styles.css';

import NavBar from '../../components/NavBar';
import userIcon from '../../assets/images/userIcon.svg';
import { convertBase64, uploadImage } from '../../components/UserImage';
import figureCaption from '../../assets/images/figureCaption.png';

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
    const [userImage, setUserImage] = useState('');
    //novos campos
    const [race, setRace] = useState('');
    const [sexualOrientation, setSexualOrientation] = useState('');
    const [children, setChildren] = useState('');
    const [emergencyContactName, setEmergencyContactName] = useState('');
    const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
    const [emergencyContactBond, setEmergencyContactBond] = useState('');

    //fim novos campos
    const [currentImage, setCurrentImage] = useState('');
    const [show, setShow] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [variant, setVariant] = useState('');

    const history = useHistory();
    const accessToken = localStorage.getItem('accessToken');
    const UserEmail = localStorage.getItem('user');

    const [alertContentName, setAlertContentName] = useState(false);
    const [alertContentLastName, setAlertContentLastName] = useState(false);
    const [alertContentEmail, setAlertContentEmail] = useState(false);
    const [alertContentPhone, setAlertContentPhone] = useState(false);
    const [
        alertContentUnbRegistration,
        setAlertContentUnbRegistration,
    ] = useState(false);
    const [alertContentGender, setAlertContentGender] = useState(false);
    const [alertContentBond, setAlertContentBond] = useState(false);
    const [alertContentCivilStatus, setAlertContentCivilStatus] = useState(
        false,
    );
    //novos campos
    const [alertContentRace, setAlertContentRace] = useState(false);
    const [alertContentSexualOrientation, setAlertContentSexualOrientation] = useState(false);
    const [alertContentEmergencyContactName, setAlertContentEmergencyContactName] = useState(false);
    const [alertContentEmergencyContactPhone, setAlertContentEmergencyContactPhone] = useState(false);
    const [alertContentEmergencyContactBond, setAlertContentEmergencyContactBond] = useState(false);   

    const [alertConfirmPassword, setAlertConfirmPassword] = useState(false);
    const [alertPasswordText, setAlertPasswordtext] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [actualPassword, setActualPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    function closeAlerts() {
        setAlertContentName(false);
        setAlertContentLastName(false);
        setAlertContentEmail(false);
        setAlertContentPhone(false);
        setAlertContentUnbRegistration(false);
        setAlertContentGender(false);
        setAlertContentBond(false);
        setAlertContentCivilStatus(false);
        //novos campos
        setAlertContentRace(false);
        setAlertContentSexualOrientation(false);
    }

    function getOut(event) {
        event.preventDefault();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        history.push('/');
    }

    async function updatePassword(event) {
        event.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setAlertPasswordtext('As senhas devem ser iguais');
            setAlertConfirmPassword(true);
            return;
        }

        if (newPassword === confirmNewPassword) {
            setAlertConfirmPassword(false);

            try {
                const response = await api.put(`/user/password/${UserEmail}`, {
                    oldPassword: actualPassword,
                    password: newPassword,
                },
                    { headers: { authorization: accessToken } });

                if (response.status === 203) {
                    setAlertPasswordtext('A nova senha deve ter no mínimo 8 caracteres.');
                    setAlertConfirmPassword(true);
                }

                if (response.status === 200) {
                    setShowModal(false);
                    setShow(true);
                    setVariant('success');
                    setAlertText('Senha alterada com sucesso.');
                }
            } catch (err) {
                if (err.response.status === 400) {
                    setAlertPasswordtext('A senha atual está incorreta.');
                    setAlertConfirmPassword(true);
                    return;
                }
                setAlertPasswordtext('Ocorreu algum erro ao atualizar a senha, tente novamente.');
                setAlertConfirmPassword(true);
            }
        }
    }

    async function updateInfos(event) {
        try {
            event.preventDefault();

            const response = await api.put(`/user/${UserEmail}`, {
                name,
                lastName,
                email,
                phone,
                unbRegistration,
                gender,
                bond,
                civilStatus,
                religion,
                userImage: currentImage,
                //novos campos
                race,
                sexualOrientation,
                children,
            },
                { headers: { authorization: accessToken } });

            if (response.status === 203) {
                const { details } = response.data.error;
                closeAlerts();
                for (
                    let value = 0;
                    value < response.data.error.details.length;
                    value += 1
                ) {
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
                    if (details[value].path[0] === 'unbRegistration') {
                        setAlertContentUnbRegistration(true);
                    }
                    if (details[value].path[0] === 'gender') {
                        setAlertContentGender(true);
                    }
                    if (details[value].path[0] === 'bond') {
                        setAlertContentBond(true);
                    }
                    if (details[value].path[0] === 'civilStatus') {
                        setAlertContentCivilStatus(true);
                    }
                    //novos campos
                    if (details[value].path[0] === 'race') {
                        setAlertContentRace(true);
                    }
                    if (details[value].path[0] === 'sexualOrientation') {
                        setAlertContentSexualOrientation(true);
                    }

                }

                setTimeout(() => {
                    setShow(false);
                }, 3500);
                return history.push({
                    pathname: '/profile',
                    state: {
                        data: response.data.value,
                    },
                });
            }

            if (response.status === 200) {
                history.push({
                    pathname: '/profile',
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
            setAlertText('Falha na atualização dos dados, tente novamente');
        }
        setInterval(() => {
            setShow(false);
        }, 2000);

        return 0;
    }
    async function renderPage(event) {
        try {
            event.preventDefault();
            const response = await api.get(`/user/${UserEmail}`, {
                headers: { authorization: accessToken },
            });
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
                if (response.data.userImage) {
                    setUserImage(
                        atob(
                            Buffer.from(
                                response.data.userImage,
                                'binary',
                            ).toString('base64'),
                        ),
                    );
                }
                //novos campos
                setRace(response.data.race);
                setSexualOrientation(response.data.sexualOrientation);
                setChildren(response.data.sexualOrientation);
            }
        } catch (err2) {
            if (err2.response.status === 401) {
                setShow(true);
                setVariant('danger');
                setAlertText('Sessão expirada');
                return setTimeout(() => {
                    getOut(event);
                }, 2000);
            }
            setShow(true);
            setVariant('danger');
            setAlertText('Erro ao carregar dados');
        }
        setInterval(() => {
            setShow(false);
        }, 2000);
    }

    return (
        <div>
            <NavBar actualUser={props.location.state.data} />

            <div onLoad={renderPage} className="userProfileContainer">
                {show ? (
                    <Alert className="alert" variant={variant}>
                        {alertText}
                    </Alert>
                ) : (
                        <div></div>
                    )}

                <div className="content">
                    <form className="formColumn" onSubmit={updateInfos}>
                        <div className="personal-image">
                            <label className="label">
                                <input
                                    id="image"
                                    type="file"
                                    onChange={async (e) => {
                                        uploadImage(e);
                                        const image = await convertBase64(
                                            e.target.files[0],
                                        );
                                        setCurrentImage(image);
                                    }}
                                />
                                <figure className="personal-figure">
                                    <img
                                        src={
                                            currentImage
                                            || userImage
                                            || userIcon
                                        }
                                        className="personal-avatar"
                                        alt="avatar"
                                    />
                                    <figcaption className="personal-figcaption">
                                        <img
                                            src={figureCaption}
                                            alt="figureCaption"
                                        />
                                    </figcaption>
                                </figure>
                            </label>
                        </div>
                        <div className="inputs">
                            <div className="form">
                                <Input
                                    placeholder="Nome"
                                    value={name}
                                    onChange={setName}
                                />

                                {alertContentName ? (
                                    <div className="alertContent">
                                        <p>
                                            Nome precisa possuir mais de 2
                                            letras.
                                        </p>
                                    </div>
                                ) : (
                                        <div className="alertContent">
                                            <p></p>
                                        </div>
                                    )}

                                <Input
                                    placeholder="Sobrenome"
                                    value={lastName}
                                    onChange={setLastName}
                                />
                                {alertContentLastName ? (
                                    <div className="alertContent">
                                        <p>
                                            Sobrenome precisa possuir mais de 2
                                            letras.
                                        </p>
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
                                        <p>
                                            E-mail não foi preenchido
                                            corretamente.
                                        </p>
                                    </div>
                                ) : (
                                        <div className="alertContent">
                                            <p></p>
                                        </div>
                                    )}

                                <Input
                                    placeholder="Matrícula UnB"
                                    value={unbRegistration || ''}
                                    onChange={setUnbRegistration}
                                />
                                {alertContentUnbRegistration ? (
                                    <div className="alertContent">
                                        <p>Insira uma matrícula válida.</p>
                                    </div>
                                ) : (
                                        <div className="alertContent">
                                            <p></p>
                                        </div>
                                    )}
                                
                                <select
                                    className="selectsLargest"
                                    name="bond"
                                    value={bond || ''}
                                    onChange={(e) => setBond(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Vínculo
                                    </option>
                                    <option value="graduando">Graduando</option>
                                    <option value="posGraduando">
                                        Pós-Graduando
                                    </option>
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
                                 <Input
                                    placeholder="Nome contato de emergência"
                                    value={emergencyContactName || ''}
                                    onChange={setEmergencyContactName}
                                />

                                {alertContentEmergencyContactName ? (
                                    <div className="alertContent">
                                        <p>
                                            Campo obrigatório. Nome deve possuir mais de 2 letras.
                                        </p>
                                    </div>
                                ) : (
                                        <div className="alertContent">
                                            <p></p>
                                        </div>
                                    )}
                                    <Input
                                    placeholder="Telefone contato de emergência"
                                    value={emergencyContactPhone || ''}
                                    onChange={setEmergencyContactPhone}
                                />

                                {alertContentEmergencyContactPhone ? (
                                    <div className="alertContent">
                                        <p>
                                            Campo obrigatório. Insira um número válido.
                                        </p>
                                    </div>
                                ) : (
                                        <div className="alertContent">
                                            <p></p>
                                        </div>
                                    )}
                                    <Input
                                    placeholder="Vínculo contato de emergência"
                                    value={emergencyContactBond || ''}
                                    onChange={setEmergencyContactBond}
                                />

                                {alertContentEmergencyContactBond? (
                                    <div className="alertContent">
                                        <p>
                                            Campo obrigatório. Deve possuir mais de 2 letras.
                                        </p>
                                    </div>
                                ) : (
                                        <div className="alertContent">
                                            <p></p>
                                        </div>
                                    )}
                            </div>

                            <div className="form">
                                <Input
                                    placeholder="DDD + Telefone"
                                    value={phone || ''}
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

                                <select
                                    className="selectsLargest"
                                    name="gender"
                                    value={gender || ''}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Gênero
                                    </option>
                                    <option value="F">Feminino</option>
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
                                {/*campo novo de orientação sexual*/}
                                <select
                                    className="selectsLargest"
                                    name="sexualOrientation"
                                    value={sexualOrientation || ''}
                                    onChange={(e) => setSexualOrientation(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Orientação Sexual
                                    </option>
                                    <option value="homossexual">Homossexual</option>
                                    <option value="bissexual">Bissexual</option>
                                    <option value="heterossexual">Heterossexual</option>
                                    <option value="prefiroNaoDizer">Prefiro não dizer</option>
                                </select>

                                {alertContentSexualOrientation ? (
                                    <div className="alertContent">
                                        <p>Selecione uma orientação sexual.</p>
                                    </div>
                                ) : (
                                        <div className="alertContent">
                                            <p></p>
                                        </div>
                                    )}

                                <select
                                    className="selectsLargest"
                                    name="children"
                                    value={children || ''}
                                    onChange={(e) => setChildren(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Tem filhos?
                                    </option>
                                    <option value="sim">Possuo filha(o)/filhas(os)</option>
                                    <option value="nao">Não possuo filha(o)/filhas(os)</option>
                                </select>

                                {alertContentSexualOrientation ? (
                                    <div className="alertContent">
                                        <p>Selecione uma orientação sexual.</p>
                                    </div>
                                ) : (
                                        <div className="alertContent">
                                            <p></p>
                                        </div>
                                    )}

                                <select
                                    className="selectsLargest"
                                    value={civilStatus || 'naoInformado'}
                                    name="civilStatus"
                                    onChange={(e) => setCivilStatus(e.target.value)
                                    }
                                >
                                    <option value="naoInformado" disabled>
                                        Estado Civil
                                    </option>
                                    <option value="Solteiro(a)">
                                        Solteiro
                                    </option>
                                    <option value="Divorciado(a)">
                                        Divorciado
                                    </option>
                                    <option value="Casado(a)">Casado</option>
                                    <option value="Viuvo(a)">Viuvo</option>
                                </select>

                                {alertContentCivilStatus ? (
                                    <div className="alertContent">
                                        <p>Informe o estado civil.</p>
                                    </div>
                                ) : (
                                        <div className="alertContent">
                                            <p></p>
                                        </div>
                                    )}
                                {/* novos campos */}
                                <select
                                    className="selectsLargest"
                                    name="race"
                                    value={race || ''}
                                    onChange={(e) => setRace(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Etnia/Raça
                                    </option>
                                    <option value="preta(o)">Preta(o)</option>
                                    <option value="parda(o)">Parda(o)</option>
                                    <option value="indigena">Índigena)</option>
                                    <option value="branca(o)">Branca(o)</option>
                                    <option value="prefiroNaoDizer">Prefiro não dizer</option>
                                </select>

                                {alertContentRace ? (
                                    <div className="alertContent">
                                        <p>Selecione uma Etnia/Raça.</p>
                                    </div>
                                ) : (
                                        <div className="alertContent">
                                            <p></p>
                                        </div>
                                    )}


                            </div>
                        </div>
                        <div className="buttons">
                        <button className="button-change" onClick={() => setShowModal(true)}>Alterar senha</button>
                <Modal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    backdrop="static"
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Mudar Senha
                                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Input
                            placeholder="Senha Atual"
                            value={actualPassword}
                            onChange={setActualPassword}
                        />
                        <Input
                            placeholder="Nova senha"
                            value={newPassword}
                            onChange={setNewPassword}
                        />
                        <Input
                            placeholder="Confirmar nova senha"
                            value={confirmNewPassword}
                            onChange={setConfirmNewPassword}
                        />
                        {alertConfirmPassword ? (
                            <div className="alertContent">
                                <p>
                                    {alertPasswordText}
                                </p>
                            </div>
                        ) : (
                                <div className="alertContent">
                                    <p></p>
                                </div>
                            )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={updatePassword}>Confirmar</Button>
                        <Button
                            variant="danger"
                            onClick={() => {
                                setAlertConfirmPassword(false);
                                setShowModal(false);
                                setActualPassword('');
                                setNewPassword('');
                                setConfirmNewPassword('');
                            }}
                        >
                            Cancelar
                                        </Button>
                    </Modal.Footer>
                </Modal>

                <button className="button-salvar" type="submit">
                    Salvar
                                </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
UserProfile.propTypes = {
    location: PropTypes.object,
};