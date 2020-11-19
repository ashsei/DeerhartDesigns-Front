import React from "react";
import { withRouter } from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer" style={{marginTop: '30px'}}>
            <span className="navbar-text">© All Rights Reserved - Deerhart Designs 2020 - Developed with ❤️ by <a href="http://seibel.life">Ashton Seibel</a></span>
        </div>
    )
}

export default withRouter(Footer);