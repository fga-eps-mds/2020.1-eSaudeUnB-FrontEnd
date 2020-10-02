import React from 'react';
import notfound from '../../assets/images/404.svg';
import './styles.css';

export default function NotFound() {
    return (
        <div className="Container">
            <div className="div">
                <p>Oops! Página não encontrada</p>
                <img id="notfound" src={notfound} />
            </div>
        </div>
    );
}
