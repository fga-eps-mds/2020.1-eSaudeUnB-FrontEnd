import React from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/AboutCard.css';

export default function AboutCard({ title, text }) {
    return (
        <div className="aboutCard">
            <h2>{title}</h2>
            <span>{text}</span>
        </div>
    );
}

AboutCard.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
};
