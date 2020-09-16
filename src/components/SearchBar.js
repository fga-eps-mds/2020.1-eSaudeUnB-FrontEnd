import React from 'react';

import '../assets/styles/SearchBar.css';

export default function Input({
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