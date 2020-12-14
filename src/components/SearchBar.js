import React from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/SearchBar.css';

export default function SearchBar({
    value, onChange, icon, placeholder, triggerQuery,
}) {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && triggerQuery) {
            triggerQuery();
        }
    };

    return (
        <div className="searcBarComponent">
            <input
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e)}
            />

            <button onClick={triggerQuery ? (() => triggerQuery()) : ('')}>
                <img src={icon} alt="searchIcon" />
            </button>
            
        </div>
    );
}

SearchBar.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    icon: PropTypes.any,
    placeholder: PropTypes.string,
    triggerQuery: PropTypes.func,
};
