import React from 'react';
import { Link } from 'react-router-dom';

import landingImg from '../../assets/images/logo.svg';

import './styles.css';

export default function Landing() {
    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <img src={landingImg} alt="e-Saúde" className="hero-image" />

                <div className="logo-container">
                    <h1>e-Saúde</h1>
                    <h2>Mesmo à distância nós cuidamos de você</h2>
                </div>

                <div className="buttons-container">
                    <Link to="/registration" className="registration">
                        Registrar
                    </Link>

                    <Link to="/login" className="login">
                        Entrar
                    </Link>
                </div>
            </div>
        </div>
    );
}
