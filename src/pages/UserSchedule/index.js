import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import api from '../../services/api';
import './styles.css';

import go from '../../assets/images/go.svg';
import MagnifyingGlass from '../../assets/images/lupa.svg';
import userIcon from '../../assets/images/userIcon.svg';

import NavBar from '../../components/NavBar';

export default function UserSchedule() {
    const [search, setSearch] = useState('');
    return (
        <div className="userScheduleContainer">
            <div className="content">
                <NavBar/>
            </div>
        </div>
    );
}
