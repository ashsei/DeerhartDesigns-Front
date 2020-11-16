import React, { Component } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

const Landing = () => {

    return (
        <div className="landing">
            <NavBar />
            <div className="link">
                <a href="/shop">Shop ⎆</a>
            </div>
            <Footer />  
        </div>
        
    )
}

export default Landing