import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../services/api';
import userIcon from '../assets/images/userIcon.svg';
import arrow from '../assets/images/up.svg';
import logoQuadrado from '../assets/images/esaude_logo.svg';
import '../assets/styles/NavBar.css';

export default function NavBar({ actualUser, bond }) {
    const [userImage, setUserImage] = useState('');
<<<<<<< HEAD
    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
=======
    const [dropDown, setDropDown] = useState(false);

>>>>>>> fix: navBar design
    useEffect(() => {
        (async function renderImage() {
            try {
                if (bond === 'Psychologist') {
<<<<<<< HEAD
                    const response = await api.get(`/psychologist/${user}`, {
                        headers: { authorization: accessToken },
                    });
=======
                    const response = await api.get(
                        `/psychologist/${actualUser.email}`,
                    );
>>>>>>> fix: navBar design

                    setUserImage(
                        atob(
                            Buffer.from(
                                response.data.userImage,
                                'binary',
                            ).toString('base64'),
                        ),
                    );
                } else {
                    const response = await api.get(`/user/${user}`, {
                        headers: { authorization: accessToken },
                    });

                    setUserImage(
                        atob(
                            Buffer.from(
                                response.data.userImage,
                                'binary',
                            ).toString('base64'),
                        ),
                    );
                }
            } catch (err) {
                // Erro ao renderizar imagem
            }
        })();
    }, [actualUser, bond]);

    function showDropDown() {
        setDropDown(!dropDown ? true : false);
    }

    return (
        <nav className="navBarComponent">
            <div className="logo">
                <img
                    className="logoQuadrado"
                    src={logoQuadrado}
                    alt="icone de usuario"
                />
            </div>
            {bond === 'Psychologist' ? (
                <div className="navLinks">
                    {/* <Link className="a" to="" >Próximos Eventos</Link> */}
                    <Link
                        className="a"
                        to={{
                            pathname: '/patient/list',
                            state: {
                                data: actualUser,
                            },
                        }}
                    >
                        Lista de Pacientes
                    </Link>
                    <Link
                        className="a"
                        to={{
                            pathname: '/psychologist/events',
                            state: {
                                data: actualUser,
                            },
                        }}
                    >
                        Agendamentos
                    </Link>
                    <Link
                        className="a"
                        to={{
                            pathname: '/psychologist/profile',
                            state: {
                                data: actualUser,
                            },
                        }}
                    >
                        Perfil
                    </Link>

                    <img
                        className="userIcon"
                        src={userImage || userIcon}
                        alt="icone de usuario"
                    />
                </div>
            ) : (
                <div className="navLinks">
                    {/* <Link className="a" to="" >Próximos Eventos</Link> */}
                    <Link
                        className="a"
                        to={{
                            pathname: '/psychologist/list',
                            state: {
                                data: actualUser,
                            },
                        }}
                    >
                        Lista de Psicologos
                    </Link>
                    <Link
                        className="a"
                        to={{
                            pathname: '/profile',
                            state: {
                                data: actualUser,
                            },
                        }}
                    >
                        Perfil
                    </Link>
                    <Link
                        className="a"
                        to={{
                            pathname: '/main',
                            state: {
                                data: actualUser,
                            },
                        }}
                    >
                        Agendamentos
                    </Link>
                    <Link
                        className="a"
                        to={{
                            pathname: '/events',
                            state: {
                                data: actualUser,
                            },
                        }}
                    >
                        Consultas Marcadas
                    </Link>
                   
                    <div className="dropdown">
                        <div className="images">
                            <img
                                className="userIcon"
                                src={userImage || userIcon}
                                alt="icone de usuario"
                            />
                            <img
                                className="arrow"
                                src={arrow}
                                alt="menu"
                                onClick={() => showDropDown()}
                            />
                        </div>
                        {dropDown ? (
                            <ul className="dropdown-items">
                                <li>
                                    <a href="">Perfil</a>
                                </li>
                                <li>
                                    <a href="">Sair</a>
                                </li>
                            </ul>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

NavBar.propTypes = {
    bond: PropTypes.string,
    actualUser: PropTypes.object,
};
