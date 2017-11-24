import React, { Component } from "react";
import DataService from "../../services/dataService";
import RedirectionService from "../../services/redirectionService";

class People extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };

        this.getData = new DataService();
        this.redirect = new RedirectionService();

        this.initBind();
    }

    initBind() {

    }

    componentDidMount() {

        this.getData.getUsersData((users) => {
            this.setState({
                users
            });

        }, (error) => {
            console.log(error);
        });

    }


    render() {

        return (
            <div>
                {this.state.users.map((user) => {
                    return (
                        <div key={user.id}>
                            <img src = {user.avatarUrl} />
                            <h3>{user.name}</h3>
                            <p>{user.aboutShort}</p>
                            <p>Last Post at: {user.lastPostDate}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default People;