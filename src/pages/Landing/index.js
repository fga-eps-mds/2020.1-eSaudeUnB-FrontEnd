import React from 'react';
import { Link } from 'react-router-dom';

import LandingNavBar from '../../components/LandingNavBar';

import landingImg from '../../assets/images/logo.svg';

import './styles.css';
import '../../assets/styles/AboutCard.css';
import '../../assets/styles/FaqCard.css';

export default function Landing() {
    return (
        <div className="page-landing">
            <LandingNavBar />
            <div className="content">
                <div className="main" id="main">
                    <img className="landing-img" src={landingImg} alt="Imagem representando o e-saudeUnb" />
                    <div className="above-img">
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
                    <section className="wave-animation">
                        <div className="wave wave1"></div>
                        <div className="wave wave2" ></div>
                        <div className="wave wave3" ></div>
                    </section>
                </div>
                <div id="about" className="about">
                    <h1>Sobre</h1>
                    <div className="about-cards">
                        <div className="about-card">
                            <h2>Preciso de ajuda</h2>
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras fermentum sem sed libero faucibus porttitor. Aenean facilisis, magna non porta tincidunt, diam dui venenatis purus, nec egestas mi est aliquet nisl. Nam et augue a nibh convallis blandit. Nunc lacinia pretium consectetur.</span>
                        </div>
                        <div className="about-card">
                            <h2>Quero Atender</h2>
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras fermentum sem sed libero faucibus porttitor. Aenean facilisis, magna non porta tincidunt, diam dui venenatis purus, nec egestas mi est aliquet nisl. Nam et augue a nibh convallis blandit. Nunc lacinia pretium consectetur.</span>
                        </div>
                        <div className="about-card">
                            <h2>Conexão Feita</h2>
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras fermentum sem sed libero faucibus porttitor. Aenean facilisis, magna non porta tincidunt, diam dui venenatis purus, nec egestas mi est aliquet nisl. Nam et augue a nibh convallis blandit. Nunc lacinia pretium consectetur.</span>
                        </div>
                    </div>
                </div>
                <div id="how-it-work" className="how-it-work">Como funciona</div>
                <div id="faq" className="faq">
                    <h1>FAQ</h1>
                    <div className="faq-questions">
                        <div className="faq-card">
                            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h2>
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus ultricies tristique nulla aliquet. In ante metus dictum at tempor commodo ullamcorper a. Elementum eu facilisis sed odio morbi quis commodo. Blandit massa enim nec dui nunc mattis enim.</span>
                        </div>
                        <div className="faq-card">
                            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h2>
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus ultricies tristique nulla aliquet. In ante metus dictum at tempor commodo ullamcorper a. Elementum eu facilisis sed odio morbi quis commodo. Blandit massa enim nec dui nunc mattis enim.</span>
                        </div>
                        <div className="faq-card">
                            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h2>
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus ultricies tristique nulla aliquet. In ante metus dictum at tempor commodo ullamcorper a. Elementum eu facilisis sed odio morbi quis commodo. Blandit massa enim nec dui nunc mattis enim.</span>
                        </div>
                        <div className="faq-card">
                            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h2>
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus ultricies tristique nulla aliquet. In ante metus dictum at tempor commodo ullamcorper a. Elementum eu facilisis sed odio morbi quis commodo. Blandit massa enim nec dui nunc mattis enim.</span>
                        </div>
                        <div className="faq-card">
                            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h2>
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus ultricies tristique nulla aliquet. In ante metus dictum at tempor commodo ullamcorper a. Elementum eu facilisis sed odio morbi quis commodo. Blandit massa enim nec dui nunc mattis enim.</span>
                        </div>
                        <div className="faq-card">
                            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h2>
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus ultricies tristique nulla aliquet. In ante metus dictum at tempor commodo ullamcorper a. Elementum eu facilisis sed odio morbi quis commodo. Blandit massa enim nec dui nunc mattis enim.</span>
                        </div>
                    </div>
                </div>
                <div id="who-behind" className="who-behind">Quem está por trás do projeto</div>
                <footer></footer>
            </div>
        </div>
    );
}
