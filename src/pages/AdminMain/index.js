import React, { Component, useState } from 'react';
import { useHistory } from 'react-router-dom'
import api from '../../services/api';

import './styles.css';

export default class AdminMain extends Component{

    routeChange=()=> {
        let path = '/admin/psy/create';
        this.props.history.push(path);
      }

    state = {
        psychologists: []
    }

    componentDidMount(){
        this.loadPsychologists();
    }


    loadPsychologists = async() => {
        const response = await api.get('/admin/psy/list');
        this.setState({psychologists: response.data});
    }

    deletePsychologist = async(id) =>{
        if(window.confirm('Deseja excluir esse psicólogo?')){
        await api.delete(`/admin/psy/${id}`);
        const response = await api.get('/admin/psy/list');
        this.setState({psychologists: response.data});
        }
        else{
            const response = await api.get('/admin/psy/list');
            this.setState({psychologists: response.data});
        }
    }

    render(){
        return(
            <div className="list-container">
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
                <button className="new-psychologist" onClick={this.routeChange}>
                    Cadastrar novo Psicólogo
                    </button>
            </div>
            </div>
        )
    }
}