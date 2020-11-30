import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './styles.css';

import Input from '../../components/Input';

import api from '../../services/api';

export default function ChangePassword(props) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [show, setShow] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [variant, setVariant] = useState('');

    const accessToken = localStorage.getItem('accessToken');
    const UserEmail = localStorage.getItem('user');

    const history = useHistory();

    async function handleNewPassword(event) {
        event.preventDefault();
        console.log(props);
        if (password !== confirmPassword) {
            setShow(true);
            setVariant("danger");
            setAlertText("As senhas não são iguais");
        } else {
            setShow(false);
            if (props.location.state.type === 'user') {
                try {
                    const responseUser = await api.put(`/user/password/${UserEmail}`, {
                        oldPassword: props.location.state.oldPassword,
                        password,
                    },
                        { headers: { authorization: accessToken } });

                    if (responseUser.status === 203) {
                        setShow(true);
                        setVariant("danger");
                        setAlertText("A nova senha deve ter no mínimo 8 caracteres");
                    }

                    if (responseUser.status === 200) {
                        setShow(false);
                        history.push({
                            pathname: '/psychologist/profile',
                            state: {
                                data: responseUser.data.user,
                            },
                        });
                    }
                } catch (err) {
                    if (err.response.status === 400) {
                        setShow(true);
                        setVariant("danger");
                        setAlertText("Erro");
                        return;
                    }
                    setShow(true);
                    setVariant("danger");
                    setAlertText("Ocorreu algum erro ao atualizar a senha, tente novamente.");
                }
            }
            if (props.location.state.type === 'professional') {
                try {
                    const responsePsy = await api.put(`/psyUpdatePassword/${UserEmail}`, {
                        oldPassword: props.location.state.oldPassword,
                        password,
                    },
                        { headers: { authorization: accessToken } });

                    if (responsePsy.status === 203) {
                        setShow(true);
                        setVariant("danger");
                        setAlertText("A nova senha deve ter no mínimo 8 caracteres");
                    }

                    if (responsePsy.status === 200) {
                        setShow(false);
                        history.push({
                            pathname: '/psychologist/profile',
                            state: {
                                data: responsePsy.data.user,
                            },
                        });
                    }
                } catch (err) {
                    if (err.response.status === 400) {
                        setShow(true);
                        setVariant("danger");
                        setAlertText("Erro");
                        return;
                    }
                    setShow(true);
                    setVariant("danger");
                    setAlertText("Ocorreu algum erro ao atualizar a senha, tente novamente.");
                }
            }
        }
    }

    return (
        <div className="ChangePasswordContainer">
            {show ? (
                <Alert className="alert" variant={variant}>
                    {alertText}
                </Alert>
            ) : (
                    <div></div>
                )}
            <div className="content">
                <form className="form" onSubmit={handleNewPassword}>
                    <h2 className="pageTitle">Mudança de Senha</h2>
                    <Input
                        placeholder="Nova senha"
                        value={password}
                        onChange={setPassword}
                        type="password"
                    />
                    <Input
                        placeholder="Confirme a nova senha"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        type="password"
                    />

                    <button className="button" type="submit">
                        Confirmar
                    </button>
                </form>
            </div>
        </div>
    );
}

ChangePassword.propTypes = {
    location: PropTypes.object,
};
