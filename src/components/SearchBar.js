import React from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/SearchBar.css';

export default function SearchBar({
    value, onChange, icon, onClick
}) {
    return (
        <div className="searcBarComponent">
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />

            <button onClick={() => onClick()} ><img src={icon} alt="searchIcon" /></button>
        </div>
    );
}

SearchBar.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    icon: PropTypes.any,
};
