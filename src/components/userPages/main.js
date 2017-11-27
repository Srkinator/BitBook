import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "../common/header";
import UserProfile from "./profilePage";
import People from "./people";
import Feed from "./feed";

class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/profile" component={UserProfile} />
                    <Route path="/profile/:id" component={UserProfile} />
                    <Route exact path="/people" component={People} />
                    <Route path="/feed" component={Feed} />
                </Switch>
            </div>
        );
    }
}

export default Main;