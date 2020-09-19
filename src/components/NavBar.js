import React from 'react';
import { Link } from 'react-router-dom';

import userIcon from '../assets/images/userIcon.svg';
import '../assets/styles/NavBar.css';

export default function NavBar() {
    return (
        <nav className="navBarComponent">
            <p>e-Saude</p>

            <div className="navLinks">
                <Link className="a" to="" >Próximos Eventos</Link>
                <Link className="a" to="" >Lista de Pacientes</Link>
                <Link className="a" to="" >Perfil</Link>
            </div>

            <img className="userIcon" src={userIcon} alt="icone de usuario" />
        </nav>
    );
}
