import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "../styles.css";

const Layout = ({
  className,
  children,
}) => (
  <div style={{backgroundColor: '#373737', height: '100'}}>
    <NavBar />
    <div className={className} style={{paddingBottom: '45px', height: '100%'}}>{children}</div>
    <Footer />  
  </div>
);

export default Layout;
