import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosHelpCircle } from 'react-icons/io';
import { IoChatbubblesSharp } from 'react-icons/io5';
import { FaUsers } from 'react-icons/fa';

import LandingNavBar from '../../components/LandingNavBar';

import landingImg from '../../assets/images/logo.svg';
import down from '../../assets/images/down.svg';
import logo from '../../assets/images/esaude_logo.svg';
import calendarImg from '../../assets/images/undraw_calendar.svg';

import './styles.css';
import '../../assets/styles/HiwCard.css';
import '../../assets/styles/FaqCard.css';

export default function Landing() {
    return (
        <div className="page-landing">
            <LandingNavBar />
            <div className="content">
                <div className="main" id="home">
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
                            <div className="btts">
                                <Link to="/registration" className="registration">
                                    Registrar
                                </Link>

                                <Link to="/login" className="login">
                                    Entrar
                                </Link>

                            </div>
                            <a className="know-more-btn" href="#about">
                                Saiba mais
                                <img src={down} alt="seta para baixo" />
                            </a>
                        </div>
                    </div>
                    <section className="wave-animation">
                        <div className="wave wave1"></div>
                        <div className="wave wave2"></div>
                        <div className="wave wave3"></div>
                    </section>
                </div>
                <div id="about" className="about">
                    <span className="title">Sobre</span>
                    <div className="content-about">
                        <img className="calendar-img" src={calendarImg} alt="calendar"/>
                        <div className="summary">
                            <span>
                                O eSaúdeUnB é uma plataforma online criada com o intuito de:
                            </span>
                            <ul className="content">
                                <li>
                                    facilitar o atendimento médico para pacientes
                                </li>
                                <li>
                                    auxiliar profissionais da saúde na gestão dos
                                    prontuários médicos desses pacientes
                                </li>
                                <li>
                                    além de permitir aos gestores o acesso aos dados dos
                                    atendimentos realizados pelos profissionais de forma
                                    a otimizar tempo e recursos e auxiliá-los na tomada
                                    de decisões.
                                </li>
                                <li>
                                    atualizar o atendimento na área de saúde mental decorrentes do
                                    isolamento social, a fim de lidar com a fase de recuperação
                                    da pandemia do Covid-19
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="how-it-work" className="how-it-work">
                    <h1>Como funciona</h1>
                    <div className="hiw-cards">
                        <div className="hiw-card">
                            <span className="title-hiw">
                                <IoIosHelpCircle color="#003A70" size="2em"/>
                                <h2>Preciso de ajuda</h2>
                            </span>
                            <span className="hiw-content">
                                Você só precisa se registrar em
                                nossa plataforma, e atualizar seus
                                dados de perfil.Após isso já terá
                                acesso a uma lista de profissionais
                                com seus horários disponíveis para
                                solicitação de atendimentos.
                            </span>
                        </div>
                        <div className="hiw-card">
                            <span className="title-hiw">
                                <IoChatbubblesSharp color="#003A70" size="2em"/>
                                <h2>Quero Atender</h2>
                            </span>
                            <span className="hiw-content">
                                Atualmente para um profissional se
                                registrar na plataforma, ele deve
                                entrar em contato com um
                                administrador que irá cadastrá-lo.
                            </span>
                        </div>
                        <div className="hiw-card">
                            <span className="title-hiw">
                                <FaUsers color="#003A70" size="2em"/>
                                <h2>Realizar conexão</h2>
                            </span>
                            <span className="hiw-content">
                                Para um paciente, após já estar
                                com o cadastro completo. Basta entrar
                                na &rdquo;lista de profissionais&rdquo; e escolher o profissional
                                e horário da sua preferência.
                                Já para um profissional basta estar com o cadastro completo
                                e o perfil atualizado para esperar que alguém solicite uma
                                consulta.
                            </span>
                        </div>
                    </div>
                </div>
                <div id="faq" className="faq">
                    <h1>FAQ</h1>
                    <div className="faq-questions">
                        <div className="faq-card">
                            <h2>
                                Como faço para me registrar na plataforma?
                            </h2>
                            <span>
                                Já na página inicial é possível encontrar um botão
                                de &rdquo;registrar&rdquo; na parte superior esquerda da tela.
                                Ao clicar o úsuario será redirencionado para a tela
                                de cadastro, onde deverá informar os dados solicitados
                            </span>
                        </div>
                        <div className="faq-card">
                            <h2>
                                Como marco uma consulta?
                            </h2>
                            <span>
                                Após já estar cadastrado e já ter atualizado as
                                informações de perfil. Basta realizar o login
                                e clicar em &rdquo;lista de profissionais&rdquo;,
                                escolher o profissional
                                e o horário de sua preferência.
                            </span>
                        </div>
                        <div className="faq-card">
                            <h2>
                                É cobrado algum valor por consulta?
                            </h2>
                            <span>
                                Não, todas as consultas solicitadas pela partaforma são gratuitas.
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
                        <li>
                            Carla Silva Rocha Aguiar - Engenharia de Software - campus Gama Unb FGA
                        </li>
                        <li>
                            Pricila Almeida Andrade - Curso de graduação em Saúde Coletiva/UnB -
                            campus Ceilândia e membro do COES de Saúde Mental da Dasu/DAC
                        </li>
                        <li>
                            Laércia Abreu Vasconcelos -
                            Departamento de Processos Psicológicos
                            Básicos/Instituto de Psicologia/ UnB -
                            campus Darcy e membro do COES de Saúde Mental da Dasu/DAC
                        </li>
                        <li>
                            Ana Valéria Machado Mendonça -
                            Departamento de Saúde Coletiva/ Faculdade de Ciências da Saúde -
                            Campus Darcy e membro do Coes-UnB
                        </li>
                        <li>
                            Cristineide Leandro França -
                            psicóloga, coordenadora da Coordenação de Prevenção (Cooprev/Dasu/DAC) e
                            membro do COES de Saúde Mental da Dasu/DAC
                        </li>
                        <li>
                            alunos de graduação e pós graduação
                        </li>
                    </h2>
                </div>
                <footer>
                    <a href="#main">
                        <img src={logo} alt="Logo e-saude unb" />
                    </a>
                    <div className="foot-links"></div>
                </footer>
            </div>
        </div>
    );
}
