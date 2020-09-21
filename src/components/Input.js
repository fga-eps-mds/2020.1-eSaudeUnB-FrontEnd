import React from 'react';

export default function Input({
    placeholder, value, onChange, type, icon,
}) {
    return (
      <div className="input">
          <input
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              type={type}
            />

          <img src={icon} alt="icon" />
        </div>
    );
}
