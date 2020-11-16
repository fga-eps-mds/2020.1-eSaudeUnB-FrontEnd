import React from 'react';

import '../assets/styles/LandingNavBar.css';

import logo from '../assets/images/esaude_logo.svg';

export default function LandingNavBar() {
    return (
        <nav className="landingNavBarComponent">
            <a href="#main">
                <img src={logo} alt="Logo e-saudeunb" />
            </a>
            <div className="links">
                <a href="#about">Sobre</a>
                <a href="#how-it-work">Como Funciona</a>
                <a href="#faq">FAQ</a>
                <a href="#who-behind">Quem está por trás</a>
                <a className="registration-link" href="/registration">
                    Registrar
                </a>
                <a className="login-link" href="/login">
                    Entrar
                </a>
            </div>
        </nav>
    );
}
