import React from 'react';

import logo from '../assets/images/logo.svg';

export default function Logo() {
    return (
        <section className="section">
            <img src={logo} alt="logo-eSaude" />

            <p>E-Saude UnB</p>
            <p>Mesmo à distância nós cuidamos de você</p>
        </section>
    );
}
