import React from 'react';
import { Link } from 'react-router-dom';

import LandingNavBar from '../../components/LandingNavBar';

import landingImg from '../../assets/images/logo.svg';
import down from '../../assets/images/down.svg';

import './styles.css';
import '../../assets/styles/HiwCard.css';
import '../../assets/styles/FaqCard.css';

export default function Landing() {
    return (
        <div className="page-landing">
            <LandingNavBar />
            <div className="content">
                <div className="main" id="main">
                    <img
                        className="landing-img"
                        src={landingImg}
                        alt="Imagem representando o e-saudeUnb"
                    />
                    <div className="above-img">
                        <div className="logo-container">
                            <h1>e-Saúde</h1>
                            <h2>Mesmo à distância nós cuidamos de você</h2>
                        </div>

                        <div className="buttons-container">
                            <a className="know-more-btn" href="#about">Saiba mais<img src={down} /></a>

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
                        <div className="wave wave2"></div>
                        <div className="wave wave3"></div>
                    </section>
                </div>
                <div id="about" className="about">
                    <h1>Sobre</h1>
                    <h2>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Suspendisse faucibus interdum posuere
                        lorem ipsum. Bibendum arcu vitae elementum curabitur
                        vitae. Etiam tempor orci eu lobortis. Tempus quam
                        pellentesque nec nam aliquam sem et tortor consequat.
                        Sit amet commodo nulla facilisi nullam vehicula.
                        Adipiscing elit pellentesque habitant morbi tristique
                        senectus. Malesuada nunc vel risus commodo viverra
                        maecenas. Sed velit dignissim sodales ut eu. Amet luctus
                        venenatis lectus magna fringilla urna. In hac habitasse
                        platea dictumst vestibulum rhoncus. Massa tempor nec
                        feugiat nisl. Eu non diam phasellus vestibulum lorem.
                        Egestas tellus rutrum tellus pellentesque eu tincidunt
                        tortor aliquam nulla. Sit amet purus gravida quis
                        blandit. Aliquam ut porttitor leo a diam sollicitudin
                        tempor. Massa placerat duis ultricies lacus sed turpis
                        tincidunt.
                    </h2>
                </div>
                <div id="how-it-work" className="how-it-work">
                    <h1>Como funciona</h1>
                    <div className="hiw-cards">
                        <div className="hiw-card">
                            <h2>Preciso de ajuda</h2>
                            <span>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Cras fermentum sem sed libero
                                faucibus porttitor. Aenean facilisis, magna non
                                porta tincidunt, diam dui venenatis purus, nec
                                egestas mi est aliquet nisl. Nam et augue a nibh
                                convallis blandit. Nunc lacinia pretium
                                consectetur.
                            </span>
                        </div>
                        <div className="hiw-card">
                            <h2>Quero Atender</h2>
                            <span>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Cras fermentum sem sed libero
                                faucibus porttitor. Aenean facilisis, magna non
                                porta tincidunt, diam dui venenatis purus, nec
                                egestas mi est aliquet nisl. Nam et augue a nibh
                                convallis blandit. Nunc lacinia pretium
                                consectetur.
                            </span>
                        </div>
                        <div className="hiw-card">
                            <h2>Conexão Feita</h2>
                            <span>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Cras fermentum sem sed libero
                                faucibus porttitor. Aenean facilisis, magna non
                                porta tincidunt, diam dui venenatis purus, nec
                                egestas mi est aliquet nisl. Nam et augue a nibh
                                convallis blandit. Nunc lacinia pretium
                                consectetur.
                            </span>
                        </div>
                    </div>
                </div>
                <div id="faq" className="faq">
                    <h1>FAQ</h1>
                    <div className="faq-questions">
                        <div className="faq-card">
                            <h2>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </h2>
                            <span>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                                Risus ultricies tristique nulla aliquet. In ante
                                metus dictum at tempor commodo ullamcorper a.
                                Elementum eu facilisis sed odio morbi quis
                                commodo. Blandit massa enim nec dui nunc mattis
                                enim.
                            </span>
                        </div>
                        <div className="faq-card">
                            <h2>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </h2>
                            <span>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                                Risus ultricies tristique nulla aliquet. In ante
                                metus dictum at tempor commodo ullamcorper a.
                                Elementum eu facilisis sed odio morbi quis
                                commodo. Blandit massa enim nec dui nunc mattis
                                enim.
                            </span>
                        </div>
                        <div className="faq-card">
                            <h2>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </h2>
                            <span>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                                Risus ultricies tristique nulla aliquet. In ante
                                metus dictum at tempor commodo ullamcorper a.
                                Elementum eu facilisis sed odio morbi quis
                                commodo. Blandit massa enim nec dui nunc mattis
                                enim.
                            </span>
                        </div>
                        <div className="faq-card">
                            <h2>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </h2>
                            <span>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                                Risus ultricies tristique nulla aliquet. In ante
                                metus dictum at tempor commodo ullamcorper a.
                                Elementum eu facilisis sed odio morbi quis
                                commodo. Blandit massa enim nec dui nunc mattis
                                enim.
                            </span>
                        </div>
                        <div className="faq-card">
                            <h2>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </h2>
                            <span>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                                Risus ultricies tristique nulla aliquet. In ante
                                metus dictum at tempor commodo ullamcorper a.
                                Elementum eu facilisis sed odio morbi quis
                                commodo. Blandit massa enim nec dui nunc mattis
                                enim.
                            </span>
                        </div>
                        <div className="faq-card">
                            <h2>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </h2>
                            <span>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                                Risus ultricies tristique nulla aliquet. In ante
                                metus dictum at tempor commodo ullamcorper a.
                                Elementum eu facilisis sed odio morbi quis
                                commodo. Blandit massa enim nec dui nunc mattis
                                enim.
                            </span>
                        </div>
                    </div>
                </div>
                <div id="who-behind" className="who-behind">
                    <h1>Quem está por trás desta rede</h1>
                    <h2>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Enim lobortis scelerisque fermentum dui
                        faucibus in ornare quam. Eros donec ac odio tempor.
                        Semper viverra nam libero justo laoreet sit amet cursus.
                        Facilisi etiam dignissim diam quis enim lobortis
                        scelerisque fermentum dui. Tincidunt praesent semper
                        feugiat nibh. Eu facilisis sed odio morbi quis commodo
                        odio aenean sed. Mattis enim ut tellus elementum
                        sagittis vitae. Massa massa ultricies mi quis hendrerit
                        dolor magna. Commodo elit at imperdiet dui. Faucibus
                        purus in massa tempor. Lobortis feugiat vivamus at
                        augue. Nulla posuere sollicitudin aliquam ultrices.
                        Vestibulum sed arcu non odio euismod. Facilisi etiam
                        dignissim diam quis enim lobortis scelerisque fermentum.
                    </h2>
                </div>
                <footer></footer>
            </div>
        </div>
    );
}
