import React, { Component } from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import DataService from "../../services/dataService";
import RedirectionService from "../../services/redirectionService";
import Search from "../common/search";

const imgStyle = {
    height: "100px",
    width: "100px",
    border: "1px solid black",
    borderRadius: "150px",
    margin: "0 auto",
    marginTop: "30px"
};

class People extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            searchString: "",
            matchedUsers: []
        };

        this.getData = new DataService();
        this.redirect = new RedirectionService();

        this.initBind();
    }

    initBind() {
        this.catchSearch = this.catchSearch.bind(this);
        this.filterResults = this.filterResults.bind(this);
    }

    componentDidMount() {
        this.getData.getUsersData((users) => {
            this.setState({
                users,
                matchedUsers: users
            });

        }, (error) => {
            console.log(error);
        });
    }

    catchSearch(searchString) {
        this.setState({
            searchString
        });
    }

    filterResults(searchedString) {
        const users = this.state.users;
        let matchedUsers = [];

        matchedUsers = users.filter((user) => {
            let userName = user.name.toLowerCase();
            let searchString = searchedString.toLowerCase();

            return userName.includes(searchString);
        });

        this.setState({
            matchedUsers
        });
    }

    render() {

        return (
            <div>
                <Search dispatch={this.catchSearch} filterResults={this.filterResults} />
                {this.state.matchedUsers.map((user) => {
                    return (
                        <Link key={user.id} to={`people/${user.id}`} >
                            <div >
                                <img style={imgStyle} src={user.avatarUrl} />
                                <h3>{user.name}</h3>
                                <p>{user.aboutShort}</p>
                                <p>Last Post at: {new Date(user.lastPostDate).toLocaleTimeString().slice(0, 5)}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        );
    }
}

export default People;