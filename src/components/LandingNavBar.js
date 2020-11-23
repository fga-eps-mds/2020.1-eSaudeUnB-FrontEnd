import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../assets/styles/LandingNavBar.css';

import logo from '../assets/images/esaude_logo.svg';

export default function LandingNavBar() {
    return (

        <Navbar className="landingNavBarComponent" bg="light" expand="lg">
            <Navbar.Brand href="#home">{<img src={logo} alt="Logo e-saudeunb" />}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto links">
                    <Nav.Link href="#about">Como Funciona</Nav.Link>
                    <Nav.Link href="#faq">FAQ</Nav.Link>
                    <Nav.Link href="#who-behind">Quem está por trás</Nav.Link>
                    <Nav.Link className="registration-link" href="/registration">Registrar</Nav.Link>
                    <Nav.Link className="login-link" href="/login">Entrar</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
