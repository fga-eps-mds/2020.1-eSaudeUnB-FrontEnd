import React from 'react';

export default function Home() {
    return (
        <div className="homeContainer">
            <div className="content">
                <p>Home</p>
                {localStorage.getItem('user')}
            </div>
        </div>
    );
}
