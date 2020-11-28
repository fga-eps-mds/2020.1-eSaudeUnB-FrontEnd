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

    const history = useHistory();

    async function handleNewPassword(event) {
        
    }

    return (
        <div className="ChangePasswordContainer">
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
