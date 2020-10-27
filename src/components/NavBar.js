import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../services/api';
import userIcon from '../assets/images/userIcon.svg';
import logoQuadrado from '../assets/images/esaude_logo.svg';
import '../assets/styles/NavBar.css';

export default function NavBar({ actualUser, bond }) {
    const [userImage, setUserImage] = useState('');

    useEffect(() => {
        (async function renderImage() {
            if (bond === 'Psychologist') {
                const response = await api.get(`/psychologist/${actualUser.email}`);
                if (response.data.userImage != null) {
                    setUserImage(atob(Buffer.from(response.data.userImage, 'binary').toString('base64')));
                }
            } else {
                const response = await api.get(`/user/${actualUser.email}`);
                if (response.data.userImage != null) {
                    setUserImage(atob(Buffer.from(response.data.userImage, 'binary').toString('base64')));
                }
            }
        }());
    }, [actualUser, bond]);

    return (
        <nav className="navBarComponent">
            <div className="logo">
                <img className="logoQuadrado" src={logoQuadrado} alt="icone de usuario" />
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
                            pathname: '/psychologist/profile',
                            state: {
                                data: actualUser,
                            },
                        }}
                    >
                        Perfil
                    </Link>

                    <img className="userIcon" src={userImage || userIcon} alt="icone de usuario" />
                </div>)
                : (<div className="navLinks">
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
                    <img className="userIcon" src={userImage || userIcon} alt="icone de usuario" />
                </div>
                )}
        </nav >
    );
}

NavBar.propTypes = {
    bond: PropTypes.string,
    actualUser: PropTypes.object,
};
