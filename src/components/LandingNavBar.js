import React from 'react';

import '../assets/styles/LandingNavBar.css';

import logo from '../assets/images/esaude_logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export default function LandingNavBar() {
    return (
        // <nav className="landingNavBarComponent">
        //     <a href="#main">
        //         <img src={logo} alt="Logo e-saudeunb" />
        //     </a>
        //     <div className="links">
        //         <a href="#about">Sobre</a>
        //         <a href="#how-it-work">Como Funciona</a>
        //         <a href="#faq">FAQ</a>
        //         <a href="#who-behind">Quem está por trás</a>
        //         <a className="registration-link" href="/registration">
        //             Registrar
        //         </a>
        //         <a className="login-link" href="/login">
        //             Entrar
        //         </a>
        //     </div>
        // </nav>
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
                    {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown> */}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
