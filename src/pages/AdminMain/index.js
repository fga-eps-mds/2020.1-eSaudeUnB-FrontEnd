import React, { Component, useState } from 'react';
import { useHistory } from 'react-router-dom'
import api from '../../services/api';

import './styles.css';

export default class AdminMain extends Component{

    state = {
        psychologists: []
    }

    componentDidMount(){
        this.loadPsychologists();
    }

    loadPsychologists = async() => {
        const response = await api.get('/admin/psy');
        this.setState({psychologists: response.data});
    }

    deletePsychologist = async(id) =>{
        if(window.confirm('Deseja deletar esse psicólogo?')){
        await api.delete(`/admin/psy/${id}`);
        const response = await api.get('/admin/psy');
        this.setState({psychologists: response.data});
        }
        else{
            const response = await api.get('/admin/psy');
            this.setState({psychologists: response.data});
        }
    }

    render(){
        return(
            <div className="psychologist-list">
                {this.state.psychologists.map(psychologist => (
                    <article key={psychologist.id}>
                    <strong>{psychologist.name} {psychologist.lastName}</strong>
                    <p>{psychologist.email}</p>
                    <p>{psychologist.specialization}</p>
                    <p>{psychologist.bibliography}</p>
                    <button onClick={() => this.deletePsychologist(psychologist.id)}>Excluir Psicólogo</button>
                    </article>

                ))}
            </div>
        )
    }
}