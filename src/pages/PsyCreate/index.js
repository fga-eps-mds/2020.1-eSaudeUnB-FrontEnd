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
    const [phone] = useState('');
    const [gender, setGender] = useState('');
    const [bond] = useState('Psychologist');

    const [show, setShow] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [variant, setVariant] = useState('');

    const history = useHistory();

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
                phone,
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

            if (response.status === 203) {
                const field = response.data.error.details[0].path[0];
                handleWrongField(field);
                setInterval(() => {
                    setShow(false);
                }, 3500);
                return history.push('/admin/psy/create');
            }

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
