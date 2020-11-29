import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../services/api';
import userIcon from '../assets/images/userIcon.svg';
import logoSquare from '../assets/images/esaude_logo.svg';
import '../assets/styles/NavBar.css';

import { IoMdExit } from "react-icons/io";
import { BsFillPersonLinesFill } from "react-icons/bs";

export default function NavBar({ bond }) {
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
        }());
    }, [accessToken, bond, user]);

    return (
        <Navbar className="navBarComponent" bg="light" expand="lg">
            <Navbar.Brand href="#home">
                <img className="logoSquare" src={logoSquare} alt="Square Logo"></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {bond === 'Psychologist' ? (
                        <div className="navLinks">
                            <Link
                                className="a"
                                to={{
                                    pathname: '/psychologist/schedule',
                                }}
                            >
                                Configurar meu Cronograma
                            </Link>
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
                            <Link
                                className="a"
                                to={{
                                    pathname: '/psychologist/schedule',
                                }}
                            >
                                Ajustar cronograma
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
                    {bond === 'Psychologist' ? (
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
                        {bond === 'Psychologist' ? (
                            <NavDropdown.Item
                                className="profileDropDown"
                                to={{
                                    pathname: '/psychologist/profile',
                                }}
                            >
                                <BsFillPersonLinesFill />
                                <span className="dropDownItemText">Perfil</span>
                            </NavDropdown.Item>
                        ) : (
                            <NavDropdown.Item
                                className="profileDropDown"
                                to={{
                                    pathname: '/profile',
                                }}
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
