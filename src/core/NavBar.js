import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./CartHelpers";



const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "white" };
    } else {
        return { color: "black" };
    }
};

const NavBar = ({ history }) => {

    return (
        
        <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand" href="/"><img src={require('../navlogo.svg')} id="logo"/></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/")} to="/" id="navlink">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/about")} to="/about" id="navlink">
                            About
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/shop")} to="/shop" id="navlink">
                            Shop
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/cart")} to="/cart" id="navlink">
                            Cart
                                <sup>
                                    <small className="cart-badge">{itemTotal()} item(s)</small>
                                </sup>
                        </Link>
                    </li>
                    
                    {!isAuthenticated() && (
                        <Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, "/signin")} to="/signin" id="navlink">
                                    Sign-In
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, "/signup")} to="/signup" id="navlink">
                                    Sign-Up
                                </Link>
                            </li>
                        </Fragment>
                    )}

                    {isAuthenticated() && isAuthenticated().user.role === 0 && (
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, "/user/dashboard")} to="/user/dashboard" id="navlink">
                                Dashboard
                            </Link>
                        </li>
                    )}

                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, "/admin/dashboard")} to="/admin/dashboard" id="navlink">
                                Dashboard
                            </Link>
                        </li>
                    )}

                    {isAuthenticated() && (
                        <Fragment>
                            <li className="nav-item">
                                <span className="nav-link" style={{ cursor: "pointer", color: "#494848" }} id="navlink"
                                    onClick={() =>
                                        signout(() => {
                                            history.push("/");
                                        })
                                    }
                                > 
                                    Sign Out
                                </span>
                            </li>
                        </Fragment>
                    )}

                </ul>
            </div>
        </nav>
    )
}

export default withRouter(NavBar);