import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { IoMdExit } from 'react-icons/io';
import api from '../services/api';
import userIcon from '../assets/images/userIcon.svg';
import logoSquare from '../assets/images/esaude_logo.svg';
import '../assets/styles/NavBar.css';

export default function NavBar({ bond }) {
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

    return (
        <Navbar className="navBarComponent" bg="light" expand="lg">
            <Navbar.Brand href="#home">
                <Link
                    className="a"
                    to={{
                        pathname: (user.bond === 'Psicologo' || user.bond === 'Nutricionista' || user.bond === 'Assistente Social') ? '/psychologist/profile' : '/profile',
                    }}
                >
                    <img className="logoSquare" src={logoSquare} alt="Square Logo"></img>
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {(user.bond === 'Psicologo' || user.bond === 'Nutricionista' || user.bond === 'Assistente Social') ? (
                        <div className="navLinks">
                            <Link
                                className="a"
                                to={{
                                    pathname: '/patient/list',
                                }}
                            >
                                Lista de Pacientes
                            </Link>
                            <Link
                                className="a"
                                to={{
                                    pathname: '/psychologist/events',
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
                                    }}
                                >
                                    Lista de Psicologos
                            </Link>
                                <Link
                                    className="a"
                                    to={{
                                        pathname: '/main',
                                    }}
                                >
                                    Agendamentos
                            </Link>
                                <Link
                                    className="a"
                                    to={{
                                        pathname: '/events',
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
                    {(user.bond === 'Psicologo' || user.bond === 'Nutricionista' || user.bond === 'Assistente Social') ? (
                        <Link
                            className="dropNone"
                            to={{
                                pathname: '/psychologist/profile',
                            }}
                        >
                            Perfil
                        </Link>
                    ) : (
                            <Link
                                className="dropNone"
                                to={{
                                    pathname: '/profile',
                                }}
                            >
                                Perfil
                            </Link>
                        )}
                    <Link
                        className="dropNone"
                        to={{
                            pathname: '/',
                        }}
                    >
                        Sair
                    </Link>
                    <NavDropdown title="" id="basic-nav-dropdown" drop="left">
                        {(user.bond === 'Psicologo' || user.bond === 'Nutricionista' || user.bond === 'Assistente Social') ? (
                            <NavDropdown.Item
                                className="profileDropDown"
                                href="/psychologist/profile"
                            >
                                <BsFillPersonLinesFill />
                                <span className="dropDownItemText">Perfil</span>
                            </NavDropdown.Item>
                        ) : (
                                <NavDropdown.Item
                                    className="profileDropDown"
                                    href="/profile"
                                >
                                    <BsFillPersonLinesFill />
                                    <span className="dropDownItemText">Perfil</span>
                                </NavDropdown.Item>
                            )}
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => localStorage.clear()} href="/">
                            <IoMdExit />
                            <span className="dropDownItemText">Sair</span>
                        </NavDropdown.Item>
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
