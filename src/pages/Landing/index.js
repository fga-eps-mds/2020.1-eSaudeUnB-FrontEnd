import React from 'react';
import { Link } from 'react-router-dom';

import LandingNavBar from '../../components/LandingNavBar';

import landingImg from '../../assets/images/logo.svg';

import './styles.css';

export default function Landing() {
    return (
        <div className="page-landing">
            <LandingNavBar className="nav-bar" />
            <div className="content">
                <div className="main">
                    <img className="landing-img" src={landingImg} />
                    <div className="above-img">
                        <div class="logo-container">
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
                    <section className="wave-animation">
                        <div className="wave wave1"></div>
                        <div className="wave wave2" ></div>
                        <div className="wave wave3" ></div>
                    </section>
                </div>
                <div className="about"></div>
                <div className="how-it-work"></div>
                <div className="faq"></div>
                <div className="who-behind"></div>
                <footer></footer>
            </div>
        </div>
    );
}
