import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import userIcon from '../assets/images/userIcon.svg';
import arrow from '../assets/images/arrow.svg';
import '../assets/styles/SideBar.css';

export default function SideBar({ actualUser, bond }) {
    const [userImage, setUserImage] = useState('');

    useEffect(() => {
        (async function renderImage() {
            try {
                if (bond === 'Psychologist') {
                    const response = await api.get(
                        `/psychologist/${actualUser.email}`,
                    );

                    setUserImage(
                        atob(
                            Buffer.from(
                                response.data.userImage,
                                'binary',
                            ).toString('base64'),
                        ),
                    );
                } else {
                    const response = await api.get(`/user/${actualUser.email}`);

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
    }, [actualUser, bond]);

    function openNav() {
        document.getElementById('mySidebar').style.width = '300px';
        document.getElementById('sideBarInterior').style.display = 'block';
        document.getElementById('main').style.marginLeft = '300px';
        document.getElementById('openbtn').style.display = 'none';
    }
    function closeNav() {
        document.getElementById('mySidebar').style.width = '50px';
        document.getElementById('sideBarInterior').style.display = 'none';
        document.getElementById('main').style.marginLeft = '50px';
        document.getElementById('openbtn').style.display = 'block';
    }

    return (
        <div className="SideBar">
            <div id="mySidebar" className="sidebar">
                <div id="sideBarInterior">
                    <arrow
                        /* eslint-disable-next-line */
                        href="javascript:void(0)"
                        className="closebtn"
                        onClick={() => closeNav()}
                    >
                        <img className="arrow" src={arrow} alt="menu" />
                    </arrow>
                    <img
                        className="userIcon"
                        src={userImage || userIcon}
                        alt="menu"
                    />
                    <p>{actualUser.name}</p>
                    <a href="/">Proximos Eventos</a>
                    <a href="/">Lista de Profissionais</a>
                    <a href="/">Meu Perfil</a>
                    <a href="/">eSaude</a>
                </div>
            </div>

            <div id="main">
                <arrow
                    id="openbtn"
                    className="openbtn"
                    onClick={() => openNav()}
                >
                    <img className="arrowOpen" src={arrow} alt="menu" />
                </arrow>
            </div>
        </div>
    );
}

SideBar.propTypes = {
    bond: PropTypes.string,
    actualUser: PropTypes.object,
};
