import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import api from '../../services/api';
import Input from '../../components/Input';

import './styles.css';

import userIcon from '../../assets/images/userIcon.svg';

export default function PsyCreate() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [biography] = useState('');
    const [gender, setGender] = useState('');
    const [bond] = useState('Psychologist');

    const [show, setShow] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [variant, setVariant] = useState('');

    const history = useHistory();

    async function handlePsychologistSignUp(event) {
        try {
            event.preventDefault();

            const user = {
                name,
                lastName,
                email,
                specialization,
                biography,
                gender,
                bond,
            };

            if (!name || !lastName || !email || !gender || !specialization) {
                setShow(true);
                setVariant('danger');
                setAlertText('Os campos não foram preenchidos corretamente');
                setInterval(() => {
                    setShow(false);
                }, 3500);
                return history.push('/admin/psy/create');
            }

            const response = await api.post('/admin/psy/create', user);

            if (response.status === 200) {
                setShow(true);
                setVariant('danger');
                setAlertText('Email já cadastrado');
                setInterval(() => {
                    setShow(false);
                }, 3500);
                return history.push('/admin/psy/create');
            }

            if (response.status === 201) {
                return history.push('/admin/psy/list');
            }
        } catch (err) {
            setShow(true);
            setVariant('danger');
            setAlertText('Erro no cadastro, tente novamente');
        }
        setInterval(() => {
            setShow(false);
        }, 3500);
    }

    return (
        <div className="psychologist-container">
            {show ? (
                <Alert className="alert" variant={variant}>{alertText}</Alert>
            ) : (
                    <div></div>
                )}
            <div className="psychologist-create">

                <form className="form" onSubmit={handlePsychologistSignUp}>
                    <img src={userIcon} alt="userIcon" />
                    <div className="psyCreate">
                        <Input
                            placeholder="Nome"
                            value={name}
                            onChange={setName}
                        />

                        <Input
                            placeholder="Sobrenome"
                            value={lastName}
                            onChange={setLastName}
                        />

                        <select name="gender" onChange={(e) => setGender(e.target.value)}>
                            <option value=""> Gênero </option>
                            <option value="F">Feminino</option>
                            <option value="M">Masculino</option>
                            <option value="I">Não Identificar</option>
                        </select>

                        <Input
                            placeholder="Email"
                            value={email}
                            onChange={setEmail}
                        />

                        <Input
                            placeholder="Especialidade"
                            value={specialization}
                            onChange={setSpecialization}
                        />

                        <button className="button" type="submit">Registrar</button>
                    </div>
                </form>
            </div>
        </div>

    );
}
