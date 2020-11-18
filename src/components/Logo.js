import React from 'react';

import logo from '../assets/images/logo.svg';

export default function Logo() {
    return (
        <section className="section logoImg">
            <img src={logo} alt="logo-eSaude" />

            <p className="logoImg">e-Saúde UnB</p>
            <p className="logoImg">Mesmo à distância nós cuidamos de você</p>
        </section>
    );
}
