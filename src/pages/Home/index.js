import React from 'react';

export default function Home(props) {
    return (
        <div className="homeContainer">
            <div className="content">
                <p>Home</p>
                {localStorage.getItem('user')}
            </div>
        </div>
    );
}
