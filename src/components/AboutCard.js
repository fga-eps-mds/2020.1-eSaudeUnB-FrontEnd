import React from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/AboutCard.css';

export default function AboutCard({ title, children }) {
    return (
        <div className="aboutCard">
            <h2>{title}</h2>
            <span>{children}</span>
        </div>
    );
}

AboutCard.propTypes = {
    title: PropTypes.string,
    children: PropTypes.string,
};
