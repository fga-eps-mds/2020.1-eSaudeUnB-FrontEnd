import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../services/api';
import userIcon from '../assets/images/userIcon.svg';
import arrow from '../assets/images/up.svg';
import logoQuadrado from '../assets/images/esaude_logo.svg';
import '../assets/styles/NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default function NavBar({ actualUser, bond }) {
    const [userImage, setUserImage] = useState('');
    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');

    useEffect(() => {
        (async function renderImage() {
            try {
                if (bond === 'Psychologist') {
                    const response = await api.get(`/psychologist/${user}`, {
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

    return (
        // <nav className="navBarComponent">
        //     <div className="logo">
        //         <img
        //             className="logoQuadrado"
        //             src={logoQuadrado}
        //             alt="icone de usuario"
        //         />
        //     </div>
        //     {bond === 'Psychologist' ? (
        //         <div className="navLinks">
        //             <Link
        //                 className="a"
        //                 to={{
        //                     pathname: '/patient/list',
        //                     state: {
        //                         data: actualUser,
        //                     },
        //                 }}
        //             >
        //                 Lista de Pacientes
        //             </Link>
        //             <Link
        //                 className="a"
        //                 to={{
        //                     pathname: '/psychologist/events',
        //                     state: {
        //                         data: actualUser,
        //                     },
        //                 }}
        //             >
        //                 Agendamentos
        //             </Link>

        //         </div>
        //     ) : (
        //         <div className="navLinks">

        //             <Link
        //                 className="a"
        //                 to={{
        //                     pathname: '/psychologist/list',
        //                     state: {
        //                         data: actualUser,
        //                     },
        //                 }}
        //             >
        //                 Lista de Psicologos
        //             </Link>
        //             <Link
        //                 className="a"
        //                 to={{
        //                     pathname: '/main',
        //                     state: {
        //                         data: actualUser,
        //                     },
        //                 }}
        //             >
        //                 Agendamentos
        //             </Link>
        //             <Link
        //                 className="a"
        //                 to={{
        //                     pathname: '/events',
        //                     state: {
        //                         data: actualUser,
        //                     },
        //                 }}
        //             >
        //                 Consultas Marcadas
        //             </Link>

        //         </div>
        //     )}
        // </nav>
        <Navbar className="navBarComponent" bg="light" expand="lg">
            <Navbar.Brand href="#home">
                <img className="logoQuadrado" src={logoQuadrado}></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
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
                                    pathname: '/psychologist/events',
                                    state: {
                                        data: actualUser,
                                    },
                                }}
                            >
                                Agendamentos
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
                        </div>
                    )}
                    <img
                        className="userIcon"
                        src={userImage || userIcon}
                        alt="icone de usuario"
                    />
                    <NavDropdown title="" id="basic-nav-dropdown" drop="left">
                        <NavDropdown.Item href="#action/3.1">
                            {
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
                            }
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/">Sair</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

NavBar.propTypes = {
    bond: PropTypes.string,
    actualUser: PropTypes.object,
};
