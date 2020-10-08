import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import userIcon from '../assets/images/userIcon.svg';
import logoQuadrado from '../assets/images/esaude_logo.svg';
import '../assets/styles/NavBar.css';

export default function NavBar(props) {
    const { bond } = props;

    const { actualUser } = props;
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
                            pathname: '/patient-list',
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
                            pathname: '/psy-profile',
                            state: {
                                data: actualUser,
                            },
                        }}
                    >
                        Perfil
                    </Link>
                    <img className="userIcon" src={userIcon} alt="icone de usuario" />
                </div>)
                : (<div className="navLinks">
                    {/* <Link className="a" to="" >Próximos Eventos</Link> */}
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
                    <img className="userIcon" src={userIcon} alt="icone de usuario" />
                </div>
                )}
        </nav >
    );
}

NavBar.propTypes = {
    bond: PropTypes.string,
    actualUser: PropTypes.object,
};
