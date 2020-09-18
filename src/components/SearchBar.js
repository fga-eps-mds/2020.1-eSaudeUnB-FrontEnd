import React from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/SearchBar.css';

export default function SearchBar({
    value, onChange, icon,
}) {
    return (
        <div className="searcBarComponent">
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
          />

            <button><img src={icon} /></button>
      </div>
    );
}

SearchBar.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    icon: PropTypes.any,
}