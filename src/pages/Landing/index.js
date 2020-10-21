import React from 'react';
import { Link } from 'react-router-dom';

import LandingNavBar from '../../components/LandingNavBar';
import AboutCard from '../../components/AboutCard';

import landingImg from '../../assets/images/logo.svg';

import './styles.css';

export default function Landing() {
    return (
        <div className="page-landing">
            <LandingNavBar />
            <div className="content">
                <div className="main" id="main">
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
                <div id="about" className="about">
                    <h1>Sobre</h1>
                    <div className="about-cards">
                        <AboutCard
                            title="Preciso de ajuda"
                            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras fermentum sem sed libero faucibus porttitor. Aenean facilisis, magna non porta tincidunt, diam dui venenatis purus, nec egestas mi est aliquet nisl. Nam et augue a nibh convallis blandit. Nunc lacinia pretium consectetur."
                        />
                        <AboutCard
                            title="Quero Atender"
                            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras fermentum sem sed libero faucibus porttitor. Aenean facilisis, magna non porta tincidunt, diam dui venenatis purus, nec egestas mi est aliquet nisl. Nam et augue a nibh convallis blandit. Nunc lacinia pretium consectetur."
                        />
                        <AboutCard
                            title="Coneção Feita"
                            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras fermentum sem sed libero faucibus porttitor. Aenean facilisis, magna non porta tincidunt, diam dui venenatis purus, nec egestas mi est aliquet nisl. Nam et augue a nibh convallis blandit. Nunc lacinia pretium consectetur."
                        />
                    </div>
                </div>
                <div id="how-it-work" className="how-it-work">Como funciona</div>
                <div id="faq" className="faq">FAQ</div>
                <div id="who-behind" className="who-behind">Quem está por trás do projeto</div>
                <footer></footer>
            </div>
        </div>
    );
}
