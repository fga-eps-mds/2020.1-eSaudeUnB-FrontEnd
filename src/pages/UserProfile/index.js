import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert, Modal, Button } from 'react-bootstrap';

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
                }

                setInterval(() => {
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
            }
        } catch (err2) {
            if (err2.response.status === 401) {
                setShow(true);
                setVariant('danger');
                setAlertText('Sessão expirada');
                return setInterval(() => {
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
                            </div>
                        </div>
                        <div className="buttons">
                            <button className="button-change" onClick={() => setShowModal(true)}>
                                Alterar Senha
                            </button>

                            <Modal
                            show={showModal}
                            onHide={
                                () => {
                                    setAlertConfirmPassword(false);
                                    setShowModal(false);
                                    setActualPassword('');
                                    setNewPassword('');
                                    setConfirmNewPassword('');
                                }
                            }
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
                                    onClick={
                                        () => {
                                            setAlertConfirmPassword(false);
                                            setShowModal(false);
                                            setActualPassword('');
                                            setNewPassword('');
                                            setConfirmNewPassword('');
                                        }
                                    }
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