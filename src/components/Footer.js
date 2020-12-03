import React from 'react';

import logo from '../assets/images/esaude_logo.svg';

import '../assets/styles/Footer.css';

export default function Footer() {
    return (
        <footer className="footerComponent">
            <a href="/">
                <img src={logo} alt="Logo e-saude unb" />
            </a>
            <div className="foot-links"></div>
        </footer>

    );
}
