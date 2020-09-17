import React from 'react';
import './styles.css'
import Union from '../../assets/images/Union.svg';
function Menu() {
    return (
        <div>
            <nav id="menu">
                <ul>                   
                    <li><img className="logo"src={Union}></img></li>
                    <li><a href="#">Perfil</a></li>
                    <li><a href="#">Lista de Psicologos</a></li>
                    <li><a href="#">Proximos Eventos</a></li>
                    <li><a href="#">Agendar Atendimento</a></li>  
                    <li className="name"><a href="#">eSaudeUnB</a></li> 
                </ul>
            </nav>
        </div>
    );
}

export default Menu;