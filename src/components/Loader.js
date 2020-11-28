import React from 'react';
import '../assets/styles/Loader.css';

export default function Loader() {
    return (
        <div className="lds-ring">
            <div clasName=""></div>
            <div clasName=""></div>
            <div clasName=""></div>
            <div clasName=""></div>
        </div>
    );
}
