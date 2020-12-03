import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert, Modal, Button } from 'react-bootstrap';

import api from '../../services/api';
import './styles.css';

import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import userIcon from '../../assets/images/userIcon.svg';
import { convertBase64, uploadImage } from '../../components/UserImage';
import figureCaption from '../../assets/images/figureCaption.png';
import arrow from '../../assets/images/go.svg';

import Input from '../../components/Input';

export default function UserProfile() {
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
    // novos campos
    const [race, setRace] = useState('');
    const [sexualOrientation, setSexualOrientation] = useState('');
    const [children, setChildren] = useState('');
    const [emergencyContactName, setEmergencyContactName] = useState('');
    const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
    const [emergencyContactBond, setEmergencyContactBond] = useState('');
    const [socialPrograms, setSocialPrograms] = useState('');
    const [studentHouseResidence, setStudentHouseResidence] = useState('');
    const [psychiatricFollowUp, setPsychiatricFollowUp] = useState('');
    const [medication, setMedication] = useState('');
    const [motherName, setMotherName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [affiliationPhone, setAffiliationPhone] = useState('');
    const [mainComplaint, setMainComplaint] = useState('');

    // fim novos campos
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
    // novos campos
    const [alertContentRace, setAlertContentRace] = useState(false);
    const [
        alertContentSexualOrientation,
        setAlertContentSexualOrientation,
    ] = useState(false);
    const [
        alertContentEmergencyContactName,
        setAlertContentEmergencyContactName,
    ] = useState(false);
    const [
        alertContentEmergencyContactPhone,
        setAlertContentEmergencyContactPhone,
    ] = useState(false);
    const [
        alertContentEmergencyContactBond,
        setAlertContentEmergencyContactBond,
    ] = useState(false);
    const [alertContentMotherName, setAlertContentMotherName] = useState(false);
    const [alertContentFatherName, setAlertContentFatherName] = useState(false);
    const [alertPsychiatricFollowUp, setAlertPsychiatricFollowUp] = useState(
        false,
    );
    const [alertContentMainComplaint, setAlertContentMainComplaint] = useState(
        false,
    );

    const [alertConfirmPassword, setAlertConfirmPassword] = useState(false);
    const [alertPasswordText, setAlertPasswordtext] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [actualPassword, setActualPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    function closeAlerts() {
        setAlertContentName(false);
        setAlertContentLastName(false);
        setAlertContentEmail(false);
        setAlertContentPhone(false);
        setAlertContentUnbRegistration(false);
        setAlertContentGender(false);
        setAlertContentBond(false);
        setAlertContentCivilStatus(false);
        // novos campos
        setAlertContentRace(false);
        setAlertContentSexualOrientation(false);
        setAlertContentEmergencyContactName(false);
        setAlertContentEmergencyContactPhone(false);
        setAlertContentEmergencyContactBond(false);
        setAlertContentMotherName(false);
        setAlertContentFatherName(false);
        setAlertPsychiatricFollowUp(false);
        setAlertContentMainComplaint(false);
    }

    function getOut(event) {
        event.preventDefault();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        history.push('/');
    }

    function toggleShow(event) {
        event.preventDefault();
        setShowPassword(!showPassword);
    }

    async function updatePassword(event) {
        event.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setAlertPasswordtext('As senhas devem ser iguais.');
            setAlertConfirmPassword(true);
            return;
        }

        if (newPassword === confirmNewPassword) {
            setAlertConfirmPassword(false);

            try {
                const response = await api.put(
                    `/user/password/${UserEmail}`,
                    {
                        oldPassword: actualPassword,
                        password: newPassword,
                    },
                    { headers: { authorization: accessToken } },
                );

                if (response.status === 203) {
                    setAlertPasswordtext(
                        'A nova senha deve ter no mínimo 8 caracteres.',
                    );
                    setAlertConfirmPassword(true);
                }

                if (response.status === 200) {
                    setShowModal(false);
                    setShow(true);
                    setVariant('success');
                    setAlertText('Senha alterada com sucesso.');
                    setTimeout(() => {
                        setShow(false);
                    }, 2000);
                }
            } catch (err) {
                if (err.response.status === 400) {
                    setAlertPasswordtext('A senha atual está incorreta.');
                    setAlertConfirmPassword(true);
                    return;
                }
                setAlertPasswordtext(
                    'Ocorreu algum erro ao atualizar a senha, tente novamente.',
                );
                setAlertConfirmPassword(true);
            }
        }
    }

    async function updateInfos(event) {
        try {
            event.preventDefault();

            const response = await api.put(
                `/user/${UserEmail}`,
                {
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
                    // novos campos
                    race,
                    sexualOrientation,
                    children,
                    emergencyContactName,
                    emergencyContactPhone,
                    emergencyContactBond,
                    motherName,
                    fatherName,
                    affiliationPhone,
                    socialPrograms,
                    studentHouseResidence,
                    psychiatricFollowUp,
                    medication,
                    mainComplaint,
                },
                { headers: { authorization: accessToken } },
            );

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
                    // novos campos
                    if (details[value].path[0] === 'race') {
                        setAlertContentRace(true);
                    }
                    if (details[value].path[0] === 'sexualOrientation') {
                        setAlertContentSexualOrientation(true);
                    }
                    if (details[value].path[0] === 'emergencyContactName') {
                        setAlertContentEmergencyContactName(true);
                    }
                    if (details[value].path[0] === 'emergencyContactPhone') {
                        setAlertContentEmergencyContactPhone(true);
                    }
                    if (details[value].path[0] === 'emergencyContactBond') {
                        setAlertContentEmergencyContactBond(true);
                    }
                    if (details[value].path[0] === 'motherName') {
                        setAlertContentMotherName(true);
                    }
                    if (details[value].path[0] === 'fatherName') {
                        setAlertContentFatherName(true);
                    }
                    if (details[value].path[0] === 'psychiatricFollowUp') {
                        setAlertPsychiatricFollowUp(true);
                    }
                    if (details[value].path[0] === 'mainComplaint') {
                        setAlertContentMainComplaint(true);
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
        setTimeout(() => {
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
                // novos campos
                setRace(response.data.race);
                setSexualOrientation(response.data.sexualOrientation);
                setChildren(response.data.children);
                setSocialPrograms(response.data.socialPrograms);
                setStudentHouseResidence(response.data.studentHouseResidence);
                setPsychiatricFollowUp(response.data.psychiatricFollowUp);
                setEmergencyContactName(response.data.emergencyContactName);
                setEmergencyContactPhone(response.data.emergencyContactPhone);
                setEmergencyContactBond(response.data.emergencyContactBond);
                setMedication(response.data.medication);
                setMotherName(response.data.motherName);
                setFatherName(response.data.fatherName);
                setAffiliationPhone(response.data.affiliationPhone);
                setMainComplaint(response.data.mainComplaint);
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
        setTimeout(() => {
            setShow(false);
        }, 10000);
        return [];
    }

    const [currentPage, setCurrentPage] = useState(1);

    function openPage1() {
        document.getElementById('page1').style.display = 'flex';
        document.getElementById('page2').style.display = 'none';
        document.getElementById('page3').style.display = 'none';
        setCurrentPage(1);
    }
    function openPage2() {
        document.getElementById('page1').style.display = 'none';
        document.getElementById('page2').style.display = 'flex';
        document.getElementById('page3').style.display = 'none';
        setCurrentPage(2);
    }
    function openPage3() {
        document.getElementById('page1').style.display = 'none';
        document.getElementById('page2').style.display = 'none';
        document.getElementById('page3').style.display = 'flex';
        setCurrentPage(3);
    }

    function handlePages(way) {
        if (currentPage === 1) {
            way === 'next' ? openPage2() : setCurrentPage(1);
        } else if (currentPage === 2) {
            way === 'next' ? openPage3() : openPage1();
        } else if (currentPage === 3) {
            way === 'next' ? setCurrentPage(3) : openPage2();
        } else {
            openPage1();
            setCurrentPage(1);
        }
    }

    return (
        <div>
            <NavBar className="navBar" bond="Patient" />

            <div onLoad={renderPage} className="userProfileContainer">
                {show ? (
                    <Alert className="alert" variant={variant}>
                        {alertText}
                    </Alert>
                ) : (
                        <></>
                    )}

                <div className="content">
                    <form className="formColumn" onSubmit={updateInfos}>
                        <button
                            className="button-page previousButton"
                            onClick={() => handlePages('prev')}
                        >
                            <img
                                src={arrow}
                                className="arrowButton"
                                alt="Previous"
                            ></img>
                        </button>

                        <div className="page page1" id="page1">
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

                            <div className="form">
                                <div className="formLeft">
                                    <div className="fieldDiv">
                                        <label className="upLabel">Nome</label>
                                        <Input
                                            placeholder="Preencha aqui"
                                            value={name}
                                            onChange={setName}
                                        />

                                        {alertContentName ? (
                                            <div className="alertContent">
                                                <p>
                                                    Nome precisa possuir mais de
                                                    2 letras.
                                                </p>
                                            </div>
                                        ) : (
                                                <div className="alertContent">
                                                    <p></p>
                                                </div>
                                            )}
                                    </div>

                                    <div className="fieldDiv">
                                        <label className="upLabel">
                                            Sobrenome
                                        </label>
                                        <Input
                                            placeholder="Preencha aqui"
                                            value={lastName}
                                            onChange={setLastName}
                                        />
                                        {alertContentLastName ? (
                                            <div className="alertContent">
                                                <p>
                                                    Sobrenome precisa possuir
                                                    mais de 2 letras.
                                                </p>
                                            </div>
                                        ) : (
                                                <div className="alertContent">
                                                    <p></p>
                                                </div>
                                            )}
                                    </div>

                                    <div className="fieldDiv">
                                        <label className="upLabel">Email</label>
                                        <Input
                                            placeholder="Preencha aqui"
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
                                    </div>
                                </div>

                                <div className="formRight">
                                    <div className="fieldDiv">
                                        <label className="upLabel">
                                            Matrícula
                                        </label>
                                        <Input
                                            placeholder="Preencha aqui"
                                            value={unbRegistration || ''}
                                            onChange={setUnbRegistration}
                                        />
                                        {alertContentUnbRegistration ? (
                                            <div className="alertContent">
                                                <p>
                                                    Insira uma matrícula válida.
                                                </p>
                                            </div>
                                        ) : (
                                                <div className="alertContent">
                                                    <p></p>
                                                </div>
                                            )}
                                    </div>

                                    <div className="fieldDiv">
                                        <label className="upLabel">
                                            Vínculo
                                        </label>
                                        <select
                                            className="selectsLargest"
                                            name="bond"
                                            value={bond || ''}
                                            onChange={(e) => setBond(e.target.value)
                                            }
                                        >
                                            <option value="" disabled>
                                                Selecione
                                            </option>
                                            <option value="docente">
                                                Docente
                                            </option>
                                            <option value="estudante de graduacao">
                                                Estudante de Graduação
                                            </option>
                                            <option value="estudante de mestrado">
                                                Estudante de Mestrado
                                            </option>
                                            <option value="estudante de doutorado">
                                                Estudante de Doutorado
                                            </option>
                                            <option value="tecnico-administrativo">
                                                Técnico-Administrativo
                                            </option>
                                            <option value="sem vinculo">
                                                Não tenho Vínculo com a UnB
                                            </option>
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

                                    <div className="fieldDiv">
                                        <label className="upLabel">
                                            Telefone Pessoal
                                        </label>
                                        <Input
                                            placeholder="Preencha aqui"
                                            value={phone || ''}
                                            onChange={setPhone}
                                        />
                                        {alertContentPhone ? (
                                            <div className="alertContent">
                                                <p>
                                                    Insira um telefone válido.
                                                </p>
                                            </div>
                                        ) : (
                                                <div className="alertContent">
                                                    <p></p>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="page page2" id="page2">
                            <div className="form">
                                <div className="formLeft">
                                    <div className="fieldDiv">
                                        <label className="upLabel">
                                            Tem filhos?
                                        </label>
                                        <select
                                            className="selectsLargest"
                                            name="children"
                                            value={children || ''}
                                            onChange={(e) => setChildren(e.target.value)
                                            }
                                        >
                                            <option value="" disabled>
                                                Selecione uma opção
                                            </option>
                                            <option value="sim">
                                                Possuo filha(o)/filhas(os)
                                            </option>
                                            <option value="nao">
                                                Não possuo filha(o)/filhas(os)
                                            </option>
                                        </select>

                                        {alertContentSexualOrientation ? (
                                            <div className="alertContent">
                                                <p>
                                                    Selecione uma orientação
                                                    sexual.
                                                </p>
                                            </div>
                                        ) : (
                                                <div className="alertContent">
                                                    <p></p>
                                                </div>
                                            )}
                                    </div>

                                    <div className="fieldDiv">
                                        <label className="upLabel">
                                            Estado Civil
                                        </label>
                                        <select
                                            className="selectsLargest"
                                            value={
                                                civilStatus || 'naoInformado'
                                            }
                                            name="civilStatus"
                                            onChange={(e) => setCivilStatus(e.target.value)
                                            }
                                        >
                                            <option
                                                value="naoInformado"
                                                disabled
                                            >
                                                Selecione uma opção
                                            </option>
                                            <option value="Solteiro(a)">
                                                Solteiro
                                            </option>
                                            <option value="Divorciado(a)">
                                                Divorciado
                                            </option>
                                            <option value="Casado(a)">
                                                Casado
                                            </option>
                                            <option value="Viuvo(a)">
                                                Viuvo
                                            </option>
                                            <option value="Uniao Estavel">
                                                União Estável
                                            </option>
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
                                    {/* novos campos */}
                                    <div className="fieldDiv">
                                        <label className="upLabel">
                                            Etnia/Raça
                                        </label>
                                        <select
                                            className="selectsLargest"
                                            name="race"
                                            value={race || ''}
                                            onChange={(e) => setRace(e.target.value)
                                            }
                                        >
                                            <option value="" disabled>
                                                Selecione uma opção
                                            </option>
                                            <option value="preta(o)">
                                                Preta(o)
                                            </option>
                                            <option value="parda(o)">
                                                Parda(o)
                                            </option>
                                            <option value="indigena">
                                                Índigena
                                            </option>
                                            <option value="branca(o)">
                                                Branca(o)
                                            </option>
                                            <option value="amarela(o)">
                                                Amarela(o)
                                            </option>
                                            <option value="prefiroNaoDizer">
                                                Prefiro não dizer
                                            </option>
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
                                    <div className="fieldDiv">
                                        <label className="upLabel">
                                            Programas assistenciais <br /> da
                                            UnB?
                                        </label>
                                        <select
                                            className="selectsLargest"
                                            name="socialPrograms"
                                            value={socialPrograms || ''}
                                            onChange={(e) => setSocialPrograms(
                                                e.target.value,
                                            )
                                            }
                                        >
                                            <option value="" disabled>
                                                Selecione uma opção
                                            </option>
                                            <option value="sim">Sim</option>
                                            <option value="nao">Não</option>
                                        </select>
                                        <div className="alertContent">
                                            <p></p>
                                        </div>
                                    </div>
                                    <div className="fieldDiv">
                                        <label className="upLabel">
                                            Você faz uso de alguma medicação
                                            <br /> para tratamento psiquiátrico?
                                        </label>
                                        <Input
                                            placeholder="Preencha aqui"
                                            value={medication || ''}
                                            onChange={setMedication}
                                        />
                                        <div className="alertContent">
                                            <p></p>
                                        </div>
                                    </div>
                                </div>

                                <div className="formRight">
                                    <div className="fieldDiv">
                                        <label className="upLabel">
                                            Gênero
                                        </label>
                                        <select
                                            className="selectsLargest"
                                            name="gender"
                                            value={gender || ''}
                                            onChange={(e) => setGender(e.target.value)
                                            }
                                        >
                                            <option value="" disabled>
                                                Selecione uma opção
                                            </option>
                                            <option value="mulher">
                                                Mulher
                                            </option>
                                            <option value="homem">Homem</option>
                                            <option value="mulher trans">
                                                Mulher Trans
                                            </option>
                                            <option value="homen trans">
                                                Homen Trans
                                            </option>
                                            <option value="nao binario">
                                                Não-Binário
                                            </option>
                                            <option value="prefiro nao dizer">
                                                Prefiro não dizer
                                            </option>
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
                                    </div>
                                    {/* campo novo de orientação sexual */}
                                    <div className="fieldDiv">
                                        <label className="upLabel">
                                            Orientação Sexual
                                        </label>
                                        <select
                                            className="selectsLargest"
                                            name="sexualOrientation"
                                            value={sexualOrientation || ''}
                                            onChange={(e) => setSexualOrientation(
                                                e.target.value,
                                            )
                                            }
                                        >
                                            <option value="" disabled>
                                                Selecione uma opção
                                            </option>
                                            <option value="homossexual">
                                                Homossexual
                                            </option>
                                            <option value="bissexual">
                                                Bissexual
                                            </option>
                                            <option value="heterossexual">
                                                Heterossexual
                                            </option>
                                            <option value="prefiroNaoDizer">
                                                Prefiro não dizer
                                            </option>
                                        </select>

                                        {alertContentSexualOrientation ? (
                                            <div className="alertContent">
                                                <p>
                                                    Selecione uma orientação
                                                    sexual.
                                                </p>
                                            </div>
                                        ) : (
                                                <div className="alertContent">
                                                    <p></p>
                                                </div>
                                            )}
                                    </div>
                                    <div className="fieldDiv">
                                        <label className="upLabel">
                                            Mora da casa do
                                            <br />
                                            Estudante Universitário?
                                        </label>
                                        <select
                                            className="selectsLargest"
                                            name="studentHouseResidence"
                                            value={studentHouseResidence || ''}
                                            onChange={(e) => setStudentHouseResidence(
                                                e.target.value,
                                            )
                                            }
                                        >
                                            <option value="" disabled>
                                                Selecione uma opção
                                            </option>
                                            <option value="sim">Sim</option>
                                            <option value="nao">Não</option>
                                        </select>
                                        <div className="alertContent">
                                            <p></p>
                                        </div>
                                    </div>

                                    <div className="fieldDiv">
                                        <label className="upLabel">
                                            Já fez acompanhamento
                                            <br />
                                            psiquiátrico?
                                        </label>
                                        <select
                                            className="selectsLargest"
                                            name="psychiatricFollowUp"
                                            value={psychiatricFollowUp || ''}
                                            onChange={(e) => setPsychiatricFollowUp(
                                                e.target.value,
                                            )
                                            }
                                        >
                                            <option value="" disabled>
                                                Selecione uma opção
                                            </option>
                                            <option value="past">
                                                No passado
                                            </option>
                                            <option value="actually">
                                                Atualmente
                                            </option>
                                            <option value="never">
                                                Nunca fiz
                                            </option>
                                        </select>

                                        {alertPsychiatricFollowUp ? (
                                            <div className="alertContent">
                                                <p>Campo obrigatório.</p>
                                            </div>
                                        ) : (
                                                <div className="alertContent">
                                                    <p></p>
                                                </div>
                                            )}
                                    </div>

                                    <div className="fieldDiv">
                                        <label className="upLabel">
                                            Principal queixa
                                        </label>
                                        <select
                                            className="selectsLargest"
                                            name="mainComplaint"
                                            value={mainComplaint || ''}
                                            onChange={(e) => setMainComplaint(e.target.value)
                                            }
                                        >
                                            <option value="" disabled>
                                                Principal queixa
                                            </option>
                                            <option value="Ansiedade">
                                                Ansiedade
                                            </option>
                                            <option value="Assédio, discriminação ou outro tipo de violência">
                                                Assédio, discriminação ou outro
                                                tipo de violência
                                            </option>
                                            <option value="Conflito no trabalho">
                                                Conflito no trabalho
                                            </option>
                                            <option value="Depressão">
                                                Depressão
                                            </option>
                                            <option value="Dificuldades academicas">
                                                Dificuldades acadêmicas
                                            </option>
                                            <option value="Luto">Luto</option>
                                            <option value="Pensamentos suicidas">
                                                Pensamentos suicidas
                                            </option>
                                            <option value="Problemas afetivos">
                                                Problemas afetivos
                                            </option>
                                            <option value="Problemas de saude">
                                                Problemas de saúde
                                            </option>
                                            <option value="Problemas familiares">
                                                Problemas familiares
                                            </option>
                                            <option value="Solicitação para psiquiatria">
                                                Solicitação para psiquiatria
                                            </option>
                                            <option value="Tentativa de suicidio">
                                                Tentativa de suicídio
                                            </option>
                                            <option value="Uso de drogas">
                                                Uso de drogas
                                            </option>
                                            <option value="Outros">
                                                Outros
                                            </option>
                                        </select>

                                        {alertContentMainComplaint ? (
                                            <div className="alertContent">
                                                <p>
                                                    Selecione uma queixa
                                                    principal.
                                                </p>
                                            </div>
                                        ) : (
                                                <div className="alertContent">
                                                    <p></p>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="page page3" id="page3">
                            <div className="form">
                                <div className="formLeft">
                                    <div className="fieldDiv">
                                        <label>Contato de emergência</label>
                                        <hr />
                                        <label className="upLabel">Nome</label>
                                        <Input
                                            placeholder="Preencha aqui"
                                            value={emergencyContactName || ''}
                                            onChange={setEmergencyContactName}
                                        />

                                        {alertContentEmergencyContactName ? (
                                            <div className="alertContent">
                                                <p>
                                                    Nome deve possuir mais de 2
                                                    letras.
                                                </p>
                                            </div>
                                        ) : (
                                                <div className="alertContent">
                                                    <p></p>
                                                </div>
                                            )}
                                        <hr />
                                        <label className="upLabel">
                                            Telefone
                                        </label>
                                        <Input
                                            placeholder="Preencha aqui"
                                            value={emergencyContactPhone || ''}
                                            onChange={setEmergencyContactPhone}
                                        />

                                        {alertContentEmergencyContactPhone ? (
                                            <div className="alertContent">
                                                <p>Insira um número válido.</p>
                                            </div>
                                        ) : (
                                                <div className="alertContent">
                                                    <p></p>
                                                </div>
                                            )}
                                        <hr />
                                        <label className="upLabel">
                                            Vínculo
                                        </label>
                                        <Input
                                            placeholder="Preencha aqui"
                                            value={emergencyContactBond || ''}
                                            onChange={setEmergencyContactBond}
                                        />

                                        {alertContentEmergencyContactBond ? (
                                            <div className="alertContent">
                                                <p>
                                                    Deve possuir mais de 2
                                                    letras.
                                                </p>
                                            </div>
                                        ) : (
                                                <div className="alertContent">
                                                    <p></p>
                                                </div>
                                            )}
                                    </div>
                                </div>

                                <div className="formRight">
                                    <div className="fieldDiv">
                                        <label className="upLabel">
                                            Nome da mãe
                                        </label>
                                        <Input
                                            placeholder="Preencha aqui"
                                            value={motherName || ''}
                                            onChange={setMotherName}
                                        />

                                        {alertContentMotherName ? (
                                            <div className="alertContent">
                                                <p>
                                                    Nome deve possuir mais de 2
                                                    letras.
                                                </p>
                                            </div>
                                        ) : (
                                                <div className="alertContent">
                                                    <p></p>
                                                </div>
                                            )}
                                    </div>
                                    <div className="fieldDiv">
                                        <label className="upLabel">
                                            Nome do pai
                                        </label>
                                        <Input
                                            placeholder="Preencha aqui"
                                            value={fatherName || ''}
                                            onChange={setFatherName}
                                        />

                                        {alertContentFatherName ? (
                                            <div className="alertContent">
                                                <p>Insira um número válido.</p>
                                            </div>
                                        ) : (
                                                <div className="alertContent">
                                                    <p></p>
                                                </div>
                                            )}
                                    </div>

                                    <div className="fieldDiv">
                                        <label className="upLabel">
                                            Telefene da(o) mãe/pai
                                        </label>
                                        <Input
                                            placeholder="Preencha aqui"
                                            value={affiliationPhone}
                                            onChange={setAffiliationPhone}
                                        />
                                        <div className="alertContent">
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            className="button-page"
                            onClick={() => handlePages('next')}
                        >
                            <img
                                src={arrow}
                                className="arrowButton"
                                alt="Next"
                            ></img>
                        </button>

                        <div className="buttons">
                            <button
                                className="button-change"
                                onClick={() => setShowModal(true)}
                            >
                                Alterar senha
                            </button>
                            <Modal
                                show={showModal}
                                onHide={() => setShowModal(false)}
                                backdrop="static"
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title className="modalTitle" id="contained-modal-title-vcenter">
                                        Alterar Senha
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="modalFormDiv">
                                        <label className="modalLabel">Senha Atual</label>
                                        <Input
                                            className="modalInput"
                                            placeholder=""
                                            type={showPassword ? 'text' : 'password'}
                                            value={actualPassword}
                                            onChange={setActualPassword}
                                        />
                                    </div>
                                    <div className="modalFormDiv">
                                        <label className="modalLabel">Nova senha</label>
                                        <Input
                                            className="modalInput"
                                            placeholder=""
                                            type={showPassword ? 'text' : 'password'}
                                            value={newPassword}
                                            onChange={setNewPassword}
                                        />
                                    </div>
                                    <div className="modalFormDiv">
                                        <label className="modalLabel">Confirmar nova senha</label>
                                        <Input
                                            className="modalInput"
                                            placeholder=""
                                            type={showPassword ? 'text' : 'password'}
                                            value={confirmNewPassword}
                                            onChange={setConfirmNewPassword}
                                        />
                                    </div>
                                    <div className="modalFormDiv">
                                        {alertConfirmPassword ? (
                                            <div className="alertContent">
                                                <p>{alertPasswordText}</p>
                                            </div>
                                        ) : (
                                                <div className="alertContent">
                                                    <p></p>
                                                </div>
                                            )}
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={toggleShow}>{showPassword ? 'Esconder campos' : 'Mostrar campos'}</Button>
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
                                    <Button className="buttonConfirm" onClick={updatePassword}>Confirmar</Button>
                                </Modal.Footer>
                            </Modal>

                            <button className="button-salvar" type="submit">
                                Salvar
                            </button>
                        </div>
                    </form >
                </div >
            </div >
            <Footer />

        </div >
    );
}
UserProfile.propTypes = {
    location: PropTypes.object,
};
