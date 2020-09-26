import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import Input from '../../components/Input';

import './styles.css';

import userIcon from '../../assets/images/userIcon.svg';
import Union from '../../assets/images/Union.svg';

export default function PsyCreate() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [bibliography] = useState('');
    const [gender, setGender] = useState('');
    const [bond] = useState('Psychologist');

    const history = useHistory();

    async function handlePsychologistSignUp(event) {
        try {
            event.preventDefault();

            const user = {
                name,
                lastName,
                email,
                specialization,
                bibliography,
                gender,
                bond,
            };

            if (!name || !lastName || !email || !gender || !specialization) {
                alert('Os campos não foram preenchidos corretamente');
                history.push('/admin/psy/create');
                return;
            }

            const response = await api.post('/admin/psy/create', user);

            if (response.status === 201) {
                alert('Cadastro realizado com sucesso');
                history.push('/admin/psy/list');
            }
        } catch (err) {
            alert('Erro no cadastro, tente novamente');
        }
    }

    return (
        <div className="psychologist-container">
        <div className="psychologist-create">

              <form className="form" onSubmit={handlePsychologistSignUp}>
                  <img src={userIcon} alt="userIcon" />
                  <div className="Psycreate">
                        <Input
                            placeholder="Nome"
                            value={name}
                            onChange={setName}
                            icon={Union}
                    />

                      <Input
                            placeholder="Sobrenome"
                            value={lastName}
                            onChange={setLastName}
                            icon={Union}
                        />

                      <div className="selects">

                          <select name="gender" onChange={(e) => setGender(e.target.value)}>
                              <option disabled selected value> Genero </option>
                              <option value="F">Feminino</option>
                              <option value="M">Masculino</option>
                              <option value="I">Não Identificar</option>
                            </select>

                        </div>

                        <Input
                            placeholder="Email"
                            value={email}
                            onChange={setEmail}
                            icon={Union}
                    />

                        <Input
                            placeholder="Especialidade"
                            value={specialization}
                            onChange={setSpecialization}
                            icon={Union}
                    />

                        <button className="button" type="submit">Registrar</button>
                    </div>
                </form>
            </div>
      </div>

    );
}
