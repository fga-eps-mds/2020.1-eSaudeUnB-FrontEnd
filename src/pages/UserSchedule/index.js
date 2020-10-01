import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import api from '../../services/api';
import './styles.css';

import go from '../../assets/images/go.svg';
import MagnifyingGlass from '../../assets/images/lupa.svg';
import userIcon from '../../assets/images/userIcon.svg';

import NavBar from '../../components/NavBar';
import SearchBar from '../../components/SearchBar';

export default function MakeAppointment() {
    const [search, setSearch] = useState('');
    return (
        <div className="MakeAppointmentContainer">
            <div className="content">
                <NavBar className="navBar" />
                <SearchBar
                    className="searchBar"
                    value={search}
                    onChange={setSearch}
                    icon={MagnifyingGlass}
                />
            </div>
        </div>
    );
}
