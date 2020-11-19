import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "../styles.css";

const Layout = ({
  className,
  children,
}) => (
  <div style={{backgroundColor: '#373737', minHeight: '100%'}}>
    <NavBar />
    <div className='wrapper' style={{minHeight: '100%', marginBottom: '-45px'}}>
      <div className={className} style={{height: '100%'}}>{children}</div>
    </div>
    <Footer />  
  </div>
);

export default Layout;
