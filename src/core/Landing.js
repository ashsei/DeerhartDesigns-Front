import React, { Component } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

const Landing = () => {

    return (
        <div className="landing">
            
            <NavBar />
            <div className='wrapper' style={{minHeight: '100', marginBottom: '-45px'}}>
                <div className="link">
                    <a href="/shop" className="link">Shop ⎆</a>
                </div>
            </div>
            <div className="landing-footer">
                <span className="navbar-text" >© All Rights Reserved - Deerhart Designs 2020 - Developed with ❤️ by <a href="http://seibel.life">Ashton Seibel</a></span>
            </div>
        </div>
        
    )
}

export default Landing