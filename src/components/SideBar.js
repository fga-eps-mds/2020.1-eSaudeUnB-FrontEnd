import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../services/api';
import userIcon from '../assets/images/userIcon.svg';
import arrow from '../assets/images/arrow.svg';
import '../assets/styles/SideBar.css';

export default function SideBar({ actualUser, bond }) {
    const [userImage, setUserImage] = useState('');
    const [userName, setUserName] = useState('');
    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');

    useEffect(() => {
        (async function renderImage() {
            try {
                if (bond === 'Psychologist') {
                    const response = await api.get(`/psychologist/${user}`, {
                        headers: { authorization: accessToken },
                    });
                    setUserName(response.data.name);
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
                    setUserName(response.data.name);
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
        }());
    }, [actualUser, bond]);

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
                    <p>{userName}</p>
                    {bond === 'Psychologist' ? (
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
                                Horários
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
