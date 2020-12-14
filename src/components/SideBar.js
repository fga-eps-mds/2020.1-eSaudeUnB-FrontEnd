import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../services/api';
import userIcon from '../assets/images/userIcon.svg';
import arrow from '../assets/images/arrow.svg';
import '../assets/styles/SideBar.css';

export default function SideBar({ actualUser, bond }) {
    const [userImage, setUserImage] = useState('');
    const accessToken = localStorage.getItem('accessToken');
    const email = localStorage.getItem('user');
    const [user, setUser] = useState('');

    useEffect(() => {
        (async function renderImage() {
            try {
                if (bond === 'Professional') {
                    const responsePsy = await api.get(`/psychologist/${email}`, {
                        headers: { authorization: accessToken },
                    });
                    setUser(responsePsy.data);
                } else {
                    const responseUser = await api.get(`/user/${email}`, {
                        headers: { authorization: accessToken },
                    });
                    setUser(responseUser.data);
                }
                setUserImage(
                    atob(
                        Buffer.from(
                            user.userImage,
                            'binary',
                        ).toString('base64'),
                    ),
                );
            } catch (err) {
                // Erro ao renderizar imagem
            }
        }());
    }, [accessToken, bond, user, email, setUser]);

    function openNav() {
        document.getElementById('mySidebar').style.width = '300px';
        document.getElementById('sideBarInterior').style.display = 'block';
        document.getElementById('main').style.marginLeft = '300px';
        document.getElementById('openbtn').style.display = 'none';
    }
    function closeNav() {
        document.getElementById('mySidebar').style.width = '50px';
        document.getElementById('sideBarInterior').style.display = 'none';
        document.getElementById('main').style.marginLeft = '50px';
        document.getElementById('openbtn').style.display = 'block';
    }

    return (
        <div className="SideBar">
            <div id="mySidebar" className="sidebar">
                <div id="sideBarInterior">
                    <div
                        /* eslint-disable-next-line */
                        href="javascript:void(0)"
                        className="closebtn"
                        onClick={() => closeNav()}
                    >
                        <img className="arrow" src={arrow} alt="menu" />
                    </div>
                    <img
                        className="userIcon"
                        src={userImage || userIcon}
                        alt="menu"
                    />
                    <p>{user.name}</p>
                    {(user.bond === 'Psicologo' || user.bond === 'Nutricionista' || user.bond === 'Assistente Social') ? (
                        <div className="navLinks">
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
                                    pathname: '/psychologist/schedule',
                                    state: {
                                        data: actualUser,
                                    },
                                }}
                            >
                                Configurar meu cronograma
                            </Link>
                        </div>
                    ) : (
                        <div className="navLinks">
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
                                    pathname: '/events',
                                    state: {
                                        data: actualUser,
                                    },
                                }}
                            >
                                    Consultas Marcadas
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <div id="main">
                <div id="openbtn" className="openbtn" onClick={() => openNav()}>
                    <img className="arrowOpen" src={arrow} alt="menu" />
                </div>
            </div>
        </div>
    );
}

SideBar.propTypes = {
    bond: PropTypes.string,
    actualUser: PropTypes.object,
};
