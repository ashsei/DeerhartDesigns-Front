import React from "react";
import { withRouter } from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer">
            <span className="navbar-text">V1.2 - <a href="mailto:support@deerhartdesigns.com">support@deerhartdesigns.com</a> - © All Rights Reserved - Deerhart Designs 2020 - Developed with ❤️ by <a href="http://seibel.life">Ashton Seibel</a></span>
        </div>
    )
}

export default withRouter(Footer);