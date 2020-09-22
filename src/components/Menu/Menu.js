import React from 'react';
import './styles.css';
import Union from '../../assets/images/Union.svg';

function Menu() {
    return (
        <div>
            <nav id="menu">
                <ul>
                    <a id="name" href="/">eSaudeUnB</a>
                    <li><a id="icone"><img src={Union} /></a></li>
                    <li><a href="#">Perfil</a></li>
                    <li><a href="#">Lista de Psicologos</a></li>
                    <li><a href="#">Proximos Eventos</a></li>
                    <li><a href="#">Agendar Atendimento</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default Menu;
