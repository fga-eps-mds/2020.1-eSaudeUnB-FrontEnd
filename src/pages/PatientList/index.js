import React, { useState } from 'react';

import './styles.css';

import Lupa from '../../assets/images/lupa.svg';

import NavBar from '../../components/NavBar';
import SearchBar from '../../components/SearchBar';

export default function PatientList() {
    const [search, setSearch] = useState("");

    return (
        <div className="patientListContainer">
            <div className="content">
                <NavBar />

                <SearchBar
                    value={search}
                    onChange={setSearch}
                    icon={Lupa}
                />
            </div>
        </div>
    );
}



