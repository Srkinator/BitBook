import React, { Component } from "react";
import { Link } from "react-router-dom";

import AuthenticationService from "../../services/authenticationService";

const navLinkStyle = {
    transition: "font-weight 0.2s",
    transitionTimingFunction: "step-start",
    paddingLeft: "25px"

};

class Header extends Component {
    constructor(props) {
        super(props);

        this.logout = new AuthenticationService();
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark navColor ">
                    <Link to="feed">
                        <p className="navbar-brand" style={{ fontSize: "1.7em", fontWeight: "bold", paddingLeft: "15px", paddingTop: "10px" }}>BitBook</p>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end pull-right" id="navbarColor01">
                        <ul className="navbar-nav" style={{ fontSize: "1.2em" }}>
                            <Link to="/feed">
                                <li className="nav-item">
                                    <p className="nav-link navLink" style={navLinkStyle}>Feed <span className="sr-only">(current)</span></p>
                                </li>
                            </Link>
                            <Link to="/people">
                                <li className="nav-item navLink" style={navLinkStyle}>
                                    <p className="nav-link">People</p>
                                </li>
                            </Link>
                            <Link to="/profile">
                                <li className="nav-item navLink" style={navLinkStyle}>
                                    <p className="nav-link">Profile</p>
                                </li>
                            </Link>
                            <Link to="/login">
                                <li className="nav-item navLink" style={navLinkStyle} onClick={this.logout.logout}>
                                    <p className="nav-link">Log Out</p>
                                </li>
                            </Link>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;