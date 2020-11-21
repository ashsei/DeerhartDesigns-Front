import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "../styles.css";

const Layout = ({
  className,
  children,
  viewHeight
}) => (
  <div style={{backgroundColor: '#373737', minHeight: '100%'}}>
    <NavBar />
    <div className='wrapper'>
      <div className={className} style={{minHeight: '79vh'}}>{children}</div>
    </div>
    <Footer />  
  </div>
);

export default Layout;
