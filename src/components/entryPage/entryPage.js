import React from "react";
import { Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import Login from "./login";
import Register from "./register";
import Welcome from "./welcome";


const formStyle = {
    fontSize: "1.5em",
    padding: "3px",
    border: "1px solid black",
    float: "left",
    borderRadius: "5px",
    width: "50%",
    textAlign: "center"
};

const switchBox = {
    border: "1px solid black",
    borderRadius: "5px",
    display: "inline-block",
    width: "100%",
    backgroundColor: "rgb(104, 187, 231)",
    padding: "15px",
    height: "287px"
};

class EntryPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row" style={{ marginTop: "100px" }}>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                    <Welcome />
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 table">
                    <div>
                        <Link to="/"><h3 style={formStyle} className="hover">Log In</h3></Link>
                        <Link to="/register"><h3 style={formStyle} className="hover">Register</h3></Link>
                    </div>
                    <div style={switchBox}>
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route exact path="/register" component={Register} />
                        </Switch>
                    </div>
                </div>
            </div>

        );
    }
}

export default EntryPage;
