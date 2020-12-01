import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
    Alert, Modal, Button,
} from 'react-bootstrap';

import api from '../../services/api';
import './styles.css';

import Logo from '../../components/Logo';
import Input from '../../components/Input';

export default function LandingLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [show, setShow] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [variant, setVariant] = useState('');

    const [alertEmail, setAlertEmail] = useState(false);
    const [alertEmailText, setAlertEmailtext] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState('');

    const history = useHistory();

    async function resetPassword() {
        try {
            const responseUser = await api.put(`/userForgetPassword/${registeredEmail}`);
            if (responseUser.status === 200) {
                setShowModal(false);
                setShow(true);
                setVariant('success');
                setAlertText(
                    'Verifique o seu e-mail para recebimento da nova senha de acesso.',
                );
                setTimeout(() => {
                    setShow(false);
                }, 2000);
            }
        } catch (err) {
            if (err.response.status === 500) {
                try {
                    const responsePsy = await api.put(`/psyForgetPassword/${registeredEmail}`);

                    if (responsePsy.status === 200) {
                        setShowModal(false);
                        setShow(true);
                        setVariant('success');
                        setAlertText(
                            'Verifique o seu e-mail para recebimento da nova senha de acesso.',
                        );
                        setTimeout(() => {
                            setShow(false);
                        }, 2000);
                    }
                } catch (err2) {
                    if (err2.response.status === 500) {
                        setAlertEmailtext('Email não encontrado');
                        setAlertEmail(true);
                    }
                }
            }
        }
    }

    async function handleLogin(event) {
        try {
            event.preventDefault();

            const responseUser = await api.post('/login/patient', {
                email,
                password,
            });

            if (responseUser.status === 200 || responseUser.status === 201) {
                localStorage.setItem('accessToken', responseUser.data.accessToken);
                localStorage.setItem('user', email);
                if (responseUser.data.user.ForgetPassWord === 1) {
                    history.push({
                        pathname: '/change-password',
                        state: {
                            data: responseUser.data.user,
                        },
                    });
                }
                history.push({
                    pathname: '/profile',
                    state: {
                        data: responseUser.data.user,
                    },
                });
                return;
            }
        } catch (err) {
            try {
                const responsePsy = await api.post('/login/psychologist', {
                    email,
                    password,
                });

                if (responsePsy.status === 200 || responsePsy.status === 201) {
                    localStorage.setItem('accessToken', responsePsy.data.accessToken);
                    localStorage.setItem('user', email);
                    if (responsePsy.data.user.ForgetPassWord === 1) {
                        history.push({
                            pathname: '/change-password',
                            state: {
                                data: responsePsy.data.user,
                            },
                        });
                    }
                    history.push({
                        pathname: '/psychologist/profile',
                        state: {
                            data: responsePsy.data.user,
                        },
                    });
                }

                if (
                    err.response.status === 404
                    || err.response.status === 400
                ) {
                    setShow(true);
                    setVariant('danger');
                    setAlertText('Email/Senha incorretos, digite novamente.');
                }

                if (err.response.status === 500) {
                    setShow(true);
                    setVariant('danger');
                    setAlertText(
                        'Ocorreu algum erro no seu login, tente novamente.',
                    );
                }
            } catch (err2) {
                if (
                    err2.response.status === 404
                    || err2.response.status === 400
                ) {
                    setShow(true);
                    setVariant('danger');
                    setAlertText('Email/Senha incorretos, digite novamente.');
                }

                if (err2.response.status === 500) {
                    setShow(true);
                    setVariant('danger');
                    setAlertText(
                        'Ocorreu algum erro no seu login, tente novamente.',
                    );
                }
            }
        }
        setTimeout(() => {
            setShow(false);
        }, 2000);
    }

    return (
        <div className="loginContainer">
            {show ? (
                <Alert className="alert" variant={variant}>
                    {alertText}
                </Alert>
            ) : (
                <div></div>
            )}
            <div className="content">
                <Logo />

                <form className="form" onSubmit={handleLogin}>
                    <span>Login de Usuário</span>

                    <Input
                        placeholder="Email"
                        value={email}
                        onChange={setEmail}
                    />

                    <Input
                        placeholder="Senha"
                        value={password}
                        onChange={setPassword}
                        type="password"
                    />

                    <button className="button" type="submit">
                        Entrar
                    </button>
                    <div className="forgot">
                        <Link className="a" onClick={() => setShowModal(true)}>
                            Esqueci a minha senha
                        </Link>

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
                                    Recuperar senha
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Indique o e-mail usado para cadastrar a sua conta</p>
                                <Input
                                    placeholder="Email registrado"
                                    value={registeredEmail}
                                    onChange={setRegisteredEmail}
                                />
                                {alertEmail ? (
                                    <div className="alertContent">
                                        <p>
                                            {alertEmailText}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="alertContent">
                                        <p></p>
                                    </div>
                                )}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="success" onClick={resetPassword}>Confirmar</Button>
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        setAlertEmail(false);
                                        setShowModal(false);
                                        setRegisteredEmail('');
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <Link className="a" to="/registration">
                            Ainda não possuo uma conta
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
