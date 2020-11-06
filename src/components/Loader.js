import React from 'react';
import '../assets/styles/Loader.css';

export default function Loader({}) {
    return (
        <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}
