import React from 'react';
import PropTypes from 'prop-types';

export default function Input({
    placeholder, value, onChange, type, className
}) {
    return (
        <div className="input">
            <input
                className={className}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                type={type}
            />
        </div>
    );
}
Input.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
    icon: PropTypes.any,
};
