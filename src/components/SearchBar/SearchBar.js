import React from 'react';

import './styles.css';

export default function Input({
    value, onChange, icon,
}) {
    return (
        <div className="input">
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
          />

            <button><img src={icon} /></button>
      </div>
    );
}